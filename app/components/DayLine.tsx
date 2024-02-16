'use client'
import React from 'react'
import { HeartButton } from './HeartButton'
import MealInput from './MealInput'

interface DayLineProps {
  day: string
  currentDate: Date
  focusedIndex: number
  index: number
  handleFocusNext: () => void
  handleFocusPrevious: () => void
}

const DayLine: React.FC<DayLineProps> = ({
  day,
  currentDate,
  focusedIndex,
  handleFocusNext,
  handleFocusPrevious,
  index,
}) => {
  return (
    <div className="flex flex-row ml-10">
      <div className="flex flex-col p-2 border-b w-96">
        <label className="mb-4" htmlFor={`${day}DinnerInput`}>
          {day}: {currentDate.toISOString().substring(0, 10)}
        </label>
        <MealInput
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
  )
}

export default DayLine
