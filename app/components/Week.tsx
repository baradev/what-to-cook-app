'use client'
import React, { useState } from 'react'
import WeekPicker from './WeekPicker'
import DayLine from './DayLine'

const Week = () => {
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
          <DayLine
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
