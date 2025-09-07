import { HopCard } from './HopCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import type { AnalysisResult } from '../lib/types'

type Props = {
  result: AnalysisResult | null
}

export function ResultsPanel({ result }: Props) {
  const summary = result?.summary
  return (
    <div className="w-3/5 flex flex-col overflow-y-auto p-6">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">基本情報</h2>
          <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-sm">
            <p className="font-bold text-gray-600">件名</p>
            <p className="text-gray-800">{summary?.subject ?? '—'}</p>
            <p className="font-bold text-gray-600">From</p>
            <p className="text-gray-800">{summary?.from ?? '—'}</p>
            <p className="font-bold text-gray-600">To</p>
            <p className="text-gray-800">{summary?.to ?? '—'}</p>
            <p className="font-bold text-gray-600">Date</p>
            <p className="text-gray-800">{summary?.date ?? '—'}</p>
          </div>
        </div>
        <Tabs defaultValue="route">
          <div className="border-t border-gray-200">
            <div className="border-b border-gray-200">
              <TabsList className="-mb-px flex space-x-6 px-6">
                <TabsTrigger value="route">配送経路</TabsTrigger>
                <TabsTrigger value="other">その他</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="route">
              <div className="p-6">
                {!result || result.delivery_path.length === 0 ? (
                  <div className="text-sm text-gray-500">結果がここに表示されます。</div>
                ) : (
                  <div className="space-y-4">
                    {result.delivery_path.map((h) => (
                      <HopCard
                        key={h.hop}
                        hop={h.hop}
                        title={h.by ?? h.from ?? '-'}
                        from={h.from}
                        by={h.by}
                        at={h.timestamp}
                        delaySeconds={h.delay_seconds}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="other">
              <div className="p-6 text-sm text-gray-500">Coming soon...</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
