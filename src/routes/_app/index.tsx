import { createFileRoute } from '@tanstack/react-router'

import { CTASection } from '@/components/features/home/CTA-action'
import { FeaturedProjects } from '@/components/features/home/featured-projects'
import { Hero } from '@/components/features/home/hero'
import { SkillsPreview } from '@/components/features/home/skill-preview'

export const Route = createFileRoute('/_app/')({ component: App })


function App() {
  return (
    <>
      <Hero />
      <SkillsPreview />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}
