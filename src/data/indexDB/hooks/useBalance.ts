import { useEffect, useState } from "react"

import balanceCalculate from "../controllers/balanceCalculate"

import useTimer from "./useTimer"
import useTransactions from "./useTransactions"

export default function useBalance(): any | undefined {
  const [balance, setBalance] = useState<any>()

  const timer = useTimer()
  const transactions = useTransactions()

  useEffect(() => {
    const run = async () => {
      const newBalance = await balanceCalculate()

      setBalance(newBalance)
    }

    run()
  }, [timer, transactions])

  return balance ?? {}
}
