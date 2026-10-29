import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

let toastId = 0
const listeners = new Set<(toasts: ToastItem[]) => void>()
let toasts: ToastItem[] = []

function notify() {
  listeners.forEach((l) => l([...toasts]))
}

export function toast(message: string, type: ToastType = 'info') {
  const id = ++toastId
  toasts = [...toasts, { id, message, type }]
  notify()
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    notify()
  }, 3500)
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([])

  useEffect(() => {
    listeners.add(setItems)
    return () => {
      listeners.delete(setItems)
    }
  }, [])

  if (items.length === 0) return null

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg min-w-[280px] animate-in slide-in-from-right',
            t.type === 'success' && 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
            t.type === 'error' && 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
            t.type === 'info' && 'bg-card border-border text-foreground'
          )}
        >
          {t.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0" />}
          {t.type === 'error' && <XCircle className="h-5 w-5 shrink-0" />}
          {t.type === 'info' && <Info className="h-5 w-5 shrink-0" />}
          <span className="text-sm flex-1">{t.message}</span>
          <button
            onClick={() => {
              toasts = toasts.filter((x) => x.id !== t.id)
              notify()
            }}
            className="opacity-60 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>,
    document.body
  )
}
