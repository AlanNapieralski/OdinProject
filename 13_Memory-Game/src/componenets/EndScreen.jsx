import {useState, useEffect} from 'react'
import Restart from './Restart.jsx'

export default function EndScreen({result, setResult, setScore}) {
   
    const endTitle = () => result.win ? 'You Won!!!' : 'You lost :o'

    return (
        <div className='flex justify-center items-center absolute w-full h-full'>
            <div className='flex flex-col justify-center items-center p-12 w-1/2 h-3/4 bg-red-200 border-4 border-white rounded opacity-85'> 
                <h1 className='font-sans text-6xl text-white '>{endTitle()}</h1>
                <Restart setResult={setResult} setScore={setScore} />
            </div>
        </div>
    )
}