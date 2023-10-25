"use client"

import { Marker } from "react-leaflet"
import { Icon, LatLngExpression } from "leaflet"
import { LocationsToShow } from "./map"

export default function AnimatorComponent({
  icons,
  locationsToShow,
}: {
  icons: Icon[]
  locationsToShow: LocationsToShow
}) {
  return (
    <>
      {locationsToShow.data.map((l, idx) => (
        <Marker
          key={idx}
          position={
            (l?.location as unknown as LatLngExpression) ?? [20.593, 78.9629]
          }
          icon={icons[idx % icons.length]}
          zIndexOffset={idx}
        ></Marker>
      ))}
    </>
  )
}
