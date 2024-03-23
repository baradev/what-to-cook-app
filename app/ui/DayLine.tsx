// DayLine.jsx

import React, { useEffect, useState } from 'react'
import MealInput from './MealInput'
import { HeartButton } from './HeartButton'
import { Meal } from '@/app/lib/definitions'
import { fetchMeals, saveMeal } from '../lib/data'

const DayLine = ({
  day,
  currentDate,
  focusedIndex,
  handleFocusNext,
  handleFocusPrevious,
}) => {
  const [meal, setMeal] = useState<Meal | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData()
  }, [currentDate])

  const handleMealChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMealName = event.target.value
    setMeal((prevMeal) => ({
      ...prevMeal,
      name: newMealName,
    }))
  }

  const handleAddNewMeal = async () => {
    try {
      if (meal && meal.name) {
        const newMeal: Meal = {
          id: '',
          day: currentDate.toISOString().substring(0, 10),
          name: meal.name,
          isFavourite: false,
        }

        const savedMeal = await saveMeal(newMeal)
        setMeal(savedMeal)
      }
    } catch (error) {
      console.error('Error adding new meal:', error)
    }
  }

  const handleHeartClick = async () => {
    try {
      if (meal) {
        const updatedMeal: Meal = {
          ...meal,
          isFavourite: !meal.isFavourite, // Toggle isFavourite status
        }
        await saveMeal(updatedMeal) // Save the updated meal
        setMeal(updatedMeal) // Update the state directly
      }
    } catch (error) {
      console.error('Error updating meal:', error)
    }
  }

  return (
    <div className="flex flex-row ml-10">
      <div className="flex flex-col p-2 border-b w-96">
        <label className="mb-4" htmlFor={`${day}DinnerInput`}>
          {day}: {currentDate.toISOString().substring(0, 10)}
        </label>
        <MealInput
          value={meal ? meal.name : ''}
          day={day}
          isFocused={focusedIndex === 0}
          onFocusNext={handleFocusNext}
          onFocusPrevious={handleFocusPrevious}
          onChange={handleMealChange}
          onSave={handleAddNewMeal}
        />
      </div>
      <div className="p-2 border-b flex align-middle">
        <HeartButton
          onClick={handleHeartClick}
          isFavorite={meal ? meal.isFavourite : false}
          disabled={!meal}
        />
      </div>
    </div>
  )
}

export default DayLine
