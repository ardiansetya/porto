import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

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
import { createProjectSchema } from '@/schema/createProjectSchema'

export const Route = createFileRoute('/dashboard/projects/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      tags: [''],
      projectUrl: '',
      image: '',
      published: false,
      featured: false,
    },
    onSubmit: ({ value }) => {
      const parsed = createProjectSchema.parse(value)
      console.log('SUBMIT', parsed)
      // TODO: call tRPC / server action
    },
  })

  return (
    <section className="py-14">
      <div className="container-custom max-w-xl">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <h1 className="text-xl font-semibold">New Project</h1>
          <p className="text-sm text-muted-foreground">
            Project akan tampil di portfolio jika dipublish
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

                {/* slug */}
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
                          placeholder="Task Management System"
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

                {/* Project URL */}
                <form.Field name="projectUrl">
                  {(field) => (
                    <Field>
                      <FieldLabel>Project URL</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                </form.Field>

                {/* Image */}
                <form.Field name="image">
                  {(field) => (
                    <Field>
                      <FieldLabel>Image URL</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                </form.Field>

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
                  <Button type="submit">Create</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
