import DayLine from './components/DayLine'
import { db } from '@/db'
import { meal } from '@/db/schema'

export default async function Home() {
  const data: any = await db.select().from(meal)

  console.log(data)

  const addMealToDatabase = async (mealData: any) => {
    'use server'
    await db.insert(meal).values(mealData)
    console.log('Meal added to database:', mealData)
  }

  return (
    <div className="flex">
      <div className="flex flex-col border-r p-4">
        <DayLine addMealToDatabase={addMealToDatabase} />
      </div>
    </div>
  )
}
