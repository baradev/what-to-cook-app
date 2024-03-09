'use server'

import { sql, QueryResultRow } from '@vercel/postgres' // Import QueryResultRow
import { Meal } from './definitions'

export async function fetchMeals(currentDate: Date): Promise<Meal[]> {
  try {
    const data = await sql<Meal>`
      SELECT
        id,
        name,
        day,
        isFavourite
      FROM meals
      WHERE day = ${currentDate.toISOString().substring(0, 10)}
    `

    if (data.rows.length === 0) {
      // If no meals are found for the current date, return an empty array
      return []
    }

    const meals: Meal[] = data.rows.map((row: QueryResultRow) => ({
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
    // Check if a meal for the given day already exists in the database
    const existingMeal = await sql<Meal>`
      SELECT *
      FROM meals
      WHERE day = ${meal.day}
    `

    if (existingMeal.rows.length > 0) {
      // If a meal exists for the given day, update the existing row
      const updatedData = await sql<Meal>`
        UPDATE meals
        SET name = ${meal.name}, isFavourite = ${meal.isFavourite}
        WHERE day = ${meal.day}
        RETURNING *
      `
      return updatedData.rows[0]
    } else {
      // If no meal exists for the given day, insert a new row
      const newData = await sql<Meal>`
        INSERT INTO meals (name, day, isFavourite)
        VALUES (${meal.name}, ${meal.day}, ${meal.isFavourite})
        RETURNING *
      `
      return newData.rows[0]
    }
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to save meal.')
  }
}
