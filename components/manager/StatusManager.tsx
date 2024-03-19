"use client"

import db from "@/data/indexDB/db"
import useStatus from "@/data/indexDB/hooks/useStatus"
import { Speed } from "@/data/indexDB/types/Status"

import { Button } from "@nextui-org/react"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusManager({ title = "StatusManager", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const handleStartTimer = () => {
    db.startTimer()
  }

  const handleStartTimerSlow = () => {
    db.startTimer(Speed.slow)
  }

  const handleStartTimerMedium = () => {
    db.startTimer(Speed.medium)
  }

  const handleStartTimerFast = () => {
    db.startTimer(Speed.fast)
  }

  const handleStopTimer = () => {
    db.stopTimer()
  }

  return (
    <div {...rest} data-component={title}>
      <div className="p-2">
        StatusManager
        <pre>{JSON.stringify(status ?? "NO STATUS", null, 2)}</pre>
        <Button onPress={handleStartTimer}>StartTimer</Button>
        &nbsp;
        <Button onPress={handleStartTimerSlow}>StartTimer slow</Button>
        &nbsp;
        <Button onPress={handleStartTimerMedium}>StartTimer medium</Button>
        &nbsp;
        <Button onPress={handleStartTimerFast}>StartTimer fast</Button>
        &nbsp;
        <Button onPress={handleStopTimer}>StopTimer</Button>
      </div>
    </div>
  )
}
