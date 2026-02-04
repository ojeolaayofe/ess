"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccessModal, setShowSuccessModal] = useState(false)

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
      // EmailJS Integration
      // SETUP INSTRUCTIONS:
      // 1. Create account at https://www.emailjs.com/
      // 2. Add email service (Gmail, Outlook, etc.)
      // 3. Create email template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
      // 4. Get your PUBLIC_KEY, SERVICE_ID, and TEMPLATE_ID from EmailJS dashboard
      // 5. Replace the placeholders below with your actual values

      // CONTACT FORM - General inquiries (separate from ride booking form)
      // Create a separate EmailJS template for general contact messages
      // Template variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_5hxdfte",
          template_id: "template_q4r03tp",
          user_id: "SBJYWjJ6UyrzqVxoU",
          template_params: {
            from_name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            form_type: "General Contact Inquiry",
            to_email: "ojeolaponle@gmail.com",
          },
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setShowSuccessModal(true)
        setFormData({ fullName: "", email: "", phone: "", message: "" })
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
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Ready to find your perfect vehicle? Contact us today and let our team help you drive away in your dream car.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Call Us Section */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <Card className="bg-card hover:shadow-xl transition-all duration-500 h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mb-6">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Call Us</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Ready to book your luxury ride? Give us a call and our dedicated team will be happy to assist you.
                </p>
                <div className="bg-muted p-4 rounded-lg w-full mb-6">
                  <p className="text-lg font-bold text-primary">+1 (240) 791-6796</p>
                  <p className="text-sm text-muted-foreground mt-2">Mon-Sat: 9AM - 7PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Us Section */}
          <div className="animate-in fade-in slide-in-from-right duration-700">
            <Card className="bg-card hover:shadow-xl transition-all duration-500 h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Email Us</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Prefer email? Drop us a message and we'll respond promptly with all the information you need.
                </p>
                <div className="bg-muted p-4 rounded-lg w-full mb-6">
                  <p className="text-base font-bold text-primary break-all mb-2">info@esssliomllc.com</p>
                  <p className="text-base font-bold text-primary break-all">sales@esssliomllc.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div> */}

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl">Message Sent!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for reaching out. Your message has been sent successfully. Our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowSuccessModal(false)} className="w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
