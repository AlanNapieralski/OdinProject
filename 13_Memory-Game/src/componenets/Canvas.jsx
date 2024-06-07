import {useState, useEffect} from 'react'

export default function Canvas({score, result, setResult}) {
    const assets = extractAssets() 
    const [clickedMell, setClickedMell] = useState(assets)

    useEffect(() => {
        setClickedMell(assets)
    }, [result.win, result.defeat])
    
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
            score.setScore(prevScore => prevScore + 1)
        }
    }

    function getFeedback() {
        if (result.win) return 'You won!!!'
        if (result.defeat) return 'You lost :o'

        return `Your current score is ${score.score}` 
    }

    return (
        <div className='relative'>
            <h1 className='text-white text-3xl self-center'>{getFeedback()}</h1>
            <div className='w-[calc(5*224px+4*16px)] grid grid-cols-5 grid-rows-3 gap-4 overflow-hidden' >
                {assets.map( gif => (
                    <button type='button' key={gif.id} className="w-56 h-56 hover:opacity-50 > *"> 
                        <img src={gif.url} className='h-full w-full object-cover' onClick={handleClick(gif)} />
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