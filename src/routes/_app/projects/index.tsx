import { CTASection } from '@/components/features/home/CTA-action'
import { ProjectsGrid } from '@/components/features/projects/projects-grid'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ProjectsGrid /> 
      <CTASection />
    </>
  )
}
