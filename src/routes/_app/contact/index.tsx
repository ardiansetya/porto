import { ContactForm } from '@/components/features/contact/contact-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ContactForm />
    </>
  )
}
