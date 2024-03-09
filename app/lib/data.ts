'use server'

import { sql, QueryResultRow } from '@vercel/postgres' // Import QueryResultRow
import { Meal } from './definitions'

export async function fetchMeals(): Promise<Meal[]> {
  // Update return type to Promise<Meal[]>
  try {
    // Fetch meals from the database
    const data = await sql<Meal>`
      SELECT
        id,
        name,
        day,
        isFavourite
      FROM meals
    `

    const meals: Meal[] = data.rows.map((row: QueryResultRow) => ({
      // Map QueryResultRow to Meal
      id: row.id,
      name: row.name,
      day: row.day,
      isFavourite: row.isFavourite,
    }))

    return meals
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all meals.')
  }
}

export async function saveMeal(meal: Meal): Promise<Meal> {
  try {
    // Save the meal to the database
    const data = await sql<Meal>`
      INSERT INTO meals (name, day, isFavourite)
      VALUES (${meal.name}, ${meal.day}, ${meal.isFavourite})
      RETURNING *
    `

    return data.rows[0]
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to save meal.')
  }
}
