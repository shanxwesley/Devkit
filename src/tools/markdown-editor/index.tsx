import { useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ToolLayout } from '@/components/ToolLayout'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/CopyButton'
import { DownloadButton } from '@/components/DownloadButton'
import {
  Bold, Italic, Heading1, Heading2, Link as LinkIcon, Code, List, ListOrdered, Quote
} from 'lucide-react'

const SAMPLE = `# Welcome to the Markdown Editor

Write **GitHub Flavored Markdown** on the left and see a live preview on the right.

## Features
- Tables
- Task lists
- Code blocks with syntax highlighting
- Strikethrough ~~like this~~

### Task list example
- [x] Build the editor
- [ ] Add more tools
- [ ] Ship it

\`\`\`js
function hello() {
  console.log("Hello, DevKit!")
}
\`\`\`

| Feature | Status |
|---------|--------|
| Live preview | ✅ |
| GFM support | ✅ |
| Export | ✅ |
`

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(SAMPLE)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertSyntax = useCallback((before: string, after = '', placeholder = '') => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = markdown.slice(start, end) || placeholder
    const newText = markdown.slice(0, start) + before + selected + after + markdown.slice(end)
    setMarkdown(newText)
    // Restore focus and selection
    requestAnimationFrame(() => {
      ta.focus()
      const cursor = start + before.length + selected.length
      ta.setSelectionRange(cursor, cursor)
    })
  }, [markdown])

  const toolbar = [
    { icon: Bold, action: () => insertSyntax('**', '**', 'bold'), title: 'Bold' },
    { icon: Italic, action: () => insertSyntax('*', '*', 'italic'), title: 'Italic' },
    { icon: Heading1, action: () => insertSyntax('# ', '', 'Heading'), title: 'H1' },
    { icon: Heading2, action: () => insertSyntax('## ', '', 'Heading'), title: 'H2' },
    { icon: LinkIcon, action: () => insertSyntax('[', '](https://)', 'link text'), title: 'Link' },
    { icon: Code, action: () => insertSyntax('`', '`', 'code'), title: 'Inline code' },
    { icon: List, action: () => insertSyntax('- ', '', 'item'), title: 'Bullet list' },
    { icon: ListOrdered, action: () => insertSyntax('1. ', '', 'item'), title: 'Numbered list' },
    { icon: Quote, action: () => insertSyntax('> ', '', 'quote'), title: 'Quote' },
  ]

  const toHtml = () => {
    // Simple export – for production you'd use a proper markdown-to-html lib
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Export</title>
<style>body{font-family:system-ui;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6}
pre{background:#f4f4f4;padding:1rem;overflow:auto;border-radius:6px}
code{font-family:ui-monospace,monospace}
table{border-collapse:collapse;width:100%}
th,td{border:1px solid #ddd;padding:8px}th{background:#f4f4f4}</style>
</head>
<body>
${document.querySelector('.markdown-preview')?.innerHTML || ''}
</body></html>`
  }

  return (
    <ToolLayout
      title="Markdown Editor & Preview"
      description="Write GitHub Flavored Markdown with live preview. Export as .md or .html."
      actions={
        <>
          <CopyButton text={markdown} label="Copy Markdown" />
          <DownloadButton content={markdown} filename="document.md" mime="text/markdown" />
          <DownloadButton
            content={toHtml()}
            filename="document.html"
            mime="text/html"
            label="Export HTML"
          />
        </>
      }
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 mb-4 rounded-lg border bg-card">
        {toolbar.map(({ icon: Icon, action, title }) => (
          <Button key={title} variant="ghost" size="icon" onClick={action} title={title}>
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[560px]">
        {/* Editor */}
        <div className="flex flex-col border rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-b bg-muted/50 text-sm font-medium">Editor</div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full p-4 resize-none bg-background font-mono text-sm focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col border rounded-lg overflow-hidden">
          <div className="px-3 py-2 border-b bg-muted/50 text-sm font-medium">Preview</div>
          <div className="flex-1 overflow-auto p-4 markdown-preview prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
