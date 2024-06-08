import './App.css'
import {useState, useEffect} from 'react'
import Canvas from './componenets/Canvas.jsx'
import EndScreen from './componenets/EndScreen.jsx'
import StartScreen from './componenets/StartScreen.jsx'

export default function App() {

  const [start, setStart] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [gameResult, setGameResult] = useState({
    win: false,
    defeat: false
  })

  useEffect(() => {
    const handleKeyPress = () => {
      setStart(true)
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('mousedown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('mousedown', handleKeyPress)
    }
  }, [])

  if (!start)
    return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <StartScreen startGame={setStart}/>
    </div> 
    ) 

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'> 
      <Canvas score={{score, setScore}} best={{best, setBest}} result={gameResult} setResult={setGameResult} />
      { gameResult.win || gameResult.defeat ? <EndScreen best={best} score={score} result={gameResult} setResult={setGameResult} setScore={setScore} /> : null }
    </div>
  )
}