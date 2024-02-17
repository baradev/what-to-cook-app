import { sql } from '@vercel/postgres'
import { Meal } from './definitions'

export async function fetchMeals() {
  try {
    const data = await sql<Meal>`
      SELECT
        id,
        name,
        date,
        isFavourite
      FROM meals
  
    `

    const meals = data.rows
    return meals
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all meals.')
  }
}
