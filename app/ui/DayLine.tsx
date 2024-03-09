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
  meal?: Meal
  handleFocusNext: () => void
  handleFocusPrevious: () => void
  updateMeal: (meal: Meal) => void
  addNewMeal: (newMeal: Meal) => void
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
  addNewMeal,
}) => {
  const [mealName, setMealName] = useState(meal?.name || '')

  useEffect(() => {
    const fetchMealFromDatabase = async () => {
      try {
        const meals = await fetchMeals(currentDate) // Pass currentDate to fetchMeals
        const mealForDay = meals.find((m) => m.day === day)
        if (mealForDay) {
          setMealName(mealForDay.name)
        }
      } catch (error) {
        console.error('Error fetching meal:', error)
      }
    }

    fetchMealFromDatabase()
  }, [day, currentDate])

  const handleMealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setMealName(newName)
    if (meal) {
      updateMeal({ ...meal, name: newName })
    }
  }

  const handleAddNewMeal = async () => {
    if (mealName.trim() !== '') {
      const newMeal: Meal = {
        id: '',
        day: currentDate.toISOString().substring(0, 10),
        name: mealName,
        isFavourite: false,
      }
      try {
        const savedMeal = await saveMeal(newMeal)
        addNewMeal(savedMeal)
      } catch (error) {
        console.error('Error saving meal:', error)
      }
    }
  }

  const formattedDay = currentDate.toISOString().substring(0, 10)

  return (
    <div className="flex flex-row ml-10">
      <div className="flex flex-col p-2 border-b w-96">
        <label className="mb-4" htmlFor={`${day}DinnerInput`}>
          {day}: {formattedDay}
        </label>
        <MealInput
          value={mealName}
          day={day}
          isFocused={focusedIndex === index}
          onFocusNext={handleFocusNext}
          onFocusPrevious={handleFocusPrevious}
          onChange={handleMealChange}
          onSave={addNewMeal}
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
