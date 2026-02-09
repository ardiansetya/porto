import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useTRPC } from '@/integrations/trpc/react'
import { getUser } from '@/server/userIdFn'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { authMiddleware } from 'lib/middleware'
import { toast } from 'sonner'
import { z } from 'zod'

const editProjectSearchSchema = z.object({
  id: z.string(),
})

export const Route = createFileRoute('/dashboard/projects/edit')({
  component: RouteComponent,
  validateSearch: editProjectSearchSchema,
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
  const { id } = Route.useSearch()
  const trpc = useTRPC()

  // Fetch project data
  const { data: project, isLoading } = useQuery({
    ...trpc.projects.getById.queryOptions({ id }),
  })

  // Update mutation
  const updateProject = useMutation({
    ...trpc.projects.update.mutationOptions({
      onSuccess: () => {
        navigate({ to: '/dashboard' })
        toast.success('Project berhasil diupdate')
      },
      onError: (error) => {
        toast.error('Project gagal diupdate', {
          description: error.message,
        })
      },
    }),
  })

  const form = useForm({
    defaultValues: {
      title: project?.title || '',
      slug: project?.slug || '',
      description: project?.description || '',
      tags: project?.tags || [''],
      published: project?.published || false,
      featured: project?.featured || false,
    },
    onSubmit: ({ value }) => {
      updateProject.mutate({
        id,
        ...value,
      })
    },
  })

  if (isLoading) {
    return (
      <section className="py-14">
        <div className="container-custom max-w-xl">
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  if (!project) {
    return (
      <section className="py-14">
        <div className="container-custom max-w-xl">
          <p>Project not found</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14">
      <div className="container-custom max-w-xl">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <h1 className="text-xl font-semibold">Edit Project</h1>
          <p className="text-sm text-muted-foreground">
            Perubahan akan langsung mempengaruhi tampilan portfolio
          </p>
        </div>

        <Card className="border-muted/60">
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
            >
              <FieldGroup>
                {/* Title */}
                <form.Field name="title">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Title</FieldLabel>
                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Task Management System"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>

                {/* Slug */}
                <form.Field name="slug">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Slug</FieldLabel>
                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="task-management-system"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>

                {/* Description */}
                <form.Field name="description">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea
                          rows={4}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>

                {/* Tech Stack (ARRAY) */}
                <form.Field name="tags" mode="array">
                  {(field) => (
                    <Field>
                      <FieldLabel>Tech Stack</FieldLabel>

                      <FieldGroup>
                        {field.state.value.map((_, index) => (
                          <form.Field key={index} name={`tags[${index}]`}>
                            {(subField) => (
                              <Field>
                                <div className="flex gap-2">
                                  <Input
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                    placeholder="React"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => field.removeValue(index)}
                                  >
                                    ✕
                                  </Button>
                                </div>
                              </Field>
                            )}
                          </form.Field>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => field.pushValue('')}
                        >
                          + Add tech
                        </Button>
                      </FieldGroup>
                    </Field>
                  )}
                </form.Field>

                {/* Image
                <form.Field name="image">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Project Image</FieldLabel>
                        <ImageUploadField
                          value={field.state.value}
                          onChange={field.handleChange}
                          projectId={id}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field> */}

                {/* Flags */}
                <Field>
                  <div className="flex justify-between">
                    <form.Field name="published">
                      {(field) => (
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.state.value}
                            onCheckedChange={field.handleChange}
                          />
                          <span>Published</span>
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="featured">
                      {(field) => (
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.state.value}
                            onCheckedChange={field.handleChange}
                          />
                          <span>Featured</span>
                        </div>
                      )}
                    </form.Field>
                  </div>
                </Field>

                {/* Actions */}
                <Field>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate({ to: '/dashboard' })}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateProject.isPending}>
                      {updateProject.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
