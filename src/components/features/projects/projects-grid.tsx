import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'TruckTracker Mobile App',
    description:
      'Real-time fleet management and tracking solution with GPS integration, driver analytics, and route optimization. Built for logistics companies to streamline their operations.',
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'Maps API', 'Socket.io'],
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: 2,
    title: 'Disaster Reporting System',
    description:
      'Community-driven platform for reporting and managing natural disaster incidents in real-time. Features include geolocation, image uploads, and emergency notifications.',
    tags: ['React', 'Spring Boot', 'MySQL', 'WebSocket', 'Google Maps'],
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: 3,
    title: 'DiaCheck — Diabetes Detection',
    description:
      'AI-powered early diabetes detection application using machine learning algorithms. Provides risk assessment based on user health data and lifestyle factors.',
    tags: ['Next.js', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: 4,
    title: 'Personal Finance Dashboard',
    description:
      'Comprehensive financial management tool with expense tracking, budget planning, and visual analytics. Supports multiple currencies and bank integrations.',
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Plaid API'],
    image: '/placeholder.svg',
    featured: false,
  },
  {
    id: 5,
    title: 'E-Commerce Platform',
    description:
      'Full-featured online store with product management, shopping cart, payment processing, and order tracking. Built with scalability in mind.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Redis'],
    image: '/placeholder.svg',
    featured: false,
  },
  {
    id: 6,
    title: 'Task Management System',
    description:
      'Collaborative project management tool with kanban boards, team assignments, deadlines, and progress tracking. Real-time updates across all team members.',
    tags: ['React', 'Express', 'MongoDB', 'Socket.io', 'Docker'],
    image: '/placeholder.svg',
    featured: false,
  },
]

export function ProjectsGrid() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my expertise in building
            full-stack applications and solving real-world problems
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project image */}
              <div className="relative aspect-video bg-secondary overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {project.featured && (
                  <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground">
                    Featured
                  </span>
                )}
              </div>

              {/* Project content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 group/btn"
                  >
                    <span>View Project</span>
                    <ExternalLink className="ml-1 h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
