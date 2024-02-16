// DayLine.tsx
import React, { useState } from 'react'
import MealInput from './MealInput'
import { HeartButton } from './HeartButton'
import { Meal } from '@/db/schema'

interface DayLineProps {
  day: string
  currentDate: Date
  focusedIndex: number
  index: number
  meal?: Meal
  handleFocusNext: () => void
  handleFocusPrevious: () => void
  updateMeal: (meal: Meal) => void
  addNewMeal: (newMeal: Meal) => void // Add this prop for adding new meals
}

const DayLine: React.FC<DayLineProps> = ({
  day,
  currentDate,
  focusedIndex,
  handleFocusNext,
  handleFocusPrevious,
  index,
  meal,
  updateMeal,
  addNewMeal, // Receive the addNewMeal prop
}) => {
  const [mealName, setMealName] = useState(meal?.name || '')

  const handleMealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setMealName(newName)
    if (meal) {
      updateMeal({ ...meal, name: newName })
    }
  }

  const handleAddNewMeal = () => {
    if (mealName.trim() !== '') {
      const newMeal: Meal = {
        id: '', // You may need to generate a unique id here
        day: day,
        name: mealName,
        isFavourite: false,
      }
      addNewMeal(newMeal)
      setMealName('')
    }
  }

  return (
    <div className="flex flex-row ml-10">
      <div className="flex flex-col p-2 border-b w-96">
        <label className="mb-4" htmlFor={`${day}DinnerInput`}>
          {day}: {currentDate.toISOString().substring(0, 10)}
        </label>
        <MealInput
          value={mealName}
          day={day}
          isFocused={focusedIndex === index}
          onFocusNext={handleFocusNext}
          onFocusPrevious={handleFocusPrevious}
          onChange={handleMealChange}
        />
      </div>
      <div className="p-2 border-b flex align-middle">
        <HeartButton />
        <button onClick={handleAddNewMeal}>Add Meal</button>{' '}
        {/* Button to add new meal */}
      </div>
    </div>
  )
}

export default DayLine
