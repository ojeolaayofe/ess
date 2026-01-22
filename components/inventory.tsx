import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const cars = [
  {
    name: "Aero X7 GT",
    year: "2024",
    price: "$285,000",
    image: "/luxury-sports-car-front.jpg",
    description: "Unmatched aerodynamics and raw V12 power.",
  },
  {
    name: "Velocita S",
    year: "2023",
    price: "$195,000",
    image: "/fast-luxury-car.jpg",
    description: "Pure driving dynamics and Italian craftsmanship.",
  },
  {
    name: "Lumine E-Class",
    year: "2024",
    price: "$120,000",
    image: "/modern-electric-luxury-car.jpg",
    description: "The future of luxury, delivered in total silence.",
  },
  {
    name: "Summit XL",
    year: "2024",
    price: "$145,000",
    image: "/luxury-suv.jpg",
    description: "Go anywhere in absolute comfort and safety.",
  },
]

export function Inventory() {
  return (
    <section id="inventory" className="bg-muted/30 py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured <span className="text-primary">Inventory</span>
            </h2>
            <p className="text-muted-foreground">Exquisite machines ready for their next journey.</p>
          </div>
          <Button variant="link" className="text-primary">
            View All Vehicles →
          </Button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <Card
              key={car.name}
              className="group overflow-hidden border-border/50 bg-background transition-all hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 rounded-full bg-background/80 px-3 py-1 text-xs font-bold backdrop-blur">
                  {car.year}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground">{car.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{car.description}</p>
                <p className="mt-4 font-heading text-lg font-bold text-primary">{car.price}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
