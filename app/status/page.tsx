import StatusManager from "@/components/manager/StatusManager"

export default async function StatusPage() {
  return (
    <main className="h-full flex flex-col overflow-hidden" data-component="ScenarioPage">
      <StatusManager />
    </main>
  )
}
