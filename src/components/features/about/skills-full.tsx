import { Code, Database, Server, Wrench } from 'lucide-react'

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend Development',
    description:
      'Building responsive, accessible, and performant user interfaces',
    skills: [
      { name: 'React', desc: 'Component-based UI development' },
      { name: 'Next.js', desc: 'Full-stack React framework' },
      { name: 'TypeScript', desc: 'Type-safe JavaScript' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Designing and implementing scalable server-side solutions',
    skills: [
      { name: 'Node.js', desc: 'Server-side JavaScript runtime' },
      { name: 'Express.js', desc: 'Minimalist web framework' },
      { name: 'Golang', desc: 'High-performance systems' },
      { name: 'Spring Boot', desc: 'Enterprise Java framework' },
    ],
  },
  {
    icon: Database,
    title: 'Database & ORM',
    description: 'Managing and optimizing data storage solutions',
    skills: [
      { name: 'PostgreSQL', desc: 'Relational database' },
      { name: 'MySQL', desc: 'Open-source RDBMS' },
      { name: 'Prisma', desc: 'Modern database toolkit' },
      { name: 'MongoDB', desc: 'NoSQL document database' },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & DevOps',
    description: 'Streamlining development and deployment workflows',
    skills: [
      { name: 'Docker', desc: 'Container platform' },
      { name: 'Git', desc: 'Version control' },
      { name: 'Linux', desc: 'Server administration' },
      { name: 'CI/CD', desc: 'Automated pipelines' },
    ],
  },
]

export function SkillsFull() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and the technologies
            I work with to bring ideas to life
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border hover-lift"
            >
              {/* Category header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills list */}
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                  >
                    <span className="text-sm font-medium block">
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {skill.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
