import DayLine from './components/DayLine'

export default function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col border-r p-4">
        <DayLine />
      </div>
    </div>
  )
}
