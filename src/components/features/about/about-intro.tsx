import { Award, Briefcase, GraduationCap, MapPin } from 'lucide-react'

const badges = [
  { icon: Briefcase, label: 'Fullstack Developer' },
  { icon: GraduationCap, label: 'Informatics Undergraduate' },
  { icon: Award, label: 'GPA 3.68 / 4.0' },
  { icon: MapPin, label: 'Indonesia' },
]

export function AboutIntro() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl bg-linear-to-br from-primary/20 to-blue-accent-light overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm Ardian Setya Pradana, a Fullstack Developer and Informatics
              undergraduate at Universitas Dian Nuswantoro. I focus on building
              modern, scalable web applications with clean architecture and
              strong attention to user experience.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              My journey in software development began with deep curiosity about
              how digital systems operate. Today, I develop across the entire
              stack — from crafting intuitive interfaces to designing backend
              services and deploying containerized applications.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  <badge.icon className="h-4 w-4 text-primary" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
