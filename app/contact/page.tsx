"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import ContactForm from "@/components/contact-form"

function ContactPageContent() {
  return (
    <>
      <Navigation />
      <ContactForm />
    </>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ContactPageContent />
    </Suspense>
  )
}
