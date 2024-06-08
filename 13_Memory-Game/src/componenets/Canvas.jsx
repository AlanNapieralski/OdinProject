import {useState, useEffect} from 'react'
import Skeleton from '@mui/material/Skeleton'
import useSound from 'use-sound'
import './Canvas.css'
import amamam from '../soundEffects/amamam.mp3'

export default function Canvas({score, best, result, setResult}) {
    const assets = extractAssets() 
    const [clickedMell, setClickedMell] = useState(assets)
    const [allLoaded, setLoaded] = useState(Array(15).fill(false))
    const [ready, setReady] = useState(false)
    const [playSound] = useSound(amamam)

    useEffect(() => {
        setClickedMell(assets)
    }, [result.win, result.defeat])
  
    useEffect(() => {
        if(allLoaded.every(value => value === true)) {
            setReady(true)
        }
    }, [allLoaded])

    useEffect(() => {
                if (best.best < score.score)
                    best.setBest(score.score)
            }, [score])

    function handleClick(gif) {
        return () => {
            const foundGif = clickedMell.find( mell => mell.id === gif.id)

            if (checkWin(clickedMell)) {
                setResult({
                    win: true,
                    defeat: false
                }) 
                return
            }
            if (foundGif.picked) {
                setResult({
                    win: false,
                    defeat: true
                })
                return
            }

            setClickedMell( prevMells => (
               prevMells.map(current => 
                    current.id === gif.id ? { ...current, picked: true } : current 
               ) 
            )) 
          
            score.setScore(prev => prev + 1)

            

            if (gif.id === 4) playSound()
        }
    }

    const handleImageLoad = (id) => () => {
        setLoaded(prev => {
            const newArr = [...prev]
            newArr[id - 1] = true
            return newArr
        }) 
    }

    const [isAnimating, setAnimating] = useState(false)

    const handleAnimation = () => {
        setAnimating(true)
        setTimeout(() => setAnimating(false), 500)
    }

    useEffect(() => {
        handleAnimation()
    }, [score])

    return (
        <div className='relative'>
            <h1 className='text-white text-3xl self-center'>{`Your current score is ${score.score}`}</h1>
            <div className='w-[calc(5*224px+4*16px)] grid grid-cols-5 grid-rows-3 gap-4 overflow-hidden' >
                {assets.map( gif => (
                    <button type='button' key={gif.id} onClick={handleClick(gif)} className={`w-56 h-56 hover:opacity-50 > * ${ready ? '' : 'pointer-events-none'}`}> 
                        <img src={gif.url} onLoad={handleImageLoad(gif.id)} className={`h-full w-full object-cover ${allLoaded[gif.id-1] ? 'block' : 'hidden'} ${isAnimating ? 'animate' : '' }`} /> 
                        {!allLoaded[gif.id-1] ? <Skeleton variant='circular' width={224} height={224} /> : null}
                    </button>
                ))}
            </div>
        </div>
    )
}

function extractAssets() {
    const rawGifs = import.meta.glob('/src/assets/*.gif', {
        eager: true,
    })

    const gifs = Object.keys(rawGifs).map((key, index) => ({
        id: index + 1,
        name: key.replace('../assets/', '').replace(/\.\w+$/, ''),
        url: key,
        picked: false,
    }))

    for (let i = gifs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[gifs[i], gifs[j]] = [gifs[j], gifs[i]]
    }

    return gifs
}

function checkWin(clickedMell) {
    return clickedMell.every( gif => gif.picked)
}