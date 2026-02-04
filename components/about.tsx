import { Shield, Heart, Zap, Users, CheckCircle } from "lucide-react"

export function About() {
  const coreValues = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every ride is backed by rigorous safety standards and professional chauffeurs",
    },
    {
      icon: Heart,
      title: "Luxury & Comfort",
      description: "First-class experience with top-tier vehicles and premium amenities",
    },
    {
      icon: Zap,
      title: "Reliability",
      description: "Punctuality and dependability are at the heart of our service",
    },
    {
      icon: Users,
      title: "Customer-Centric",
      description: "Every detail is tailored to exceed client expectations",
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We operate with honesty, transparency and professionalism",
    },
  ]

  return (
    <section id="about" className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div>
          {/* Content */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              About <span className="text-primary">ESSS LIMO LLC</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              ESSS LIMO LLC is a premier luxury transportation provider specializing in unforgettable experiences for
              weddings, proms, milestone celebrations, and VIP events. We combine elegance, reliability, and
              personalized service to ensure every journey is as memorable as the occasion itself.
            </p>

            <div className="mb-8 p-4 border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-primary mb-2">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide safe, reliable and luxurious transportation that exceeds client expectations. We are
                committed to delivering exceptional customer service, punctuality, and comfort, ensuring every ride is a
                seamless and memorable experience.
              </p>
            </div>

            <div className="mb-8 p-4 border-l-4 border-accent">
              <h3 className="text-lg font-semibold text-accent mb-2">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the premier choice for luxury transportation during life's most treasured moments, setting the
                standard for elegance, reliability and personalized service.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Core Values</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {coreValues.map((value, idx) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className="flex gap-4 animate-in fade-in duration-700"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
