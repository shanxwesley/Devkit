import { Download } from 'lucide-react'
import { Button } from './ui/button'
import { downloadFile } from '@/lib/utils'

interface DownloadButtonProps {
  content: string
  filename: string
  mime?: string
  label?: string
  className?: string
}

export function DownloadButton({
  content,
  filename,
  mime = 'text/plain',
  label = 'Download',
  className,
}: DownloadButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => downloadFile(content, filename, mime)}
      className={className}
      disabled={!content}
    >
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
