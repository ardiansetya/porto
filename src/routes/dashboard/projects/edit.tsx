import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { authMiddleware } from 'lib/middleware'
import { getUser } from '@/server/userIdFn'

export const Route = createFileRoute('/dashboard/projects/edit')({
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
  return (
    <section className="py-10">
      <div className="container-custom max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <h1 className="text-xl font-semibold">Edit Project</h1>
            <p className="text-sm text-muted-foreground">
              Perubahan akan langsung mempengaruhi tampilan portfolio
            </p>
          </CardHeader>

          <Button>Save Changes</Button>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Task Management System" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                placeholder="Deskripsi singkat dan jelas mengenai project"
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack (comma separated)</Label>
              <Input placeholder="React, Express, MongoDB" />
            </div>

            <div className="space-y-2">
              <Label>Project URL</Label>
              <Input placeholder="https://github.com/..." />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch />
                <Label>Published</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch />
                <Label>Featured</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Project</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
