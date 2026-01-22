import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, Award, Sparkles } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Car,
      title: "Luxury Event Transportation",
      description:
        "Premium chauffeured transportation for weddings, proms, milestone celebrations, and special events, designed to make each occasion elegant and memorable.",
    },
    {
      icon: Users,
      title: "VIP & Executive Transportation",
      description:
        "High-end, discreet, and reliable transportation for VIP clients who value comfort, professionalism, and punctuality.",
    },
    {
      icon: Award,
      title: "Professional Chauffeur Services",
      description:
        "Safe, courteous, and highly trained chauffeurs providing first-class customer service, reliability, and attention to detail on every ride.",
    },
    {
      icon: Sparkles,
      title: "Customized Transportation Experiences",
      description:
        "Personalized travel solutions tailored to client needs, preferences, and event requirements, ensuring a seamless and stress-free experience.",
    },
  ]

  return (
    <section id="services" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse -z-10" />
      <div
        className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse -z-10"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            From elegant event transportation to VIP executive services, we provide comprehensive luxury transportation
            solutions designed to exceed your expectations at every turn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="group hover:border-primary/50 hover:shadow-xl transition-all duration-500 bg-background animate-in fade-in slide-in-from-bottom-8 duration-700 hover:-translate-y-3"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
