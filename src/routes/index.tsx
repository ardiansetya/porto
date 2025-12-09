import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '@/components/features/home/hero'
import { Layout } from '@/components/layout/layout'
import { SkillsPreview } from '@/components/features/home/skill-preview'
import { FeaturedProjects } from '@/components/features/home/featured-projects'
import { CTASection } from '@/components/features/home/CTA-action'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <Layout>
      <Hero />
      <SkillsPreview />
      <FeaturedProjects />
      <CTASection />
    </Layout>
  )
}
