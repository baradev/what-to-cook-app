import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

interface Day {
  name: string
}

async function getDays(): Promise<Day[]> {
  const db: Database = await open({
    filename: 'db/database.sqlite',
    driver: sqlite3.Database,
  })

  const result: Day[] = await db.all('SELECT * FROM days')

  return result
}

export default async function Page() {
  const days = await getDays()

  return (
    <div>
      <h1>Items</h1>
      <hr></hr>
      <ul>
        {days &&
          days.map((item: Day, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
      </ul>
    </div>
  )
}
