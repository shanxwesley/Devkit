import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '₱0',
    period: 'forever',
    description: 'Perfect for students and quick tasks.',
    features: [
      'Unlimited JSON Formatter',
      'Unlimited Markdown Editor',
      'README Generator (template)',
      '10 AI requests / day',
      'No account required for non-AI tools',
    ],
    cta: 'Start for free',
    href: '/',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '₱149',
    period: '/ month',
    description: 'For power users and teams.',
    features: [
      'Everything in Free',
      '200 AI requests / day',
      'Saved workspaces & projects',
      'Advanced README templates',
      'Technical Report Generator',
      'Export to PDF',
      'Priority support',
    ],
    cta: 'Upgrade (coming soon)',
    href: '#',
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="mt-4 text-muted-foreground">
          Start free. Upgrade when you need more AI power and saved projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'rounded-2xl border p-8 flex flex-col',
              plan.highlighted && 'border-primary shadow-lg relative'
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </span>
            )}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className="mt-8 w-full"
              variant={plan.highlighted ? 'default' : 'outline'}
              asChild
              disabled={plan.href === '#'}
            >
              <Link to={plan.href}>{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-10">
        Payments via Stripe / PayMongo coming soon. The upgrade button is currently a stub.
      </p>
    </div>
  )
}
