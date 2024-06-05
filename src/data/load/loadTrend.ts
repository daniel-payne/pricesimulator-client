export default async function loadTrend(symbol: string) {
  const response = await fetch(`http://localhost:4000/rest/prices/${symbol}`, { cache: "no-cache" })

  if (response.ok === false) {
    return { error: response.statusText }
  }

  const json = await response.json()

  return json
}
