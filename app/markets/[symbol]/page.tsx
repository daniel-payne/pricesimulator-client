import MarketDetails from "@/components/market/MarketDetails"

export default async function MarketsSymbolPage({ params }: { params: { symbol: string } }) {
  const symbol = decodeURIComponent(params.symbol)

  return (
    <main className="h-full flex flex-col overflow-hidden" data-component="ScenarioPage">
      <MarketDetails className="h-full w-full" symbol={symbol} />
    </main>
  )
}
