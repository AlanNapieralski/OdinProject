import React, { useState } from 'react';

function Count() { 
    const [count, setCount] = useState(0)

    const increaseCount = () => {
        setCount(count+1)
    }

    return (
        <>
            <h1 key={count}>Count: {count}</h1>
            <button onClick={increaseCount}>Increase the Count</button>
        </>
    )
}

export default Count