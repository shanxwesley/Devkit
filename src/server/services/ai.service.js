/**
 * Central AI service.
 * All Anthropic / OpenAI calls MUST go through this file.
 * Never expose API keys to the client.
 *
 * Example (Anthropic):
 *
 * import Anthropic from '@anthropic-ai/sdk'
 * const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
 *
 * export async function explainError({ error, language }) {
 *   const msg = await client.messages.create({
 *     model: 'claude-3-5-sonnet-20241022',
 *     max_tokens: 1024,
 *     system: SYSTEM_PROMPTS.errorExplainer,
 *     messages: [{ role: 'user', content: `Language: ${language}\n\nError:\n${error}` }],
 *   })
 *   return { text: msg.content[0].text, tokens: msg.usage.output_tokens }
 * }
 */

export const SYSTEM_PROMPTS = {
  errorExplainer: `You are a senior software engineer helping a student or junior developer.
Given an error message or stack trace, respond with:
1. A plain-English explanation of what the error means.
2. The most likely cause.
3. Step-by-step fixes.
4. A short, relevant code example if applicable.
Keep the tone friendly and clear. Use Markdown.`,

  readmeImprover: `You improve project README descriptions and feature lists.
Rewrite for clarity, professionalism and impact while keeping the original meaning.
Return only the improved text.`,
}

export async function explainError({ error, language }) {
  // Stub – replace with real provider call
  return {
    text: `Stub response for error:\n\n${error.slice(0, 200)}…\n\nLanguage: ${language}`,
    tokens: 0,
  }
}

export async function improveReadme({ description, features }) {
  return {
    description: description + ' (improved)',
    features: features + '\n- Improved feature',
    tokens: 0,
  }
}
