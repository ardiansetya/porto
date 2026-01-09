import { AboutIntro } from '@/components/features/about/about-intro'
import { SkillsFull } from '@/components/features/about/skills-full'
import { Timeline } from '@/components/features/about/timeline'
import { CTASection } from '@/components/features/home/CTA-action'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AboutIntro />
      <SkillsFull />
      <Timeline />
      <CTASection />
    </>
  )
}
