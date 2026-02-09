import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useRouter } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'


export function FeaturedProjects() {
  const trpc = useTRPC()
  const { data: featuredProjects, isLoading } = useQuery({
    ...trpc.projects.list.queryOptions(),
  }) 

  const router = useRouter()
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-xl">
              A selection of projects that showcase my skills in building
              full-stack applications
            </p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/projects">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <Spinner className="size-8" />
          ) : (
            featuredProjects?.map((project, index) => (
              <article
                key={project.id}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project image */}
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img
                    src={project.imageUrl ?? 'https://jafaqlgy31.ufs.sh/f/Q1zztTgaCfF1VCDg48wabE53htdKDcrIz21pFxegSkyqAwjn'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button onClick={() => router.navigate({href: "/https://nowted.appwrite.network"})} variant="ghost" size="sm" className="group/btn">
                      <span>View Project</span>
                      <ExternalLink className="ml-1 h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
