const { db } = require('@vercel/postgres')
const { meals } = require('../app/lib/placeholder-data.js')
const bcrypt = require('bcrypt')

async function seedMeals(client) {
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    // Create the "meals" table if it doesn't exist
    const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS meals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        day VARCHAR(255) NOT NULL,
        isFavourite BOOLEAN
      );
    `)

    console.log(`Created "meals" table`)

    // Insert data into the "meals" table
    const insertedMeals = await Promise.all(
      meals.map((meal) =>
        client.query(
          `
          INSERT INTO meals (name, day, isFavourite)
          VALUES ($1, $2, $3)
          ON CONFLICT (id) DO NOTHING;
        `,
          [meal.name, meal.day, meal.isFavourite]
        )
      )
    )

    console.log(`Seeded ${insertedMeals.length} meals`)

    return {
      createTable,
      meals: insertedMeals,
    }
  } catch (error) {
    console.error('Error seeding meals:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedMeals(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
