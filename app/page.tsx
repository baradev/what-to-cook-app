import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import Week from './components/Week'
import { Meal } from '../db/schema'

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
        <Week meals={meals} />
      </div>
    </div>
  )
}
