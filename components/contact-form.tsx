"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Contact() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-10">
        {/* Heading */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Reach out to us anytime. We’re always happy to help.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-6">
          {/* Address */}
          <Card className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Visit Us</h3>
                <p className="text-sm text-muted-foreground">
                  123 Luxury Drive <br />
                  Beverly Hills, CA 90210
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-sm text-muted-foreground">
                  +1 (310) 555-0199 <br />
                  Mon–Sat: 9AM – 7PM
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-sm text-muted-foreground break-all">
                  info@esssliomllc.com <br />
                  sales@esssliomllc.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
