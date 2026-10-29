import { Link } from 'react-router-dom'
import { tools } from '@/tools/registry'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react'

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b hero-glow">
        <div className="container mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 backdrop-blur px-3 py-1 text-sm text-muted-foreground mb-6 shadow-soft">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered toolkit for developers & students
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Format, generate & understand code — faster
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            DevKit gives you beautiful, focused tools for JSON, Markdown, READMEs, error explanation and technical reports. No clutter. Just results.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/tools/json-formatter">
                Try JSON Formatter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight mb-2">All tools</h2>
        <p className="text-muted-foreground mb-8">Start with any tool. Non-AI tools are free and unlimited.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                to={tool.route}
                className="group relative card-interactive p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/15 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  {tool.isPremium && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded">
                      Premium
                    </span>
                  )}
                  {tool.isAI && !tool.isPremium && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded">
                      AI
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why section */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-12">Why DevKit?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Fast & focused</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No sign-up required for the core tools. Get results in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Privacy first</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Non-AI tools run entirely in your browser. Your code never leaves the device.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">AI when you need it</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Error explanation and polished READMEs powered by modern LLMs — with clear daily limits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
