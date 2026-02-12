import React from 'react'
import './UI.css'

export function UI({ onSelectAnimation, onEnterAR, showEnterAR = true }) {
  const animations = [
    { name: "T-Pose", label: "Reset" },
    { name: "Chicken", label: "Chicken Dance" },
    { name: "Snake", label: "Snake Hip Hop" },
    { name: "Twist", label: "Twist Dance" }
  ]

  return (
    <div className="ui-container">
      {showEnterAR && (
        <button 
          className="enter-ar-button"
          onClick={onEnterAR}
        >
          Enter AR
        </button>
      )}

      <div className="cards-wrapper">
        {animations.map((anim) => (
          <button 
            key={anim.name} 
            className="ui-card"
            onClick={() => onSelectAnimation(anim.name)}
          >
            <span className="card-label">{anim.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
