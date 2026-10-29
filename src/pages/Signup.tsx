import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'

const inputClass = 'mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'

export function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)

    if (password.length < 6) {
      setError('Dapat at least 6 characters ang password.')
      return
    }
    if (password !== confirm) {
      setError('Hindi magkapareho ang password.')
      return
    }

    setSubmitting(true)
    const result = await signUp(email.trim(), password)
    setSubmitting(false)

    if (result.error) {
      setError(result.error)
    } else if (result.needsConfirmation) {
      setInfo('Tingnan ang email mo at i-click ang confirmation link bago mag-sign in.')
    } else {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Code2 className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Libre ang core tools. Mag-sign up sa loob ng isang minuto.</p>
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirm" className="text-sm font-medium">Confirm password</label>
            <input
              id="confirm"
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-primary">{info}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          May account ka na?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
