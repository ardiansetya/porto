import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTRPC } from '@/integrations/trpc/react'
import { getUser } from '@/server/userIdFn'
import { useQuery } from '@tanstack/react-query'
import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { authClient } from 'lib/auth-client'
import { authMiddleware } from 'lib/middleware'
import { ExternalLink, Eye, EyeOff, Image, LogOut, Pencil, Plus } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const userId = await getUser()

    return {
      userId,
    }
  },
  loader: ({ context }) => {
    if (!context.userId) {
      throw redirect({ to: '/' })
    }
    return {
      userId: context.userId,
    }
  },
  server: {
    middleware: [authMiddleware],
  },
})

function RouteComponent() {
  const navigate = useNavigate()

  const trpc = useTRPC()
    const {data: projects} = useQuery({
      ...trpc.projects.list.queryOptions()
    })
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-background py-12">
      <div className="container-custom max-w-5xl space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
            <p className="text-sm text-muted-foreground">
              Manage projects shown on your public portfolio
            </p>
          </div>

          <Button
            size="sm"
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    navigate({ to: '/' })
                    toast.success('Logout Successfully')
                  },
                },
              })
            }
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>

        {/* Project List */}
        <div className="space-y-3">
          <Button asChild size="default" variant={'secondary'}>
            <Link to="/dashboard/projects/new">
              <Plus className="w-4 h-4 mr-1" />
              New Project
            </Link>
          </Button>
          {projects?.map((project) => (
            <Card key={project.id} className="border-muted/60">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-base font-medium">{project.title}</h2>
                    <p className="text-sm text-muted-foreground max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex gap-2">
                    <Badge
                      variant={project.published ? 'default' : 'secondary'}
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </Badge>
                    {project.featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex items-center justify-between pt-0">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" asChild>
                    <Link
                      to="/dashboard/projects/upload/$projectid"
                      params={{ projectid: String(project.id) }}
                    >
                      <Image className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" asChild>
                    <Link to="/dashboard/projects/edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>

                  <Button size="icon" variant="ghost">
                    {project.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>

                  <Button size="icon" variant="ghost" asChild>
                    <Link
                      to={project.projectUrl || '/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
