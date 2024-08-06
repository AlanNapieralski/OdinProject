export default function Restart({stop, setResult, setScore}) {

    const handleClick = () => {
        setResult({
            win: false,
            defeat: false
        })
        setScore(0)
        stop()
    }

    return (
        <button onClick={handleClick} type="button" className="my-6 w-20 h-20 bg-red-400 rounded font-sans text-white font-bold">
            Restart
        </button>
    )
}