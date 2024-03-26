import { useCallback, useEffect, useState } from "react"

import { useLocalState } from "@keldan-systems/state-mutex"

import generateID from "@/utilities/generateID"

const id = generateID()

const DEFAULT_START = "1981-2-09"

export enum ScenarioSpeed {
  slow = 1000,
  medium = 500,
  fast = 25,
}

const ONE_DAY = 60 * 60 * 24 * 1000

const timeout = { current: null } as { current: number | null }

const useTimer = (selectedStartDay: string = DEFAULT_START) => {
  // let timeout = useRef<NodeJS.Timeout | number | null>(null)

  // const [id] = useState<string>(generateID())
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isNotActive, setIsNotActive] = useState<boolean>(true)

  const [startDay, setStartDay] = useLocalState<string>("TIMER-START", DEFAULT_START)
  const [currentDay, setCurrentDay] = useLocalState<string>("TIMER-CURRENT", DEFAULT_START)
  const [activeTimer, setActiveTimer] = useLocalState<string>("TIMER-ACTIVE", "")
  const [timerSpeed, setTimerSpeed] = useLocalState<ScenarioSpeed>("TIMER-SPEED", ScenarioSpeed.slow)

  const hasStarted = new Date(currentDay) > new Date(startDay)
  const currentTimestamp = new Date(currentDay).getTime()
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const startTimer = useCallback(
    (speed?: ScenarioSpeed) => {
      if (speed != null) {
        setTimerSpeed(speed)
      }

      setActiveTimer(id)
    },
    [setActiveTimer, setTimerSpeed]
  )
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const stopTimer = useCallback(() => {
    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }

    timeout.current = null

    setActiveTimer("STOPPED")
  }, [setActiveTimer])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const nextCurrentDay = useCallback(() => {
    if (timeout.current === null) {
      return
    }

    const oldDate = new Date(currentDay ?? DEFAULT_START)

    const newDate = new Date(oldDate.getTime() + ONE_DAY)

    const newDay = newDate.toISOString().substring(0, 10)

    setCurrentDay(newDay)
  }, [currentDay, setCurrentDay])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const resetTimer = useCallback(
    (startDay?: string) => {
      const start = startDay ?? DEFAULT_START

      stopTimer()

      setStartDay(start)
      setCurrentDay(start)
    },
    [setCurrentDay, setStartDay, stopTimer]
  )
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const toggleTimer = useCallback(() => {
    if (isActive) {
      stopTimer()
    } else {
      startTimer()
    }
  }, [isActive, startTimer, stopTimer])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const isNotActive = activeTimer === "STOPPED"

    setIsActive(!isNotActive)
    setIsNotActive(isNotActive)
  }, [activeTimer, setIsActive, setIsNotActive])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (selectedStartDay && selectedStartDay !== startDay) resetTimer(selectedStartDay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDay])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (id !== "" && activeTimer === id) {
      if (timeout.current) {
        window.clearTimeout(timeout.current)
      }

      timeout.current = window.setTimeout(() => {
        if (id !== "" && activeTimer === id) {
          nextCurrentDay()
        }
      }, timerSpeed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerSpeed, currentDay, activeTimer, id])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (typeof document !== "undefined") {
      window.removeEventListener("onbeforeunload", () => {
        if (activeTimer === id) {
          window.localStorage.removeItem("ACTIVE-TIMER")
        }
      })
    }
  }, [activeTimer, stopTimer])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return {
    data: { id, activeTimer, timerSpeed, startDay, currentDay, isActive, isNotActive, hasStarted, currentTimestamp },
    actions: { startTimer, stopTimer, toggleTimer, nextCurrentDay, resetTimer },
  } as const
}

export default useTimer
