import { ArrowRight, Code, Database, Server, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js'],
  },
  {
    icon: Database,
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'Prisma'],
  },
  {
    icon: Wrench,
    title: 'Tools',
    skills: ['Docker', 'Git', 'Linux'],
  },
]

export function SkillsPreview() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A versatile toolkit spanning frontend, backend, and DevOps
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group p-6 rounded-2xl bg-card border border-border hover-lift cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center">
          <Button asChild variant="ghost" className="group">
            <Link to="/about">
              View All Skills
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
