import { sql } from '@vercel/postgres'
import { Meal } from './definitions'

export async function fetchMeals() {
  try {
    // TODO: add filter
    const data = await sql<Meal>`
      SELECT
        id,
        name,
        day,
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
