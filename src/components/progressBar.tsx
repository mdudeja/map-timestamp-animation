import { Progress } from "./ui/progress"

export default function ProgressbarComponent({
  totalDuration,
  timeSinceStart,
  totalSigs,
  minimumTimestamp,
}: {
  totalDuration: number
  timeSinceStart: number
  totalSigs: number
  minimumTimestamp: number
}) {
  const totalhours = Math.round(timeSinceStart / (1000 * 3600))
  const currentTime = new Date(minimumTimestamp + timeSinceStart).toString()
  return (
    <div className="bg-zinc-200 px-2 py-4">
      <Progress value={(100 * timeSinceStart) / totalDuration} />
      <div className="flex flex-row pt-4">
        <div>
          <p>{`At ${totalhours} Hours since launch`}</p>
          <p>{`${currentTime.split(" ").slice(0, 5).join(" ")}`}</p>
        </div>
        <div className="flex-grow"></div>
        <div>
          <p>{`${totalSigs} signatures`}</p>
          <p>{`${Math.round(totalSigs / totalhours)} signatures per hour`}</p>
        </div>
      </div>
    </div>
  )
}
