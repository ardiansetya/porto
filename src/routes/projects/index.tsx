import { CTASection } from '@/components/features/home/CTA-action'
import { ProjectsGrid } from '@/components/features/projects/projects-grid'
import { Layout } from '@/components/layout/layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <ProjectsGrid /> 
      <CTASection />
    </Layout>
  )
}
