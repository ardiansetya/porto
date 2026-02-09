import { Link, useLocation } from '@tanstack/react-router'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { ModeToggle } from '../shared/mode-toggle'
import { Button } from '../ui/button'
import { authClient } from 'lib/auth-client'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // const {data: user} = authClient.useSession()
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container-custom mx-auto px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Ardian<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors link-underline',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* {user ? (
              <Link
                to="/dashboard"
                className="text-sm font-medium transition-colors link-underline"
              >
                Dashboard
              </Link>
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )} */}
            <ModeToggle />
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-64 pb-4' : 'max-h-0',
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-sm font-medium transition-colors py-2',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
