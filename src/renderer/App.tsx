import { useState } from 'react'
import { Header } from './components/Header'
import { InputPanel } from './components/InputPanel'
import { ResultsPanel } from './components/ResultsPanel'
import { analyzeHeaders } from './lib/parseHeaders'
import type { AnalysisResult } from './lib/types'

export default function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = () => {
    const r = analyzeHeaders(input)
    setResult(r)
  }
  const handleClear = () => {
    setInput('')
    setResult(null)
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex flex-1 overflow-hidden">
          <InputPanel
            value={input}
            onChange={setInput}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
          />
          <ResultsPanel result={result} />
        </main>
      </div>
    </div>
  )
}
