import React from 'react'

interface Props {
  day: string
}

const MealInput: React.FC<Props> = ({ day }) => {
  return (
    <div>
      <input
        type="text"
        id={`${day}DinnerInput`}
        name={`${day}DinnerInput`}
        placeholder={`Enter ${day}'s Dinner Idea`}
        className=" input-accent w-full max-w-xs h-8"
      />
    </div>
  )
}

export default MealInput
