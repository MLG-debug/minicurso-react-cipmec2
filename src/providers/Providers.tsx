"use client"

import { TasksContextProvider } from "@/contexts/TasksContext"

export const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <TasksContextProvider>
      {children}
    </TasksContextProvider>
  )
}