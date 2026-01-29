"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (sectionId: string) => {
    if (pathname === "/") {
      // On home page - scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setMobileMenuOpen(false)
      }
    } else {
      // On contact page - navigate to home with anchor
      router.push(`/#${sectionId}`)
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border animate-in fade-in slide-in-from-top duration-500">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <Image src="/esss-logo.png" alt="ESSS Limousine Logo" width={80} height={80} className="h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation("home")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation("cars")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Book Ride
            </button>
            <button
              onClick={() => handleNavigation("services")}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Services
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/contact">
              <Button>Contact</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in fade-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigation("home")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("about")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("Book Ride")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Book Ride
              </button>
              <button
                onClick={() => handleNavigation("services")}
                className="text-foreground hover:text-primary transition-colors duration-300 text-left"
              >
                Services
              </button>
              <Link href="/contact">
                <Button className="w-full">Contact</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
