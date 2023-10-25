import locations from "../data/locations.json"

export function getAnimationSpeed() {
  const minimumTimestamp = Math.min(
    ...locations.map((l) => (l && l.timestamp) ?? 0)
  )
  const maximumTimestamp = Math.max(
    ...locations.map((l) => (l && l.timestamp) ?? 0)
  )
  const duration = (maximumTimestamp - minimumTimestamp) / 1000
  const defaultToPlayDuration = process.env
    .NEXT_PUBLIC_DEFAULT_ANIMATION_DURATION_IN_SECS
    ? Number(process.env.NEXT_PUBLIC_DEFAULT_ANIMATION_DURATION_IN_SECS)
    : 60

  const speed = duration / defaultToPlayDuration

  return {
    speed: Math.round(speed),
    minimumTimestamp,
    duration,
  }
}
