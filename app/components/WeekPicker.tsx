// WeekPicker.tsx
import React, { useState } from 'react'

interface Props {
  onChangeWeek: (weekStartDate: Date) => void
}

const WeekPicker: React.FC<Props> = ({ onChangeWeek }) => {
  const getStartOfWeek = (date: Date): Date => {
    const currentDate = new Date(date)
    const dayOfWeek = currentDate.getDay()
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust when Sunday is the first day of the week
    return new Date(currentDate.setDate(diff))
  }

  const [selectedWeekStartDate, setSelectedWeekStartDate] = useState<string>(
    getStartOfWeek(new Date()).toISOString().substring(0, 10)
  )

  const handleWeekChange = () => {
    onChangeWeek(new Date(selectedWeekStartDate))
  }

  return (
    <div>
      <label htmlFor="week">Select Week:</label>
      <input
        type="week"
        id="week"
        value={selectedWeekStartDate}
        onChange={(e) => setSelectedWeekStartDate(e.target.value)}
        onBlur={handleWeekChange}
      />
    </div>
  )
}

export default WeekPicker
