import DataHeader from "@/components/header/DataHeader"
import MarketsManager from "@/components/manager/MarketsManager"

export default async function MarketsPage() {
  return (
    <main className="h-full flex flex-col overflow-hidden" data-component="ScenarioPage">
      <div className="h-full w-full flex flex-col gap-2">
        <DataHeader />
        <MarketsManager className="flex-auto" />
      </div>
    </main>
  )
}
