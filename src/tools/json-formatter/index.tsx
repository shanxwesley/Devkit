import { useState, useCallback, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { ToolLayout } from '@/components/ToolLayout'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { DownloadButton } from '@/components/DownloadButton'
import { toast } from '@/components/Toast'
import { Braces, Minimize2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type IndentOption = 2 | 4 | 'tab'

export function JsonFormatter() {
  const [input, setInput] = useState('{\n  "hello": "world",\n  "nested": {\n    "value": 42\n  }\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [indent, setIndent] = useState<IndentOption>(2)
  const [sortKeys, setSortKeys] = useState(false)
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  )

  // Keep monaco theme in sync with dark mode toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const sortObject = (obj: unknown): unknown => {
    if (Array.isArray(obj)) {
      return obj.map(sortObject)
    }
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj as object)
        .sort()
        .reduce((acc: Record<string, unknown>, key) => {
          acc[key] = sortObject((obj as Record<string, unknown>)[key])
          return acc
        }, {})
    }
    return obj
  }

  const format = useCallback(() => {
    try {
      let parsed = JSON.parse(input)
      if (sortKeys) parsed = sortObject(parsed)
      const space = indent === 'tab' ? '\t' : indent
      const formatted = JSON.stringify(parsed, null, space)
      setOutput(formatted)
      setError(null)
      toast('JSON formatted successfully', 'success')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON'
      setError(msg)
      setOutput('')
      toast(msg, 'error')
    }
  }, [input, indent, sortKeys])

  const minify = useCallback(() => {
    try {
      let parsed = JSON.parse(input)
      if (sortKeys) parsed = sortObject(parsed)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError(null)
      toast('JSON minified', 'success')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON'
      setError(msg)
      setOutput('')
      toast(msg, 'error')
    }
  }, [input, sortKeys])

  const validate = useCallback(() => {
    try {
      JSON.parse(input)
      setError(null)
      toast('Valid JSON ✓', 'success')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON'
      setError(msg)
      toast(msg, 'error')
    }
  }, [input])

  // Keyboard shortcut
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      format()
    }
  }

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, minify, and validate JSON. Choose indent size and optionally sort keys."
      actions={
        <>
          <CopyButton text={output} label="Copy result" />
          <DownloadButton content={output} filename="formatted.json" mime="application/json" />
        </>
      }
    >
      <div className="space-y-4" onKeyDown={handleKeyDown}>
        {/* Options bar */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Indent:</span>
            {([2, 4, 'tab'] as const).map((opt) => (
              <Button
                key={String(opt)}
                size="sm"
                variant={indent === opt ? 'default' : 'outline'}
                onClick={() => setIndent(opt)}
              >
                {opt === 'tab' ? 'Tab' : `${opt} spaces`}
              </Button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="rounded border-input"
            />
            Sort keys
          </label>
          <div className="flex gap-2 ml-auto">
            <Button onClick={format} size="sm">
              <Braces className="mr-2 h-4 w-4" />
              Format
            </Button>
            <Button onClick={minify} variant="secondary" size="sm">
              <Minimize2 className="mr-2 h-4 w-4" />
              Minify
            </Button>
            <Button onClick={validate} variant="outline" size="sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              Validate
            </Button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Invalid JSON</p>
              <p className="text-sm mt-0.5 font-mono">{error}</p>
            </div>
          </div>
        )}

        {/* Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input</label>
            <div className="border rounded-lg overflow-hidden h-[420px]">
              <Editor
                height="100%"
                defaultLanguage="json"
                value={input}
                onChange={(v) => setInput(v ?? '')}
                theme={isDark ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <div className={cn('border rounded-lg overflow-hidden h-[420px]', !output && 'bg-muted/30')}>
              <Editor
                height="100%"
                defaultLanguage="json"
                value={output}
                theme={isDark ? 'vs-dark' : 'light'}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded border bg-muted text-xs">Ctrl</kbd> +{' '}
          <kbd className="px-1.5 py-0.5 rounded border bg-muted text-xs">Enter</kbd> to format.
        </p>
      </div>
    </ToolLayout>
  )
}
