'use client'

import React from 'react'

interface Props {
  day: string
  index: number
  totalInputs: number
  onFocusNext: () => void
  onFocusPrevious: () => void
  isFocused: boolean // Add isFocused prop to Props interface
}

const MealInput: React.FC<Props> = ({
  day,
  index,
  totalInputs,
  onFocusNext,
  onFocusPrevious,
  isFocused,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    } else if (event.key === 'ArrowDown') {
      onFocusNext()
    } else if (event.key === 'ArrowUp') {
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
        className="w-full max-w-xs h-8 input-success "
        onKeyDown={handleKeyDown}
        onFocus={() => inputRef.current?.select()}
      />
    </div>
  )
}

export default MealInput
