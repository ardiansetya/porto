import { ContactForm } from '@/components/features/contact/contact-form'
import { Layout } from '@/components/layout/layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <ContactForm />
    </Layout>
  )
}
