// WeekSelector.tsx
import React, { useState } from 'react'

interface Props {
  onChangeWeek: (weekStartDate: Date) => void
}

const WeekSelector: React.FC<Props> = ({ onChangeWeek }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleWeekChange = () => {
    // Calculate the start date of the selected week
    const firstDayOfWeek = new Date(selectedDate)
    firstDayOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())

    onChangeWeek(firstDayOfWeek)
  }

  return (
    <div>
      <label htmlFor="week">Select Week:</label>
      <input
        type="week"
        id="week"
        value={selectedDate.toISOString().substring(0, 7)}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        onBlur={handleWeekChange}
      />
    </div>
  )
}

export default WeekSelector
