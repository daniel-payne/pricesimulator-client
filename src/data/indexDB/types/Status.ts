import { ScenarioSpeed } from "../enums/ScenarioSpeed"

export type Status = {
  id?: string

  startDay?: string
  speed?: ScenarioSpeed

  currentTimestamp?: number
  currentDay?: string
  isActive?: boolean
}
