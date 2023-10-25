"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react"

export default function HomePage() {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        ssr: false,
      }),
    []
  )

  return (
    <main className="h-screen">
      <MapComponent />
    </main>
  )
}
