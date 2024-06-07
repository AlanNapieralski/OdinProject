export default function Restart({setResult, setScore}) {

    const handleClick = () => {
        setResult({
            win: false,
            defeat: false
        })
        setScore(0)
    }

    return (
        <button onClick={handleClick} type="button" className="my-6 w-20 h-20 bg-red-400 rounded">
            Restart
        </button>
    )
}