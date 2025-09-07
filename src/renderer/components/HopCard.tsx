import { Badge } from './ui/badge'

type Props = {
  hop: number
  title: string
  from: string | null
  by: string | null
  at: string | null
  delaySeconds: number | null
}

function badgeStyle(seconds: number | null): { className: string; text: string } {
  if (seconds === null || Number.isNaN(seconds)) {
    return { className: 'bg-gray-100 text-gray-800 px-2.5 py-0.5 text-xs font-medium', text: 'N/A' }
  }
  const text = `+${seconds.toFixed(1)}s`
  if (seconds < 1) return { className: 'bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium', text }
  if (seconds < 5) return { className: 'bg-yellow-100 text-yellow-800 px-2.5 py-0.5 text-xs font-medium', text }
  return { className: 'bg-red-100 text-red-800 px-2.5 py-0.5 text-xs font-medium', text }
}

export function HopCard({ hop, title, from, by, at, delaySeconds }: Props) {
  const b = badgeStyle(delaySeconds)
  return (
    <div className="flex items-center gap-4 rounded-md border border-gray-200 p-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          <span className="font-bold">Hop {hop}:</span> {title}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold">From:</span> {from ?? 'N/A'}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold">By:</span> {by ?? 'N/A'}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-semibold">At:</span> {at ?? 'N/A'}
        </p>
      </div>
      <Badge className={`rounded-full border-0 ${b.className}`}>{b.text}</Badge>
    </div>
  )
}
