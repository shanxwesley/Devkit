import { Link, Navigate } from 'react-router-dom'
import { LogOut, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { tools } from '@/tools/registry'
import { useAuth } from '@/lib/auth'

export function Dashboard() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-sm text-muted-foreground">
        Loading your workspace…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/dashboard' }} />
  }

  const freeTools = tools.filter((t) => !t.isPremium)
  const premiumTools = tools.filter((t) => t.isPremium)

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Dashboard</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>

      {/* Free tools */}
      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Free tools</h2>
          <span className="text-sm text-muted-foreground">{freeTools.length} available</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.id} to={tool.route} className="card-interactive group flex flex-col p-5">
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  {tool.isAI && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      AI
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold">{tool.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Premium tools */}
      {premiumTools.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Premium</h2>
            <Link to="/pricing" className="text-sm font-medium text-primary hover:underline">
              Upgrade
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {premiumTools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.id} to={tool.route} className="card-interactive group flex flex-col p-5 opacity-90">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                      <Lock className="h-3 w-3" />
                      Premium
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{tool.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
