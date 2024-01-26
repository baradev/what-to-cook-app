// Import React and any other necessary modules

export default function Home() {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const renderDayInputs = () => {
    return daysOfWeek.map((day) => (
      <div key={day} className="flex flex-row ml-10">
        <div key={day} className="flex flex-col p-2 border-b w-96">
          <label className="mb-4" htmlFor={`${day}DinnerInput`}>
            {day}:
          </label>
          <input
            type="text"
            id={`${day}DinnerInput`}
            name={`${day}DinnerInput`}
            placeholder={`Enter ${day}'s Dinner Idea`}
            className="w-full"
          />
        </div>
        <div className="p-2 border-b flex align-middle">
          <input className="h-5 w-5" type="checkbox" />
        </div>
      </div>
    ))
  }

  return (
    <div className="flex ">
      {/* Dinner Column with Day Names Above Inputs */}
      <div className="flex flex-col border-r p-4">{renderDayInputs()}</div>
    </div>
  )
}
