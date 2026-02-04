"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function Cars() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeView, setActiveView] = useState("exterior")

  const inventory = [
    {
      id: 1,
      name: "Chevrolet Suburban",
      year: 2024,
      price: "$200/hour",
      image: "/chevrolet-suburban-black-exterior.jpg",
      exteriorImage: "/chevrolet-suburban-black-exterior.jpg",
      interiorImage: "/chevrolet-suburban-black-interior.jpg",
      description: "Premium luxury SUV with commanding presence, spacious interior, and exceptional comfort for your special occasions",
      category: "Luxury SUV",
      specs: {
        engine: "5.3L V8",
        horsepower: "355 hp",
        seats: "Seats up to 9 passengers",
        transmission: "Automatic",
        fuelEconomy: "18 MPG City / 24 MPG Highway",
      },
      features: [
        "Panoramic Sunroof",
        "Premium Leather Interior",
        "Advanced Safety Suite",
        "Heated and Cooled Seats",
        "Premium Bose Sound System",
        "Power Rear Liftgate",
        "Dual-Zone Climate Control",
        "Backup Camera with Sensors",
      ],
    },
    {
      id: 2,
      name: "Chevrolet Equinox",
      year: 2024,
      price: "$150/hour",
      image: "/chevrolet-equinox-exterior.jpg",
      exteriorImage: "/chevrolet-equinox-exterior.jpg",
      interiorImage: "/chevrolet-equinox-interior.jpg",
      description: "Stylish luxury SUV combining elegance with performance, perfect for discerning travelers who value both comfort and sophistication",
      category: "Luxury SUV",
      specs: {
        engine: "3.6L V6",
        horsepower: "310 hp",
        seats: "Seats up to 5 passengers",
        transmission: "Automatic",
        fuelEconomy: "22 MPG City / 29 MPG Highway",
      },
      features: [
        "Sunroof",
        "Premium Leather Interior",
        "Adaptive Safety Package",
        "Heated Seats",
        "Bose Premium Audio System",
        "Power Liftgate",
        "Dual-Zone Climate Control",
        "Integrated Backup Camera",
      ],
    },
  ]

  const handleViewDetails = (car) => {
    setSelectedCar(car)
    setShowModal(true)
  }

  const handleBookVehicle = () => {
    const carData = encodeURIComponent(JSON.stringify(selectedCar))
    window.location.href = `/contact?car=${carData}`
  }

  return (
    <section id="cars" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob -z-10" />
      <div
        className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-blob -z-10"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Discover Our <span className="text-primary">Premium SUV Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Choose from our fleet of luxury SUVs and experience premium transportation. Book your ideal vehicle and
            enjoy a first-class journey to your destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inventory.map((car, index) => (
            <Card
              key={car.id}
              className="group overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all duration-500 bg-card border-border animate-in fade-in slide-in-from-bottom-8 duration-700 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />
                </div>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground animate-in fade-in zoom-in-50 duration-500 shadow-lg">
                  {car.category}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {car.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">{car.year}</span>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{car.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{car.price}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={() => handleViewDetails(car)}
                  className="w-full group-hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-gradient-to-r from-background to-card border-b border-border z-10">
              <h2 className="text-2xl font-bold">{selectedCar.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-muted hover:scale-110 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="aspect-[16/9] overflow-hidden rounded-lg relative">
                  <img
                    src={activeView === "exterior" ? selectedCar.exteriorImage || selectedCar.image : selectedCar.interiorImage || selectedCar.image}
                    alt={`${selectedCar.name} ${activeView}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveView("exterior")}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeView === "exterior"
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Exterior View
                  </button>
                  <button
                    onClick={() => setActiveView("interior")}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeView === "interior"
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Interior View
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedCar.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
                  <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                  <p className="text-2xl font-bold text-primary">{selectedCar.price}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                  <p className="text-2xl font-bold">{selectedCar.year}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(selectedCar.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-muted p-3 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300"
                    >
                      <p className="text-sm text-muted-foreground capitalize mb-1">{key.replace(/([A-Z])/g, " $1")}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">Premium Features</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {selectedCar.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1 hover:scale-105 transition-transform"
                >
                  Close
                </Button>
                <Button
                  onClick={handleBookVehicle}
                  className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-transform hover:shadow-lg"
                >
                  Book Ride
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  )
}
