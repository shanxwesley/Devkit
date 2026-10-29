import { Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { tools } from '@/tools/registry'
import { useAuth } from '@/lib/auth'

export function Dashboard() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading…</div>
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/dashboard' }} />
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Naka-sign in bilang {user.email}</p>
        </div>
        <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Your tools</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.id} to={tool.route} className="card-interactive p-5 flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{tool.name}</div>
                <div className="text-sm text-muted-foreground">{tool.isPremium ? 'Premium' : 'Free'}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
