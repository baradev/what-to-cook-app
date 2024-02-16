// Home.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Week from './ui/components/Week'

async function getMeals(): Promise<Meal[]> {
  'use server'
  const db: Database = await open({
    filename: 'db/database.sqlite',
    driver: sqlite3.Database,
  })

  try {
    const meals: Meal[] = await db.all('SELECT * FROM meals')
    return meals
  } catch (error) {
    console.error('Error fetching meals:', error)
    return []
  }
}

async function addMealToDB(meal: Meal): Promise<void> {
  const db: Database = await open({
    filename: 'db/database.sqlite',
    driver: sqlite3.Database,
  })

  try {
    await db.run(
      'INSERT INTO meals (name, day, isFavourite) VALUES (?, ?, ?)',
      [meal.name, meal.day, meal.isFavourite ? 1 : 0]
    )
    console.log('Meal added successfully')
  } catch (error) {
    console.error('Error adding meal:', error)
  }
}

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([])

  const handleAddMeal = async (newMeal: Meal) => {
    await addMealToDB(newMeal)
    // Refresh meals data after adding a new meal
    const updatedMeals = await getMeals()
    setMeals(updatedMeals)
  }

  // Fetch meals on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      const fetchedMeals = await getMeals()
      setMeals(fetchedMeals)
    }
    fetchMeals()
  }, [])

  return (
    <div className="flex">
      <div className="flex flex-col border-r p-4">
        <Week meals={meals} addNewMeal={handleAddMeal} />
        <MealForm onAddMeal={handleAddMeal} />
      </div>
    </div>
  )
}

interface MealFormProps {
  onAddMeal: (meal: Meal) => void
}

const MealForm: React.FC<MealFormProps> = ({ onAddMeal }) => {
  const [newMeal, setNewMeal] = useState<Meal>({
    name: '',
    day: '',
    isFavourite: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMeal({
      ...newMeal,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddMeal(newMeal)
    // Clear input fields after submission
    setNewMeal({ name: '', day: '', isFavourite: false })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={newMeal.name}
        onChange={handleChange}
        placeholder="Meal name"
      />
      <input
        type="text"
        name="day"
        value={newMeal.day}
        onChange={handleChange}
        placeholder="Day"
      />
      <input
        type="checkbox"
        name="isFavourite"
        checked={newMeal.isFavourite}
        onChange={handleChange}
      />
      <button type="submit">Add Meal</button>
    </form>
  )
}
