import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Code2, Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm font-medium transition-colors hover:text-foreground',
    isActive ? 'text-foreground' : 'text-muted-foreground'
  )

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
            <Code2 className="h-4 w-4" />
          </span>
          <span>DevKit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className={linkClass}>Tools</NavLink>
          <NavLink to="/pricing" className={linkClass}>Pricing</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}

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

      {open && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4">
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Tools</NavLink>
          <NavLink to="/pricing" className={linkClass} onClick={() => setOpen(false)}>Pricing</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
              <Button variant="outline" className="w-full" onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link to="/signup" onClick={() => setOpen(false)}>Get started</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
