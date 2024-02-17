import WeekPicker from './WeekPicker'
import DayLine from './DayLine'
import { Meal } from '@/app/lib/definitions'

interface WeekProps {
  meals: Meal[]
}

const Week: React.FC<WeekProps> = ({ meals }) => {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  // const [focusedIndex, setFocusedIndex] = useState<number>(0)
  // const [weekStartDate, setWeekStartDate] = useState<Date>(() => {
  //   const currentDate = new Date()
  //   const dayOfWeek = currentDate.getDay()
  //   const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  //   return new Date(currentDate.setDate(diff))
  // })

  // const handleWeekChange = (newWeekStartDate: Date) => {
  //   setWeekStartDate(newWeekStartDate)
  // }

  // const handleFocusNext = () => {
  //   setFocusedIndex((prevIndex) => (prevIndex + 1) % daysOfWeek.length)
  // }

  // const handleFocusPrevious = () => {
  //   setFocusedIndex(
  //     (prevIndex) => (prevIndex - 1 + daysOfWeek.length) % daysOfWeek.length
  //   )
  // }

  // const updateMeal = (updatedMeal: Meal) => {
  //   console.log('Updated meal:', updatedMeal)
  //   // Implement logic to update the meal in the state or send it to the server
  // }

  return (
    <div>
      {/* <WeekPicker
        weekStartDate={weekStartDate}
        onChangeWeek={handleWeekChange}
      /> */}
      {meals.map((meal) => {
        return (
          <div key={meal.id}>
            {meal.day} {meal.name}
          </div>
        )
      })}
      {/* {daysOfWeek.map((day, index) => {
        const currentDate = new Date(weekStartDate)
        currentDate.setDate(currentDate.getDate() + index)

        const meal = meals.find(
          (meal: Meal) =>
            meal.day === currentDate.toISOString().substring(0, 10)
        )

        return (
          <DayLine
            meal={meal}
            key={day}
            day={day}
            currentDate={currentDate}
            focusedIndex={focusedIndex}
            handleFocusNext={handleFocusNext}
            handleFocusPrevious={handleFocusPrevious}
            index={index}
            updateMeal={updateMeal}
            addNewMeal={addNewMeal} // Pass the addNewMeal function
          />
        )
      })} */}
    </div>
  )
}

export default Week
