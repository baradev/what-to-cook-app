import { text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const meal = sqliteTable('Meal', {
  date: text('date'), // Add a text field to store the date
  mealName: text('mealName'), // Add mealName field
})
