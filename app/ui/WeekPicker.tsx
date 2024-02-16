// WeekPicker.tsx
'use client'
import React from 'react'

interface Props {
  weekStartDate: Date
  onChangeWeek: (weekStartDate: Date) => void
}

const WeekPicker: React.FC<Props> = ({ weekStartDate, onChangeWeek }) => {
  // Format date to YYYY-Www (ISO week date format)
  const formatDateToWeekInput = (date: Date): string => {
    const year = date.getFullYear()
    const weekNumber = getWeekNumber(date)
    return `${year}-W${weekNumber < 10 ? '0' + weekNumber : weekNumber}`
  }

  // Get ISO week number of a date
  const getWeekNumber = (date: Date): number => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7)) // Set to Thursday of the week
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  }

  return (
    <div>
      <label htmlFor="week">Select Week:</label>
      <input
        type="week"
        id="week"
        value={formatDateToWeekInput(weekStartDate)}
        onChange={(e) => {
          // Extract the year and week number from the input value and set the new date
          const [year, week] = e.target.value.split('-W')
          const newDate = new Date(parseInt(year), 0, 1) // January 1st of the year
          const weekOffset = (parseInt(week, 10) - 1) * 7 // Number of days to add to reach the first day of the week
          newDate.setDate(newDate.getDate() + weekOffset + 1) // Adjust to start from Monday
          onChangeWeek(newDate) // Call onChangeWeek with the selected week's start date
        }}
      />
    </div>
  )
}

export default WeekPicker
