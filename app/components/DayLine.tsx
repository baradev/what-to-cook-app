'use client'

import React, { useState } from 'react'
import { HeartButton } from './HeartButton'
import MealInput from './MealInput'
import WeekPicker from './WeekPicker'

interface DayLineProps {
  addMealToDatabase: Function
}

const DayLine: React.FC<DayLineProps> = ({ addMealToDatabase }) => {
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
  const [weekStartDate, setWeekStartDate] = useState<Date>(new Date())

  const handleWeekChange = (newWeekStartDate: Date) => {
    setWeekStartDate(newWeekStartDate)
  }

  const handleFocusNext = () => {
    setFocusedIndex((prevIndex) => (prevIndex + 1) % daysOfWeek.length)
  }

  const handleFocusPrevious = () => {
    setFocusedIndex(
      (prevIndex) => (prevIndex - 1 + daysOfWeek.length) % daysOfWeek.length
    )
  }

  const addMeal = (day: string, mealName: string) => {
    const currentDate = new Date(weekStartDate)
    currentDate.setDate(currentDate.getDate() + daysOfWeek.indexOf(day))

    // Create mealData object with id, date, and mealName
    const mealData = {
      id: null, // Let the database assign an id
      date: currentDate.toISOString().substring(0, 10), // Format date as "YYYY-MM-DD"
      mealName: mealName,
    }

    addMealToDatabase(mealData)
  }

  return (
    <div>
      {/* Pass weekStartDate and handleWeekChange as props to WeekPicker */}
      <WeekPicker
        weekStartDate={weekStartDate}
        onChangeWeek={handleWeekChange}
      />
      {daysOfWeek.map((day, index) => {
        // Calculate the date for the current day
        const currentDate = new Date(weekStartDate)
        currentDate.setDate(currentDate.getDate() + index)

        return (
          <div key={day} className="flex flex-row ml-10">
            <div className="flex flex-col p-2 border-b w-96">
              <label className="mb-4" htmlFor={`${day}DinnerInput`}>
                {day}: {currentDate.toISOString().substring(0, 10)}
              </label>
              <MealInput
                key={day}
                day={day}
                isFocused={focusedIndex === index}
                onFocusNext={handleFocusNext}
                onFocusPrevious={handleFocusPrevious}
                addMeal={addMeal} // Ensure this prop is passed correctly
              />
            </div>
            <div className="p-2 border-b flex align-middle">
              <HeartButton />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DayLine
