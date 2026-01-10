import { ImageUpload } from '@/components/shared/ImageUpload'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/projects/upload/$projectid')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='container mx-auto flex justify-center items-center min-h-screen'>
      <ImageUpload />
    </div>
  )
}
