import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ToolLayout } from '@/components/ToolLayout'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { DownloadButton } from '@/components/DownloadButton'
import { toast } from '@/components/Toast'
import { Sparkles, Plus, X } from 'lucide-react'

const TECH_OPTIONS = [
  'React', 'Vue', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'Go',
  'PostgreSQL', 'MongoDB', 'Docker', 'Tailwind CSS', 'Prisma', 'Express',
]

interface FormState {
  name: string
  description: string
  tech: string[]
  installation: string
  usage: string
  license: string
  author: string
  features: string
  contributing: string
  roadmap: string
}

const DEFAULT: FormState = {
  name: 'My Awesome Project',
  description: 'A short description of what this project does and who it is for.',
  tech: ['React', 'TypeScript', 'Tailwind CSS'],
  installation: 'npm install\nnpm run dev',
  usage: 'Open http://localhost:5173 in your browser.',
  license: 'MIT',
  author: '',
  features: '- Fast and lightweight\n- Easy to use\n- Fully typed',
  contributing: '',
  roadmap: '',
}

function buildReadme(f: FormState): string {
  const lines: string[] = []
  lines.push(`# ${f.name || 'Project Name'}`)
  lines.push('')
  lines.push(f.description || 'Project description goes here.')
  lines.push('')

  if (f.features.trim()) {
    lines.push('## Features')
    lines.push('')
    lines.push(f.features.trim())
    lines.push('')
  }

  if (f.tech.length) {
    lines.push('## Tech Stack')
    lines.push('')
    lines.push(f.tech.map((t) => `- ${t}`).join('\n'))
    lines.push('')
  }

  if (f.installation.trim()) {
    lines.push('## Installation')
    lines.push('')
    lines.push('```bash')
    lines.push(f.installation.trim())
    lines.push('```')
    lines.push('')
  }

  if (f.usage.trim()) {
    lines.push('## Usage')
    lines.push('')
    lines.push(f.usage.trim())
    lines.push('')
  }

  if (f.contributing.trim()) {
    lines.push('## Contributing')
    lines.push('')
    lines.push(f.contributing.trim())
    lines.push('')
  }

  if (f.roadmap.trim()) {
    lines.push('## Roadmap')
    lines.push('')
    lines.push(f.roadmap.trim())
    lines.push('')
  }

  if (f.license) {
    lines.push('## License')
    lines.push('')
    lines.push(`This project is licensed under the ${f.license} License.`)
    lines.push('')
  }

  if (f.author) {
    lines.push('## Author')
    lines.push('')
    lines.push(f.author)
    lines.push('')
  }

  return lines.join('\n')
}

export function ReadmeGenerator() {
  const [form, setForm] = useState<FormState>(DEFAULT)
  const [customTech, setCustomTech] = useState('')
  const [improving, setImproving] = useState(false)

  const readme = useMemo(() => buildReadme(form), [form])

  const update = (key: keyof FormState, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const toggleTech = (t: string) => {
    setForm((prev) => ({
      ...prev,
      tech: prev.tech.includes(t) ? prev.tech.filter((x) => x !== t) : [...prev.tech, t],
    }))
  }

  const addCustomTech = () => {
    if (customTech.trim() && !form.tech.includes(customTech.trim())) {
      update('tech', [...form.tech, customTech.trim()])
      setCustomTech('')
    }
  }

  // Simulated AI improve (no real API key needed for MVP)
  const improveWithAI = async () => {
    setImproving(true)
    toast('Improving description & features with AI…', 'info')
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500))

    setForm((prev) => ({
      ...prev,
      description:
        prev.description +
        ' This project aims to solve real developer pain points with a clean, extensible architecture and thoughtful UX.',
      features:
        prev.features +
        '\n- Dark mode support\n- Fully responsive design\n- Keyboard shortcuts for power users',
    }))
    setImproving(false)
    toast('README improved!', 'success')
  }

  return (
    <ToolLayout
      title="README Generator"
      description="Fill in the form to generate a professional README.md. Use the AI button to polish the text."
      actions={
        <>
          <CopyButton text={readme} label="Copy README" />
          <DownloadButton content={readme} filename="README.md" mime="text/markdown" />
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project name</label>
            <input
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tech stack</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TECH_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTech(t)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                    form.tech.includes(t)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  {t}
                </button>
              ))}
              {form.tech
                .filter((t) => !TECH_OPTIONS.includes(t))
                .map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground"
                  >
                    {t}
                    <button onClick={() => toggleTech(t)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm"
                placeholder="Add custom tech…"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomTech()}
              />
              <Button size="sm" variant="outline" onClick={addCustomTech}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Features (Markdown list)</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] font-mono"
              value={form.features}
              onChange={(e) => update('features', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Installation</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px] font-mono"
              value={form.installation}
              onChange={(e) => update('installation', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Usage</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px]"
              value={form.usage}
              onChange={(e) => update('usage', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">License</label>
              <select
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.license}
                onChange={(e) => update('license', e.target.value)}
              >
                <option>MIT</option>
                <option>Apache-2.0</option>
                <option>GPL-3.0</option>
                <option>BSD-3-Clause</option>
                <option>Unlicense</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Author</label>
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.author}
                onChange={(e) => update('author', e.target.value)}
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Contributing (optional)</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[50px]"
              value={form.contributing}
              onChange={(e) => update('contributing', e.target.value)}
            />
          </div>

          <Button onClick={improveWithAI} disabled={improving} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {improving ? 'Improving…' : 'Improve with AI'}
          </Button>
        </div>

        {/* Live preview */}
        <div className="border rounded-lg overflow-hidden flex flex-col h-[700px]">
          <div className="px-3 py-2 border-b bg-muted/50 text-sm font-medium">Live Preview</div>
          <div className="flex-1 overflow-auto p-4 prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
