import React, { useEffect, useState } from 'react'
import MealInput from './MealInput'
import { HeartButton } from './HeartButton'
import { Meal } from '@/app/lib/definitions'
import { saveMeal, fetchMeals } from '../lib/data'

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
}) => {
  const [meal, setMeal] = useState<Meal | undefined>(undefined)

  useEffect(() => {
    const fetchMealFromDatabase = async () => {
      try {
        const meals = await fetchMeals(currentDate)
        const mealForDay = meals.find(
          (m) => m.day === currentDate.toISOString().substring(0, 10)
        )
        setMeal(mealForDay)
      } catch (error) {
        console.error('Error fetching meal:', error)
      }
    }

    fetchMealFromDatabase()
  }, [currentDate])

  const handleMealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Assuming the MealInput component handles changes
  }

  const handleAddNewMeal = async () => {
    // Assuming the MealInput component handles adding new meals
  }

  return (
    <div className="flex flex-row ml-10">
      <div className="flex flex-col p-2 border-b w-96">
        <label className="mb-4" htmlFor={`${day}DinnerInput`}>
          {day}: {currentDate.toISOString().substring(0, 10)}
        </label>
        <MealInput
          value={meal?.name || ''}
          day={day}
          isFocused={focusedIndex === 0} // Assuming 0 is the index of the focused element
          onFocusNext={handleFocusNext}
          onFocusPrevious={handleFocusPrevious}
          onChange={handleMealChange}
          onSave={handleAddNewMeal}
        />
      </div>
      <div className="p-2 border-b flex align-middle">
        <HeartButton />
        <button onClick={handleAddNewMeal}>Add Meal</button>
      </div>
    </div>
  )
}

export default DayLine
