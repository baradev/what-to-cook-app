import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import Week from './components/Week'

interface Meal {
  id: string
  date: string
  name: string
  isFavourite: boolean
}

async function getMeals(): Promise<Meal[]> {
  const db: Database = await open({
    filename: 'db/database.sqlite',
    driver: sqlite3.Database,
  })

  const meals: Meal[] = await db.all('SELECT * FROM meals')
  console.log(meals)

  return meals
}

export default async function Home() {
  const meals = await getMeals()

  return (
    <div className="flex">
      <div className="flex flex-col border-r p-4">
        <Week />
      </div>
    </div>
  )
}
