"use client"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L, { Icon, LatLngExpression } from "leaflet"
import { useEffect, useReducer, useState } from "react"
import AnimatorComponent from "./animator"
import locations from "../lib/data/locations.json"
import { getAnimationSpeed } from "../lib/otherutils/AnimationSpeed"
import ProgressbarComponent from "./progressBar"

export type LocationsToShow = {
  data: any[]
}

const as = getAnimationSpeed()
const { speed, mints, duration } = as

export default function Map() {
  const [icons, setIcons] = useState<Icon[]>([])
  const [iteration, setIteration] = useState(0)

  const [locationsToShow, setLocationsToShow] = useReducer(
    (
      state: {
        data: any[]
      },
      action: {
        iteration: number
      }
    ) => {
      const tillTimestamp = mints + (action.iteration + 1) * speed * 250
      const selectedLocations = locations.filter(
        (l) => l && l.timestamp <= tillTimestamp
      )

      return {
        data: selectedLocations,
      }
    },
    {
      data: [],
    }
  )

  useEffect(() => {
    setIcons([
      L.icon({
        iconUrl: "/images/circle.png",
        iconSize: [30, 30],
        iconAnchor: [15, 20],
        // shadowUrl: "/images/marker-shadow.png",
      }),
      L.icon({
        iconUrl: "/images/circle_black.png",
        iconSize: [30, 30],
        iconAnchor: [15, 20],
        // shadowUrl: "/images/marker-shadow.png",
      }),
      L.icon({
        iconUrl: "/images/circle_green.png",
        iconSize: [30, 30],
        iconAnchor: [15, 20],
        // shadowUrl: "/images/marker-shadow.png",
      }),
      L.icon({
        iconUrl: "/images/circle_yellow.png",
        iconSize: [30, 30],
        iconAnchor: [15, 20],
        // shadowUrl: "/images/marker-shadow.png",
      }),
    ])
  }, [setIcons])

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration(iteration + 1)
      setLocationsToShow({
        iteration,
      })
    }, 250)

    if (locationsToShow.data.length >= locations.length) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [
    setLocationsToShow,
    setIteration,
    locationsToShow.data.length,
    iteration,
    locations.length,
  ])

  return (
    <div className="h-full w-full mx-auto">
      {icons.length && (
        <>
          <ProgressbarComponent
            totalDuration={duration}
            timeSinceStart={iteration * speed * 250}
            totalSigs={locationsToShow.data.length}
            minimumTimestamp={mints}
          />
          <MapContainer
            center={[20.593, 78.9629]}
            zoom={
              process.env.NEXT_PUBLIC_DEFAULT_MAP_ZOOM
                ? Number(process.env.NEXT_PUBLIC_DEFAULT_MAP_ZOOM) +
                  Math.floor(0.01 * locationsToShow.data.length)
                : 5
            }
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AnimatorComponent
              icons={icons}
              locationsToShow={locationsToShow}
            />
          </MapContainer>
        </>
      )}
    </div>
  )
}
