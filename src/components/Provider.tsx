'use client'
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from 'react'

interface ProviderPros {
  children: ReactNode
}
const Provider: FC<ProviderPros> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider
