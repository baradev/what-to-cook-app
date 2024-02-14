'use client'
// MealInput.tsx
import React from 'react'

interface Props {
  day: string
  isFocused: boolean
  onFocusNext: () => void
  onFocusPrevious: () => void
  addMeal: (day: string, mealName: string) => void
}

const MealInput: React.FC<Props> = ({
  day,
  isFocused,
  onFocusNext,
  onFocusPrevious,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      onFocusNext()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      onFocusPrevious()
    }
  }

  React.useEffect(() => {
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
        onKeyDown={handleKeyDown}
        onFocus={() => inputRef.current?.select()}
      />
    </div>
  )
}

export default MealInput
