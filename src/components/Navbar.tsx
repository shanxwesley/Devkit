import { Link, NavLink } from 'react-router-dom'
import { Code2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { tools } from '@/tools/registry'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Code2 className="h-4 w-4" />
          </span>
          <span>DevKit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn('text-sm font-medium transition-colors hover:text-primary', isActive ? 'text-primary' : 'text-muted-foreground')
            }
          >
            Tools
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              cn('text-sm font-medium transition-colors hover:text-primary', isActive ? 'text-primary' : 'text-muted-foreground')
            }
          >
            Pricing
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/signup">Get started</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/" className="block text-sm font-medium" onClick={() => setOpen(false)}>
              All Tools
            </Link>
            {tools.map((t) => (
              <Link
                key={t.id}
                to={t.route}
                className="block text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {t.name}
              </Link>
            ))}
            <Link to="/pricing" className="block text-sm font-medium" onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <div className="pt-2 flex gap-2">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link to="/signup" onClick={() => setOpen(false)}>Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
