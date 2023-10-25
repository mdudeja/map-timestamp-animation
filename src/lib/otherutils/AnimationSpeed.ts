import locations from "../data/locations.json"

export function getAnimationSpeed() {
  const mints = Math.min(...locations.map((l) => (l && l.timestamp) ?? 0))
  const maxts = Math.max(...locations.map((l) => (l && l.timestamp) ?? 0))
  const duration = maxts - mints
  const defaultToPlayDuration = process.env
    .NEXT_PUBLIC_DEFAULT_ANIMATION_DURATION_IN_SECS
    ? Number(process.env.NEXT_PUBLIC_DEFAULT_ANIMATION_DURATION_IN_SECS)
    : 60

  const speed = duration / (defaultToPlayDuration * 1000)

  return {
    speed: Math.round(speed),
    mints,
    duration,
  }
}
