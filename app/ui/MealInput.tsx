import React, { useEffect, useRef, useState } from 'react'
import { Meal } from '../lib/definitions'

interface Props {
  day: string
  isFocused: boolean
  onFocusNext: () => void
  onFocusPrevious: () => void
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSave: (meal: Meal) => void // Update prop type to accept Meal
}

const MealInput: React.FC<Props> = ({
  day,
  isFocused,
  onFocusNext,
  onFocusPrevious,
  value,
  onChange,
  onSave, // Updated prop type
}) => {
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
      handleSave()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      onFocusNext()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      onFocusPrevious()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    onChange(event)
  }

  const handleSave = () => {
    onSave(inputValue)
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
        value={inputValue}
        id={`${day}DinnerInput`}
        name={`${day}DinnerInput`}
        placeholder={`Enter ${day}'s Dinner Idea`}
        className="w-full max-w-xs h-8 input-success"
        onKeyDown={handleKeyDown}
        onFocus={() => inputRef.current?.select()}
        onChange={handleChange} // Use the handleChange function
      />
    </div>
  )
}

export default MealInput
