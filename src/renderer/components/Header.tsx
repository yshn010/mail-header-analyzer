import { Mail } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3 text-gray-900">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-color)] text-white">
          <Mail className="h-5 w-5" />
        </div>
        <h1 className="text-lg font-bold">メールヘッダー解析ツール</h1>
      </div>
    </header>
  )
}

