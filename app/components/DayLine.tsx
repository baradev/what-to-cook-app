// DayLine.js

import React from 'react'
import { HeartButton } from './HeartButton'

const DayLine = () => {
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
          <HeartButton />
        </div>
      </div>
    ))
  }

  return <>{renderDayInputs()}</>
}

export default DayLine
