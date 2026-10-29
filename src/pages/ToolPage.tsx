import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getToolById } from '@/tools/registry'

export function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>()
  const tool = toolId ? getToolById(toolId) : undefined

  useEffect(() => {
    if (tool) {
      document.title = tool.meta.title
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', tool.meta.description)
    }
    return () => {
      document.title = 'DevKit — AI Document & Code Toolkit'
    }
  }, [tool])

  if (!tool) {
    return <Navigate to="/" replace />
  }

  const Component = tool.component
  return <Component />
}
