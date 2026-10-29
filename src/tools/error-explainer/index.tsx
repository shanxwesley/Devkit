import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ToolLayout } from '@/components/ToolLayout'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { toast } from '@/components/Toast'
import { Loader2, Bug } from 'lucide-react'

const LANGUAGES = [
  'Auto-detect', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Go',
  'Rust', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin',
]

// Mock AI response for demo (replace with real backend call)
function mockExplain(error: string, lang: string): string {
  return `## Plain-English Explanation

**Your error:** \`${error.trim().split('\n')[0].slice(0, 120)}\`

This error typically occurs when the code tries to access a property or call a method on a value that is \`null\` or \`undefined\`.

**Language / Framework:** ${lang === 'Auto-detect' ? 'Detected from the stack trace' : lang}

## Likely Cause

1. A variable was never initialized.
2. An API call returned \`null\` and the result was used without a null-check.
3. Optional chaining (\`?.\`) was not used where it should have been.

## Step-by-step Fixes

1. **Locate the line** mentioned in the stack trace.
2. **Add a null check** or use optional chaining:
   \`\`\`js
   // Before
   const name = user.profile.name

   // After
   const name = user?.profile?.name ?? 'Anonymous'
   \`\`\`
3. **Guard early** if the value is required:
   \`\`\`js
   if (!user) {
     throw new Error('User is required')
   }
   \`\`\`
4. **Check the data source** – make sure the upstream API or database actually returns the expected shape.

## Quick Example Fix

\`\`\`js
function getDisplayName(user) {
  if (!user?.profile) {
    return 'Guest'
  }
  return user.profile.displayName || user.profile.name || 'Unknown'
}
\`\`\`

---
*This is a simulated AI response for the MVP. Connect a real Anthropic/OpenAI key on the backend for production use.*`
}

export function ErrorExplainer() {
  const [errorText, setErrorText] = useState('')
  const [language, setLanguage] = useState('Auto-detect')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const explain = async () => {
    if (!errorText.trim()) {
      toast('Paste an error message first', 'error')
      return
    }
    setLoading(true)
    setResult('')
    toast('Analyzing error…', 'info')

    // Simulate streaming
    await new Promise((r) => setTimeout(r, 800))
    const full = mockExplain(errorText, language)

    // Fake streaming effect
    let i = 0
    const interval = setInterval(() => {
      i += 12
      setResult(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(interval)
        setLoading(false)
        toast('Explanation ready', 'success')
      }
    }, 16)
  }

  return (
    <ToolLayout
      title="AI Error Explainer"
      description="Paste any error message or stack trace. Get a clear explanation, likely cause, and step-by-step fixes."
      actions={result ? <CopyButton text={result} label="Copy explanation" /> : null}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Language / Framework (optional)</label>
            <select
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Error message / Stack trace</label>
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[280px] font-mono"
              placeholder={`Paste error here, e.g.\n\nTypeError: Cannot read properties of undefined (reading 'name')\n    at getUser (app.js:42:18)\n    at processRequest (server.js:15:5)`}
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
            />
          </div>

          <Button onClick={explain} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Bug className="mr-2 h-4 w-4" />
                Explain Error
              </>
            )}
          </Button>
        </div>

        {/* Output */}
        <div className="border rounded-lg overflow-hidden flex flex-col min-h-[420px]">
          <div className="px-3 py-2 border-b bg-muted/50 text-sm font-medium">Explanation</div>
          <div className="flex-1 overflow-auto p-4">
            {result ? (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                {loading ? 'Generating explanation…' : 'Result will appear here'}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
