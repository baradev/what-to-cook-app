import React, { useState } from 'react'
import { HeartButton } from './HeartButton'
import MealInput from './MealInput'

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
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

  const totalInputs = daysOfWeek.length

  const handleFocusNext = () => {
    setFocusedIndex((prevIndex) => (prevIndex + 1) % totalInputs)
  }

  const handleFocusPrevious = () => {
    setFocusedIndex((prevIndex) => (prevIndex - 1 + totalInputs) % totalInputs)
  }

  const renderDayInputs = () => {
    return daysOfWeek.map((day, index) => (
      <div key={day} className="flex flex-row ml-10">
        <div key={day} className="flex flex-col p-2 border-b w-96">
          <label className="mb-4" htmlFor={`${day}DinnerInput`}>
            {day}:
          </label>
          <MealInput
            day={day}
            index={index}
            totalInputs={totalInputs}
            onFocusNext={handleFocusNext}
            onFocusPrevious={handleFocusPrevious}
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
