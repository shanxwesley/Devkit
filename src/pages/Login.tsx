import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'

const inputClass = 'mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const err = await signIn(email.trim(), password)
    setSubmitting(false)
    if (err) setError(err)
    else navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Code2 className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Sign in to DevKit</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Save projects and unlock higher AI limits.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 space-y-4 shadow-soft">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Wala ka pang account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
