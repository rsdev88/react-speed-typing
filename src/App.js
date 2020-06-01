import React from 'react'
import useGameLogic from "./hooks/useGameLogic"

function App() {

  const {
    text,
    timeRemaining,
    wordCount,
    typingSpeed,
    numberofPlays,
    hasStarted,
    textAreaRef,
    STARTING_SPEED,
    startGame,
    handleChange} = useGameLogic()

  return (
    <div>
      <h1>Speed Typing Game</h1>
      <h2>Test your typing skills!</h2>

      <textarea
        value={text}
        onChange={handleChange}
        disabled = {!hasStarted}
        ref={textAreaRef}/>

      <h4>Remaining time: {timeRemaining} </h4>
      <button 
        disabled={hasStarted} 
        onClick={startGame}>{numberofPlays > 0 ? "Play again" : "Start"}</button>
      <h1>Word count: {wordCount}</h1>
      <h1>Speed:{typingSpeed === STARTING_SPEED ? STARTING_SPEED : `${typingSpeed} words/minute`} </h1>
    </div>

  )
}

export default App
