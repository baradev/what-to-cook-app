import { fetchMeals } from '@/app/lib/data'
import Week from '@/app/ui/Week'

export default async function Page() {
  const meals = await fetchMeals()

  return (
    <div className="flex">
      <div className="flex flex-col border-r p-4">
        <Week meals={meals} />
      </div>
    </div>
  )
}
