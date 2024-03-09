import { fetchMeals } from '@/app/lib/data'
import Week from '@/app/ui/Week'

export default async function Page() {
  const currentDate = new Date() // Get current date
  const meals = await fetchMeals(currentDate) // Pass current date to fetchMeals

  return (
    <div className="flex">
      <div className="flex flex-col border-r p-4">
        <Week meals={meals} />
      </div>
    </div>
  )
}
