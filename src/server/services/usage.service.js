/**
 * Usage tracking & rate limiting.
 * In production this would read/write the usage_logs table via Prisma.
 */

const FREE_DAILY_LIMIT = 10
const PREMIUM_DAILY_LIMIT = 200

// In-memory store for demo only
const dailyUsage = new Map()

function todayKey(userId) {
  const d = new Date().toISOString().slice(0, 10)
  return `${userId || 'guest'}:${d}`
}

export function getUsage(userId) {
  const key = todayKey(userId)
  const used = dailyUsage.get(key) || 0
  const isPremium = false // look up from DB in real app
  const limit = isPremium ? PREMIUM_DAILY_LIMIT : FREE_DAILY_LIMIT
  return { used, limit, remaining: Math.max(0, limit - used), isPremium }
}

export function canMakeAIRequest(userId) {
  const { remaining } = getUsage(userId)
  return remaining > 0
}

export function recordUsage(userId, tokens = 0) {
  const key = todayKey(userId)
  const current = dailyUsage.get(key) || 0
  dailyUsage.set(key, current + 1)
  // Also log tokens to usage_logs table in production
  return getUsage(userId)
}
