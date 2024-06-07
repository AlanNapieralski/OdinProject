import './App.css'
import {useState, useEffect} from 'react'
import Canvas from './componenets/Canvas.jsx'
import EndScreen from './componenets/EndScreen.jsx'

export default App
function App() {

  const [score, setScore] = useState(0)
  const [gameResult, setGameResult] = useState({
    win: false,
    defeat: false
  })

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'> 
      <Canvas score={{score, setScore}} result={gameResult} setResult={setGameResult} />
      { gameResult.win || gameResult.defeat ? <EndScreen result={gameResult} setResult={setGameResult} setScore={setScore} /> : null }
    </div>
  )
}