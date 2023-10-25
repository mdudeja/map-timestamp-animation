import responses from "../data/responses.json"
import coordinates from "../data/geo.json"
import fs from "fs"

function randomizeLocation(latlng: number[]) {
  const [lat, lng] = latlng
  const randomLat = lat + Math.random() * 0.75
  const randomLng = lng + Math.random() * 0.75
  return [randomLat, randomLng]
}

function populateLocations() {
  const combined = responses.map((response) => {
    const location = coordinates.find(
      (c) =>
        c.city
          .trim()
          .toLowerCase()
          .includes(response.City.trim().toLowerCase()) ||
        c.admin_name
          .trim()
          .toLowerCase()
          .includes(response["State or Union Territory"].trim().toLowerCase())
    )

    if (!location) {
      return
    }

    return {
      timestamp: new Date(response["Timestamp"]).getTime(),
      location: [parseFloat(location.lat), parseFloat(location.lng)],
    }
  })

  const uniqueLocations: number[][] = []

  combined.forEach((location) => {
    if (!location) {
      return
    }

    const existingLocation = uniqueLocations.find(
      (l) => l[0] === location.location[0] && l[1] === location.location[1]
    )

    if (!existingLocation) {
      uniqueLocations.push(location.location)
    }
  })

  const adjusted = combined.map((location) => {
    if (!location) {
      return
    }

    const existingLocation = uniqueLocations.find(
      (l) => l[0] === location.location[0] && l[1] === location.location[1]
    )

    if (existingLocation) {
      return {
        ...location,
        location: randomizeLocation(location.location),
      }
    }

    return location
  })

  return adjusted
}

const combinedLocations = populateLocations()

fs.writeFileSync(
  process.env.LOCATIONS_JSON_PATH || "./src/lib/data/locations.json",
  JSON.stringify(combinedLocations, null, 2)
)
