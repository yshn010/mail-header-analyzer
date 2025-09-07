export type Summary = {
  subject: string | null
  from: string | null
  to: string | null
  date: string | null
}

export type DeliveryHop = {
  hop: number
  from: string | null
  by: string | null
  timestamp: string | null
  delay_seconds: number | null
}

export type AnalysisResult = {
  summary: Summary
  delivery_path: DeliveryHop[]
}

