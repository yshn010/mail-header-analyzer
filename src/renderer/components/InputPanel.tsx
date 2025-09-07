import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

type Props = {
  value: string
  onChange: (value: string) => void
  onAnalyze: () => void
  onClear: () => void
}

export function InputPanel({ value, onChange, onAnalyze, onClear }: Props) {
  return (
    <div className="w-2/5 border-r border-gray-200 bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col">
        <Textarea
          className="w-full flex-1 resize-none rounded-md border-gray-300 bg-gray-50 p-4 text-sm placeholder:text-gray-500 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]"
          placeholder="ここにメールヘッダーを貼り付け..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="mt-4 flex gap-3">
        <Button onClick={onAnalyze}
          className="flex-1 rounded-md bg-[var(--primary-color)] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          解析
        </Button>
        <Button onClick={onClear}
          variant="secondary"
          className="flex-1 rounded-md bg-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
        >
          クリア
        </Button>
      </div>
    </div>
  )
}
