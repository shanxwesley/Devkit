import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from './ui/button'
import { copyToClipboard } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label = 'Copy', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={className}
      disabled={!text}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  )
}
