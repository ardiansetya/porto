import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '@/components/features/home/hero'
import { Layout } from '@/components/layout/layout'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}
