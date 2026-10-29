import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ToolLayout } from '@/components/ToolLayout'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { DownloadButton } from '@/components/DownloadButton'
import { toast } from '@/components/Toast'
import { Sparkles, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ReportForm {
  title: string
  author: string
  date: string
  introduction: string
  method: string
  results: string
  conclusion: string
  references: string
}

const DEFAULT: ReportForm = {
  title: 'Performance Analysis of the Caching Layer',
  author: '',
  date: new Date().toISOString().slice(0, 10),
  introduction: '- Goal of the investigation\n- Scope and constraints',
  method: '- Benchmark setup\n- Tools used\n- Test data',
  results: '- Key metrics\n- Observations',
  conclusion: '- Main takeaways\n- Next steps',
  references: '',
}

function buildReport(f: ReportForm): string {
  const lines: string[] = []
  lines.push(`# ${f.title}`)
  lines.push('')
  if (f.author) lines.push(`**Author:** ${f.author}`)
  lines.push(`**Date:** ${f.date}`)
  lines.push('')
  lines.push('## 1. Introduction')
  lines.push('')
  lines.push(f.introduction || '')
  lines.push('')
  lines.push('## 2. Method')
  lines.push('')
  lines.push(f.method || '')
  lines.push('')
  lines.push('## 3. Results')
  lines.push('')
  lines.push(f.results || '')
  lines.push('')
  lines.push('## 4. Conclusion')
  lines.push('')
  lines.push(f.conclusion || '')
  lines.push('')
  if (f.references.trim()) {
    lines.push('## References')
    lines.push('')
    lines.push(f.references.trim())
    lines.push('')
  }
  return lines.join('\n')
}

export function ReportGenerator() {
  const [form, setForm] = useState<ReportForm>(DEFAULT)
  const [expanding, setExpanding] = useState(false)
  // Premium gate – for MVP we just show a banner
  const isPremium = false

  const report = useMemo(() => buildReport(form), [form])

  const update = (key: keyof ReportForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const expandWithAI = async () => {
    if (!isPremium) {
      toast('This feature requires Premium', 'error')
      return
    }
    setExpanding(true)
    await new Promise((r) => setTimeout(r, 1200))
    setForm((prev) => ({
      ...prev,
      introduction:
        prev.introduction +
        '\n\nThis report investigates the effectiveness of the new Redis caching layer introduced in Q3. We measured latency and hit-rate under realistic load.',
      results:
        prev.results +
        '\n\nP99 latency dropped from 180 ms to 42 ms. Cache hit rate averaged 87 % during peak hours.',
    }))
    setExpanding(false)
    toast('Sections expanded', 'success')
  }

  return (
    <ToolLayout
      title="Technical Report Generator"
      description="Create structured technical reports. Optional AI expansion turns bullet outlines into full paragraphs."
      isPremium
      actions={
        <>
          <CopyButton text={report} label="Copy Markdown" />
          <DownloadButton content={report} filename="report.md" mime="text/markdown" />
        </>
      }
    >
      {!isPremium && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-100">
          <Lock className="h-5 w-5 shrink-0" />
          <div className="flex-1 text-sm">
            AI expansion and advanced templates are available on the Premium plan.
          </div>
          <Button size="sm" asChild>
            <Link to="/pricing">Upgrade</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Author</label>
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.author}
                onChange={(e) => update('author', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
              />
            </div>
          </div>

          {(['introduction', 'method', 'results', 'conclusion'] as const).map((section) => (
            <div key={section}>
              <label className="text-sm font-medium capitalize">{section}</label>
              <textarea
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] font-mono"
                value={form[section]}
                onChange={(e) => update(section, e.target.value)}
                placeholder="Bullet points work great here…"
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium">References (optional)</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px]"
              value={form.references}
              onChange={(e) => update('references', e.target.value)}
            />
          </div>

          <Button onClick={expandWithAI} disabled={expanding} className="w-full" variant={isPremium ? 'default' : 'secondary'}>
            <Sparkles className="mr-2 h-4 w-4" />
            {expanding ? 'Expanding…' : 'Expand outline with AI'}
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden flex flex-col h-[700px]">
          <div className="px-3 py-2 border-b bg-muted/50 text-sm font-medium">Preview</div>
          <div className="flex-1 overflow-auto p-4 prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
