import Restart from './Restart.jsx'
import './EndScreen.css'
import { useEffect } from 'react'
import useSound from 'use-sound'
import tetteree from '../soundEffects/tetteree.mp3'
import sad from '../soundEffects/sad.mp3'

export default function EndScreen({ best, score, result, setResult, setScore }) {

    const endTitle = () => result.win ? 'You Won!!!' : 'You lost :o'
    const [playWin, { stop: stopWin }] = useSound(tetteree)
    const [playDefeat, { stop: stopLoss }] = useSound(sad)

    if (result.win)
        playWin()
    if (result.defeat)
        playDefeat()

    function stop() {
        stopWin()
        stopLoss()
    }

    return (
        <div className='flex justify-center items-center absolute w-full h-full end-animate'>
            <div className='flex flex-col justify-center items-center p-12 w-1/2 h-3/4 bg-red-900 border-4 border-white rounded opacity-85'>
                <h1 className='font-sans text-6xl text-white '>{endTitle()}</h1>
                <p className='font-sans text-3xl text-white '>Current score: {score}</p>
                <p className='font-sans text-3xl text-white '>Best score: {best}</p>
                <Restart stop={stop} setResult={setResult} setScore={setScore} />
            </div>
        </div>
    )
}
