import { Braces, FileText, BookOpen, Bug, FileBarChart, type LucideIcon } from 'lucide-react'
import { JsonFormatter } from './json-formatter'
import { MarkdownEditor } from './markdown-editor'
import { ReadmeGenerator } from './readme-generator'
import { ErrorExplainer } from './error-explainer'
import { ReportGenerator } from './report-generator'

export interface ToolConfig {
  id: string
  name: string
  description: string
  icon: LucideIcon
  route: string
  isPremium: boolean
  isAI: boolean
  component: React.ComponentType
  meta: {
    title: string
    description: string
  }
}

export const tools: ToolConfig[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, and validate JSON with indent options and key sorting.',
    icon: Braces,
    route: '/tools/json-formatter',
    isPremium: false,
    isAI: false,
    component: JsonFormatter,
    meta: {
      title: 'JSON Formatter & Validator Online — DevKit',
      description: 'Free online JSON formatter, beautifier, minifier and validator. Fix invalid JSON, sort keys, and choose indent size.',
    },
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Live Markdown editor with GFM support, toolbar, and HTML export.',
    icon: FileText,
    route: '/tools/markdown-editor',
    isPremium: false,
    isAI: false,
    component: MarkdownEditor,
    meta: {
      title: 'Markdown Editor & Preview Online — DevKit',
      description: 'Write and preview GitHub Flavored Markdown with live rendering, toolbar shortcuts, and export to .md or .html.',
    },
  },
  {
    id: 'readme-generator',
    name: 'README Generator',
    description: 'Generate professional project READMEs from a form. Optional AI polish.',
    icon: BookOpen,
    route: '/tools/readme-generator',
    isPremium: false,
    isAI: true,
    component: ReadmeGenerator,
    meta: {
      title: 'README Generator — Create Project READMEs Instantly — DevKit',
      description: 'Generate clean, professional README.md files for your projects. Template-based with optional AI improvement.',
    },
  },
  {
    id: 'error-explainer',
    name: 'Error Explainer',
    description: 'Paste any error or stack trace and get a plain-English explanation + fix steps.',
    icon: Bug,
    route: '/tools/error-explainer',
    isPremium: false,
    isAI: true,
    component: ErrorExplainer,
    meta: {
      title: 'AI Error Explainer — Understand Stack Traces Instantly — DevKit',
      description: 'Paste an error message or stack trace and get a clear explanation, likely cause, and step-by-step fixes powered by AI.',
    },
  },
  {
    id: 'report-generator',
    name: 'Technical Report',
    description: 'Create structured technical reports in Markdown or HTML with optional AI expansion.',
    icon: FileBarChart,
    route: '/tools/report-generator',
    isPremium: true,
    isAI: true,
    component: ReportGenerator,
    meta: {
      title: 'Technical Report Generator — DevKit',
      description: 'Generate structured technical reports with introduction, methods, results and conclusion. Optional AI expansion.',
    },
  },
]

export function getToolById(id: string) {
  return tools.find((t) => t.id === id)
}

export function getToolByRoute(route: string) {
  return tools.find((t) => t.route === route)
}
