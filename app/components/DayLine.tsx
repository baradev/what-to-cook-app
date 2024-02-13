// DayLine.tsx
'use client'
import React, { useState } from 'react'
import { HeartButton } from './HeartButton'
import MealInput from './MealInput'
import WeekPicker from './WeekPicker'

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

  // Define onChangeWeek function to pass to WeekPicker
  const handleWeekChange = (weekStartDate: Date) => {
    console.log('Selected Week Start Date:', weekStartDate)
    // Implement your logic here to handle week change
  }

  const handleFocusNext = () => {
    setFocusedIndex((prevIndex) => (prevIndex + 1) % daysOfWeek.length)
  }

  const handleFocusPrevious = () => {
    setFocusedIndex(
      (prevIndex) => (prevIndex - 1 + daysOfWeek.length) % daysOfWeek.length
    )
  }

  return (
    <div>
      {/* Pass onChangeWeek function as a prop to WeekPicker */}
      <WeekPicker onChangeWeek={handleWeekChange} />
      {daysOfWeek.map((day, index) => (
        <div key={day} className="flex flex-row ml-10">
          <div className="flex flex-col p-2 border-b w-96">
            <label className="mb-4" htmlFor={`${day}DinnerInput`}>
              {day}:
            </label>
            <MealInput
              key={day}
              day={day}
              isFocused={focusedIndex === index}
              onFocusNext={handleFocusNext}
              onFocusPrevious={handleFocusPrevious}
            />
          </div>
          <div className="p-2 border-b flex align-middle">
            <HeartButton />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DayLine
