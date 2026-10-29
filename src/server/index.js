/**
 * Simple Express backend skeleton for DevKit.
 * Run with: node --watch src/server/index.js
 * (or npm run server)
 *
 * In production you would:
 * - Add real auth middleware (Clerk / Supabase / NextAuth)
 * - Connect Prisma + PostgreSQL
 * - Call Anthropic / OpenAI from ai.service.js
 * - Enforce rate limits via usage_logs table
 */

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'devkit-api' })
})

// AI Error Explainer endpoint (stub)
app.post('/api/ai/explain-error', async (req, res) => {
  const { error, language } = req.body || {}
  if (!error) {
    return res.status(400).json({ error: 'Missing error text' })
  }

  // TODO: check usage limits here (usage.service.js)
  // TODO: call real AI provider via ai.service.js

  // Simulated response
  res.json({
    explanation: `## Plain-English Explanation\n\n(This is a server stub.)\n\nThe error you pasted appears to be related to a null/undefined access.\n\n**Language:** ${language || 'auto'}\n\nConnect a real Anthropic or OpenAI key in src/server/services/ai.service.js to enable live responses.`,
    tokensUsed: 0,
  })
})

// AI README improve endpoint (stub)
app.post('/api/ai/improve-readme', async (req, res) => {
  const { description, features } = req.body || {}
  res.json({
    description: (description || '') + ' (AI-polished description would appear here)',
    features: (features || '') + '\n- AI-generated feature bullet',
    tokensUsed: 0,
  })
})

// Usage check stub
app.get('/api/usage', (_req, res) => {
  res.json({
    used: 0,
    limit: 10,
    plan: 'free',
  })
})

app.listen(PORT, () => {
  console.log(`DevKit API listening on http://localhost:${PORT}`)
})
