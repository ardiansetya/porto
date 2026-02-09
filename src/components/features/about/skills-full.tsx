import {
  Braces,
  Code,
  Code2,
  Container,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  HardDrive,
  Layers,
  Server,
  Terminal,
  Wind,
  Workflow,
  Wrench,
} from 'lucide-react'

const skillCategories = [
  {
    icon: Code,
    title: 'Frontend Development',
    description:
      'Building responsive, accessible, and high-performance user interfaces',
    skills: [
      {
        name: 'React',
        desc: 'Component-driven architecture',
        icon: Code2,
      },
      {
        name: 'Next.js',
        desc: 'Production-grade React framework',
        icon: FileCode2,
      },
      {
        name: 'TypeScript',
        desc: 'Static type safety for scalable apps',
        icon: Braces,
      },
      {
        name: 'Tailwind CSS',
        desc: 'Utility-first styling system',
        icon: Wind,
      },
    ],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Designing robust and scalable server-side systems',
    skills: [
      {
        name: 'Node.js',
        desc: 'Event-driven JavaScript runtime',
        icon: Cpu,
      },
      {
        name: 'Express.js',
        desc: 'Fast and minimalist API framework',
        icon: Server,
      },
    ],
  },
  {
    icon: Database,
    title: 'Database & ORM',
    description: 'Architecting reliable and efficient data layers',
    skills: [
      {
        name: 'PostgreSQL',
        desc: 'Advanced relational database',
        icon: Database,
      },
      {
        name: 'MySQL',
        desc: 'High-performance relational database',
        icon: HardDrive,
      },
      {
        name: 'Prisma',
        desc: 'Type-safe ORM for modern apps',
        icon: Layers,
      },
      {
        name: 'MongoDB',
        desc: 'Flexible NoSQL document database',
        icon: Database,
      },
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & DevOps',
    description: 'Optimizing development workflows and deployments',
    skills: [
      {
        name: 'Docker',
        desc: 'Containerized environments',
        icon: Container,
      },
      {
        name: 'Git',
        desc: 'Distributed version control',
        icon: GitBranch,
      },
      {
        name: 'Linux',
        desc: 'Server and system operations',
        icon: Terminal,
      },
      {
        name: 'CI/CD',
        desc: 'Automated delivery pipelines',
        icon: Workflow,
      },
    ],
  },
]

export function SkillsFull() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities and the
            technologies I leverage to design, build, and deliver modern
            software solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category) => {
            const CategoryIcon = category.icon

            return (
              <div
                key={category.title}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border hover-lift"
              >
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CategoryIcon className="h-6 w-6 text-primary" />
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

                {/* Skills */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon

                    return (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                      >
                        <div className="flex items-start gap-2">
                          <SkillIcon className="h-4 w-4 mt-0.5 text-primary shrink-0" />

                          <div>
                            <span className="text-sm font-medium block">
                              {skill.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {skill.desc}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
