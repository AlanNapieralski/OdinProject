export default function StartScreen() {

    return (
        <div className="flex flex-col justify-center items-center w-3/4 h-80 p-4 bg-red-800 border-px rounded leading-normal text-2xl text-white font-sans">
            <h1 className="text-4xl font-bold">Welcome to Mellstroy Memory Game</h1>
            <p>The goal of this game is to click as many Mellstroy memes as you can without repeating yourself.</p>
            <p>The order of memes will change with each click. The maximum score you can get is 15 (You win the game)</p>
            <p className="text-3xl font-bold mt-auto mb-8">Press any button to start</p>
        </div>
    )
}