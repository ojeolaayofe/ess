"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function ContactForm() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    selectedVehicle: "",
    tripDate: "",
    tripTime: "",
    pickupLocation: "",
    destination: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const carParam = params.get("car")

    if (carParam) {
      try {
        const decodedCar = JSON.parse(decodeURIComponent(carParam))
        setSelectedCar(decodedCar)
        setFormData((prev) => ({
          ...prev,
          selectedVehicle: `${decodedCar.name} (${decodedCar.year}) - ${decodedCar.price}`,
        }))
      } catch (error) {
        console.error("Error parsing car data:", error)
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    if (selectedCar && !formData.tripDate) {
      newErrors.tripDate = "Ride date is required for ride bookings"
    }

    if (selectedCar && !formData.tripTime) {
      newErrors.tripTime = "Pickup time is required for ride bookings"
    }

    if (selectedCar && !formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required for ride bookings"
    }

    if (selectedCar && !formData.destination.trim()) {
      newErrors.destination = "Destination is required for ride bookings"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // RIDE BOOKING FORM - Vehicle bookings (separate from general contact form)
      // Create a separate EmailJS template for ride bookings
      // Template variables: {{from_name}}, {{from_email}}, {{phone}}, {{selected_vehicle}}, {{trip_date}}, {{trip_time}}, {{pickup_location}}, {{destination}}, {{message}}
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_5hxdfte", // Replace with your EmailJS service ID
          template_id: "template_fwn7lz8", // Use a DIFFERENT template for ride bookings
          user_id: "SBJYWjJ6UyrzqVxoU", // Replace with your EmailJS public key
          template_params: {
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            selected_vehicle: formData.selectedVehicle,
            trip_date: formData.tripDate || "Not specified",
            trip_time: formData.tripTime || "Not specified",
            pickup_location: formData.pickupLocation || "Not specified",
            destination: formData.destination || "Not specified",
            message: formData.message,
            form_type: "Ride Booking Request", // Identifies the form type
            to_email: "ojeolaponle@gmail.com", // Replace with your Gmail address
          },
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setShowSuccessModal(true)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          selectedVehicle: "",
          tripDate: "",
          tripTime: "",
          pickupLocation: "",
          destination: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setFormData((prev) => ({
        ...prev,
        tripDate: format(date, "yyyy-MM-dd"),
      }))
      if (errors.tripDate) {
        setErrors((prev) => ({ ...prev, tripDate: "" }))
      }
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      tripTime: value,
    }))
    if (errors.tripTime) {
      setErrors((prev) => ({ ...prev, tripTime: "" }))
    }
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 lg:px-8 py-24">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            {selectedCar ? "Book Your Ride" : "Get In"}{" "}
            <span className="text-primary">{selectedCar ? "" : "Touch"}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {selectedCar
              ? `Complete your booking for the ${selectedCar.name}. Provide your pickup and destination details below.`
              : "Ready to book a luxury ride? Contact us today and let our team help you reserve your perfect vehicle."}
          </p>
        </div>

        <div className={`grid gap-8 max-w-6xl mx-auto ${selectedCar ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
          {/* Contact Information */}
          <div className={`space-y-6 ${selectedCar ? '' : 'lg:col-span-full'}`}>
            <div className="animate-in fade-in slide-in-from-left duration-700 delay-100">
              <Card className="bg-card hover:shadow-lg transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Visit Us</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        123 Luxury Drive
                        <br />
                        Beverly Hills, CA 90210
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-in fade-in slide-in-from-left duration-700 delay-200">
              <Card className="bg-card hover:shadow-lg transition-all duration-500">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Call Us</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        +1 (240) 791-6796
                        <br />
                        Mon-Sat: 9AM - 7PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-in fade-in slide-in-from-left duration-700 delay-300">
              <Card className="bg-card hover:shadow-xl transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email Us</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed break-all">
                        info@esssliomllc.com
                        <br />
                        sales@esssliomllc.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form - Only show when booking a car */}
          {selectedCar && (
          <div className="lg:col-span-2 animate-in fade-in slide-in-from-right duration-700 delay-100">
            <Card className="bg-card hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                {selectedCar && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-in fade-in duration-500">
                    <p className="text-sm text-muted-foreground mb-2">Selected Vehicle:</p>
                    <p className="font-semibold text-primary">
                      {selectedCar.name} - {selectedCar.price}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  {selectedCar && (
                    <>
                      <div>
                        <label
                          htmlFor="pickupLocation"
                          className="block text-sm font-medium mb-2 flex items-center gap-2"
                        >
                          <MapPin className="w-4 h-4 text-primary" />
                          Pickup Location *
                        </label>
                        <Input
                          id="pickupLocation"
                          name="pickupLocation"
                          value={formData.pickupLocation || ""}
                          onChange={handleChange}
                          placeholder="Enter your pickup address"
                          className={errors.pickupLocation ? "border-destructive" : ""}
                        />
                        {errors.pickupLocation && (
                          <p className="text-sm text-destructive mt-1">{errors.pickupLocation}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="destination" className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          Destination *
                        </label>
                        <Input
                          id="destination"
                          name="destination"
                          value={formData.destination || ""}
                          onChange={handleChange}
                          placeholder="Enter your destination address"
                          className={errors.destination ? "border-destructive" : ""}
                        />
                        {errors.destination && <p className="text-sm text-destructive mt-1">{errors.destination}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            Ride Date *
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left ${!selectedDate ? "text-muted-foreground" : ""} ${errors.tripDate ? "border-destructive" : ""}`}
                              >
                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {errors.tripDate && <p className="text-sm text-destructive mt-1">{errors.tripDate}</p>}
                        </div>

                        <div>
                          <label htmlFor="tripTime" className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            Pickup Time *
                          </label>
                          <Input
                            id="tripTime"
                            name="tripTime"
                            type="time"
                            value={formData.tripTime}
                            onChange={handleTimeChange}
                            className={`cursor-pointer ${errors.tripTime ? "border-destructive" : ""}`}
                          />
                          {errors.tripTime && <p className="text-sm text-destructive mt-1">{errors.tripTime}</p>}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {selectedCar ? "Special Requests" : "Message"} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        selectedCar
                          ? "Any special requests or requirements for your ride..."
                          : "Tell us how we can help..."
                      }
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg animate-in fade-in duration-300">
                      <p className="text-sm text-destructive">
                        Failed to process your request. Please check your details or try again later.
                      </p>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : selectedCar ? "Confirm Ride Booking" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl">
              {selectedCar ? "Ride Booked!" : "Message Sent!"}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedCar
                ? "Your ride has been booked successfully! Our team will confirm your booking and reach out to you shortly."
                : "Thank you for reaching out. Your message has been sent successfully. Our team will get back to you shortly."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowSuccessModal(false)} className="w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
