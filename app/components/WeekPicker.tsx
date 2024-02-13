// WeekSelector.tsx
import React, { useState } from 'react'

interface Props {
  onChangeWeek: (weekStartDate: Date) => void
}

const WeekPicker: React.FC<Props> = ({ onChangeWeek }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  )

  const handleWeekChange = () => {
    const selectedWeekStartDate = new Date(selectedDate)
    selectedWeekStartDate.setDate(
      selectedWeekStartDate.getDate() - selectedWeekStartDate.getDay()
    )

    onChangeWeek(selectedWeekStartDate)
  }

  return (
    <div>
      <label htmlFor="week">Select Week:</label>
      <input
        type="week"
        id="week"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        onBlur={handleWeekChange}
      />
    </div>
  )
}

export default WeekPicker
