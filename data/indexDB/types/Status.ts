export enum Speed {
  slow = 1000,
  medium = 500,
  fast = 25,
}

export type Status = {
  id?: string

  startDay?: string
  speed?: Speed

  currentTimestamp?: number
  currentDay?: string
  isActive?: boolean
}
