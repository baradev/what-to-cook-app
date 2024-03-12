// HeartButton.jsx

import React, { useState, useEffect } from 'react'

export const HeartButton = ({ isFavorite, onClick }) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    setClicked(isFavorite)
  }, [isFavorite])

  const handleClick = () => {
    setClicked(!clicked)
    onClick()
  }

  return (
    <div>
      <button
        className={`btn ${clicked ? 'shadow' : ''}`} // Add the shadow class when clicked
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${clicked ? 'text-red-500' : 'text-gray-500'}`}
          fill={clicked ? 'currentColor' : 'none'}
          stroke={clicked ? 'none' : 'currentColor'}
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  )
}
