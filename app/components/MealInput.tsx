import React, { useRef, useState, useEffect } from 'react'

interface Props {
  day: string
  isFocused: boolean
  onFocusNext: () => void
  onFocusPrevious: () => void
  addMeal: (day: string, mealName: string) => void
  initialMeal: string // Initial meal value fetched from the database
}

const MealInput: React.FC<Props> = ({
  day,
  isFocused,
  onFocusNext,
  onFocusPrevious,
  addMeal,
  initialMeal,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [mealName, setMealName] = useState(initialMeal || '')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveMeal() // Save meal when Enter key is pressed
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      onFocusNext()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      onFocusPrevious()
    }
  }

  const saveMeal = () => {
    const trimmedMealName = mealName.trim()
    if (trimmedMealName) {
      addMeal(day, trimmedMealName)
      // Do not clear input after saving
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealName(event.target.value)
  }

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        id={`${day}DinnerInput`}
        name={`${day}DinnerInput`}
        placeholder={`Enter ${day}'s Dinner Idea`}
        className="w-full max-w-xs h-8 input-success"
        value={mealName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputRef.current?.select()}
      />
    </div>
  )
}

export default MealInput
