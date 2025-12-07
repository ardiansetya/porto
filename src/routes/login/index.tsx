import { LoginForm } from '@/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-col min-h-screen justify-between items-center pt-20">
      <LoginForm />
    </main>
  )
}
