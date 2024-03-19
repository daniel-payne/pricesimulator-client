export default async function loadScenarios() {
  const response = await fetch(`http://localhost:4000/rest/scenarios`, { cache: "no-cache" })

  if (response.ok === false) {
    return { error: response.statusText }
  }

  const json = await response.json()

  return json
}
