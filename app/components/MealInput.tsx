'use client'

import React from 'react'

interface Props {
  day: string
}

const MealInput: React.FC<Props> = ({ day }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    }
  }
  return (
    <div>
      <input
        type="text"
        id={`${day}DinnerInput`}
        name={`${day}DinnerInput`}
        placeholder={`Enter ${day}'s Dinner Idea`}
        className=" input-accent w-full max-w-xs h-8"
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default MealInput
