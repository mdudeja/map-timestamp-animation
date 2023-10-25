"use client"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L, { Icon, LatLngExpression } from "leaflet"
import { useEffect, useReducer, useState } from "react"
import AnimatorComponent from "./animator"
import locations from "../lib/data/locations.json"
import { getAnimationSpeed } from "../lib/otherutils/AnimationSpeed"
import ProgressbarComponent from "./progressBar"

export type LocationsToShow = {
  iteration: number
  data: any[]
  lastIdx: number
}

export default function Map() {
  const { speed, minimumTimestamp, duration } = getAnimationSpeed()
  const [icons, setIcons] = useState<Icon[]>([])

  const [locationsToShow, setLocationsToShow] = useReducer(
    (
      state: {
        iteration: number
        data: any[]
        lastIdx: number
      },
      action: {
        minimumTimestamp: number
        speed: number
        lastIdx: number
      }
    ) => {
      const tillTimestamp =
        action.minimumTimestamp + (state.iteration + 1) * action.speed * 0.25
      const selectedLocations = locations.filter(
        (l) => l && l.timestamp <= tillTimestamp
      )

      if (selectedLocations.length < locations.length) {
        setTimeout(() => {
          setLocationsToShow({
            minimumTimestamp: action.minimumTimestamp,
            speed: action.speed,
            lastIdx: state.data.length,
          })
        }, 250)
      }

      return {
        iteration: state.iteration + 1,
        data: selectedLocations,
        lastIdx: action.lastIdx,
      }
    },
    {
      iteration: 0,
      data: [],
      lastIdx: 0,
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
    setLocationsToShow({
      minimumTimestamp,
      speed,
      lastIdx: 0,
    })
  }, [setLocationsToShow, minimumTimestamp, speed])

  return (
    <div className="h-full w-full mx-auto">
      {icons.length && (
        <>
          <ProgressbarComponent
            totalDuration={duration * 1000}
            timeSinceStart={locationsToShow.iteration * speed * 0.25}
            totalSigs={locationsToShow.data.length}
            minimumTimestamp={minimumTimestamp}
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
