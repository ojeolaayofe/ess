"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const HERO_IMAGES = [
  {
    src: "/jeep-grand-wagoneer-luxury-interior.jpg",
    alt: "Jeep Grand Wagoneer Luxury Interior",
  },
  {
    src: "/jeep-grand-cherokee-summit-reserve.jpg",
    alt: "Jeep Grand Cherokee Summit Reserve",
  },
  {
    src: "/jeep-wagoneer-l-luxury-suv.jpg",
    alt: "Jeep Wagoneer L Luxury SUV",
  },
]

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-primary/10 animate-gradient" />
      </div>

      <div className="absolute inset-0 z-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full h-full"
        >
          <CarouselContent className="ml-0 h-screen">
            {HERO_IMAGES.map((image, index) => (
              <CarouselItem key={index} className="pl-0 h-full relative">
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Drive Your Dream, <span className="text-primary">Define Your Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Experience automotive excellence with our curated collection of premium vehicles. From performance to
            luxury, find the perfect car that matches your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-base hover:shadow-lg hover:animate-glow-pulse transition-all duration-300"
              onClick={() => scrollToSection("cars")}
            >
              View Our Collection
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-float">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-primary animate-pulse"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
