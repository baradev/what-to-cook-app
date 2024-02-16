'use client'

import React, { useState } from 'react'
import WeekPicker from './WeekPicker'
import DayLine from './DayLine'
import { Meal } from '../../db/schema'

interface WeekProps {
  meals: Meal[]
}

const Week: React.FC<WeekProps> = ({ meals }) => {
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
  const [weekStartDate, setWeekStartDate] = useState<Date>(() => {
    const currentDate = new Date()
    const dayOfWeek = currentDate.getDay()
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(currentDate.setDate(diff))
  })

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

  return (
    <div>
      {/* Pass weekStartDate and handleWeekChange as props to WeekPicker */}
      <WeekPicker
        weekStartDate={weekStartDate}
        onChangeWeek={handleWeekChange}
      />
      {/* meals */}
      {meals.map((meal) => {
        return (
          <div key={meal.id}>
            {meal.day} {meal.name}
          </div>
        )
      })}
      {daysOfWeek.map((day, index) => {
        // Calculate the date for the current day
        const currentDate = new Date(weekStartDate)
        currentDate.setDate(currentDate.getDate() + index)

        // get meal based on the current date
        const meal = meals.find(
          (meal: Meal) =>
            meal.day === currentDate.toISOString().substring(0, 10)
        )

        return (
          <DayLine
            meal={meal}
            key={day}
            day={day}
            currentDate={currentDate}
            focusedIndex={focusedIndex}
            handleFocusNext={handleFocusNext}
            handleFocusPrevious={handleFocusPrevious}
            index={index}
          />
        )
      })}
    </div>
  )
}

export default Week
