import { AnalysisResult, DeliveryHop, Summary } from './types'

const reSubject = /^Subject:\s*(.*)$/im
const reFrom = /^From:\s*(.*)$/im
const reTo = /^To:\s*(.*)$/im
const reDate = /^Date:\s*(.*)$/im

function extractSummary(src: string): Summary {
  const subject = reSubject.exec(src)?.[1]?.trim() ?? null
  const from = reFrom.exec(src)?.[1]?.trim() ?? null
  const to = reTo.exec(src)?.[1]?.trim() ?? null
  const date = reDate.exec(src)?.[1]?.trim() ?? null

  reSubject.lastIndex = 0
  reFrom.lastIndex = 0
  reTo.lastIndex = 0
  reDate.lastIndex = 0

  return { subject, from, to, date }
}

// Return only the header block (before the first blank line)
function getHeaderSection(src: string): string {
  const idx = src.search(/\r?\n\r?\n/)
  return idx === -1 ? src : src.slice(0, idx)
}

// Collect unfolded Received headers preserving order of appearance (top to bottom)
function collectReceivedHeaders(src: string): string[] {
  const headersOnly = getHeaderSection(src)
  const lines = headersOnly.split(/\r?\n/)
  const result: string[] = []
  let current: string | null = null

  for (const rawLine of lines) {
    const line = rawLine
    if (/^Received:/i.test(line)) {
      // push previous
      if (current) result.push(current)
      current = line
    } else if (/^[\t ]/.test(line)) {
      // continuation of previous header
      if (current) current += ' ' + line.trim()
    } else {
      // new header (not a continuation)
      if (current) {
        result.push(current)
        current = null
      }
      // ignore non-Received headers
    }
  }
  if (current) result.push(current)
  return result
}

function stripDateComments(s: string): string {
  // Remove trailing parenthetical comments like (PDT), (JST)
  return s.replace(/\s*\([^()]*\)\s*$/g, '').trim()
}

function parseDateSafe(s?: string | null): Date | null {
  if (!s) return null
  const cleaned = stripDateComments(s)
  const d = new Date(cleaned)
  return isNaN(d.getTime()) ? null : d
}

function extractFromByTimestamp(unfolded: string): { from: string | null; by: string | null; timestamp: string | null } {
  // Normalize whitespace aggressively
  const single = unfolded.replace(/\r?\n[\t ]+/g, ' ').replace(/\s+/g, ' ').trim()

  // Extract from/by heuristically
  const mFrom = /\bfrom\s+(.+?)(?=\s+by\b|\s+with\b|\s+id\b|\s*;|$)/i.exec(single)
  const mBy = /\bby\s+(.+?)(?=\s+with\b|\s+id\b|\s*;|$)/i.exec(single)

  // Timestamp after the last semicolon in the header
  let timestamp: string | null = null
  const lastSemi = single.lastIndexOf(';')
  if (lastSemi !== -1 && lastSemi + 1 < single.length) {
    timestamp = single.slice(lastSemi + 1).trim()
  }

  const from = mFrom?.[1]?.trim() ?? null
  const by = mBy?.[1]?.trim() ?? null
  return { from, by, timestamp }
}

export function analyzeHeaders(src: string): AnalysisResult {
  const summary = extractSummary(src)

  const receivedUnfolded = collectReceivedHeaders(src)

  // Process in reverse (bottom to top) as delivery path order
  const hops: DeliveryHop[] = []
  let prevDate: Date | null = null
  for (let i = receivedUnfolded.length - 1, hop = 1; i >= 0; i--, hop++) {
    const header = receivedUnfolded[i]
    const { from, by, timestamp } = extractFromByTimestamp(header)
    const currDate = parseDateSafe(timestamp)
    let delay: number | null = null
    if (prevDate && currDate) {
      delay = Math.max(0, (currDate.getTime() - prevDate.getTime()) / 1000)
    } else if (!prevDate) {
      delay = 0
    } else {
      delay = null
    }
    hops.push({ hop, from, by, timestamp: timestamp ?? null, delay_seconds: delay })
    prevDate = currDate ?? prevDate
  }

  return { summary, delivery_path: hops }
}
