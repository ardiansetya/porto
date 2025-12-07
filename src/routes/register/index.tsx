import { RegisterForm } from '@/components/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <main className="flex flex-col min-h-screen justify-between items-center pt-20">
        <RegisterForm />
      </main>
}
