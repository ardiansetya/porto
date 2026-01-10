import { CTASection } from '@/components/features/home/CTA-action'
import { ProjectsGrid } from '@/components/features/projects/projects-grid'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/projects/')({
  component: RouteComponent,
  loader: async ({context}) => {
    await context.queryClient.prefetchQuery(
      context.trpc.projects.list.queryOptions()
    )
  }
})

function RouteComponent() {
  return (
    <>
      <ProjectsGrid /> 
      <CTASection />
    </>
  )
}
