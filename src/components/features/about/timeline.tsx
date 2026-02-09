import { Award, Briefcase, GraduationCap } from 'lucide-react'

const timelineItems = [
  {
    icon: GraduationCap,
    date: '2022 - Present',
    title: 'Informatics Undergraduate',
    organization: 'Universitas Dian Nuswantoro',
    description:
      "Pursuing a Bachelor's degree in Informatics with a strong focus on software engineering, fullstack development, system design, and modern web technologies.",
    type: 'education',
  },
  {
    icon: Briefcase,
    date: '2026 - Present',
    title: 'Freelance Fullstack Developer',
    organization: 'Independent',
    description:
      'Designing and developing end-to-end web applications, handling both frontend and backend architecture, and delivering scalable solutions for client needs.',
    type: 'work',
  },
  {
    icon: Briefcase,
    date: '2025',
    title: 'Web Developer Intern (6 months)',
    organization: 'Dinas Komunikasi dan Informatika Provinsi Jawa Tengah',
    description:
      'Contributed to government digital initiatives by developing and enhancing web-based information systems, focusing on performance, accessibility, and maintainability.',
    type: 'work',
  },
  {
    icon: Briefcase,
    date: '2024',
    title: 'Wordpress Developer Intern',
    organization: 'Pimpinan Wilayah Muhammadiyah (PWM) Jawa Tengah',
    description:
      'Supported the development of organizational information systems, collaborated in requirement analysis, and implemented features to improve operational efficiency.',
    type: 'work',
  },
]


export function Timeline() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience & Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey in software development and academic pursuits
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative pl-20 group">
                  {/* Icon */}
                  <div className="absolute left-0 w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Dot on line */}
                  <div className="absolute left-[31px] top-7 w-2 h-2 rounded-full bg-primary" />

                  {/* Content */}
                  <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground mb-3">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-primary text-sm mb-3">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
