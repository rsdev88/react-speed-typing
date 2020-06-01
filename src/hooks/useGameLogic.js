import {useState, useEffect, useRef} from "react"

function useGameLogic(){

    const STARTING_TIME = 10;
    const STARTING_SPEED = "???"
    const STARTING_WORD_COUNT = "???"
  
    const [text, setText] = useState("Click start and then type as many words as you can into this box.")
    const [wordCount, setWordCount] = useState(STARTING_WORD_COUNT)
    const [hasStarted, setHasStarted] = useState(false)
    const [numberofPlays, setNumberOfPlays] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(STARTING_SPEED)
      
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const textAreaRef = useRef(null)

    useEffect(() => {

        if(timeRemaining > 0 && hasStarted){
          setTimeout(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1)
          }, 1000)
        }
        else if(timeRemaining === 0){
          endGame()
        }
    
        // The reason I set focus to the text area here and not in startGame() is because in the latter,
        // setHasStarted(true) runs asynchronously, so it tries to set focus to the box before it's enabled.
        // By placing the code here in useEffect, it ensures it's ran when hasStarted is changed.
        if(hasStarted){
          textAreaRef.current.focus()
        }
        
    }, [timeRemaining, hasStarted])
    
    function startGame(){
    setText("")
    setTypingSpeed(STARTING_SPEED)
    setWordCount(STARTING_WORD_COUNT)
    setTimeRemaining(STARTING_TIME)
    setHasStarted(true)
    }

    function endGame(){
    const wordCount = calculateWordCount(text)
    const typingSpeed = calculateTypingSpeed(wordCount)
    
    setWordCount(wordCount)
    setTypingSpeed(typingSpeed)
    setNumberOfPlays(prevCount => prevCount + 1)
    setHasStarted(false)
    }

    function calculateWordCount(text){
        // Trim any whitespace from the start and end of the text.
        // Filter out any empty array elements that might be mistaken for words.
        const words = text.trim().split(' ').filter((value) => value !== "")
        return words.length
    }
    
    function calculateTypingSpeed(wordCount){
    const factor = STARTING_TIME / 60
    return (wordCount / factor)
    }

    function handleChange(event){
        setText(event.target.value)
    }

    return {text, timeRemaining, wordCount, typingSpeed, numberofPlays, hasStarted, textAreaRef, STARTING_SPEED, startGame, endGame, handleChange}
}

export default useGameLogic