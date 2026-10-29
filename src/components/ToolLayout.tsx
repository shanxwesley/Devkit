import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
  actions?: ReactNode
  isPremium?: boolean
}

export function ToolLayout({ title, description, children, actions, isPremium }: ToolLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="border-b hero-glow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                All tools
              </Link>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                {title}
                {isPremium && (
                  <span className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">{description}</p>
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  )
}
