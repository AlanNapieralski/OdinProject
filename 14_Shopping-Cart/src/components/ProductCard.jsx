import { useEffect, useState, useRef } from 'react'

const ProductCard = ({ product, anyHovered }) => {

    const textRef = useRef(null)
    const height = useRef(0)
    const [isHovered, setHovered] = useState(false)

    useEffect(() => {
        if (textRef.current)
            height.current = textRef.current.offsetHeight
    }, [])

    return (
        <button className={`group border-none relative p-4 flex flex-col justify-center items-center bg-primary rounded-lg drop-shadow-lg transition-opacity duration-300 ${!isHovered && anyHovered ? 'opacity-60 ' : 'z-50'}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <img src={product.image} alt={product.title} className="z-10 w-48 h-48 overflow-hidden border rounded-sm" />
            <div style={{ transform: isHovered ? `translateY(calc(${height.current}px + 0.5rem))` : null }}
                className={`flex justify-center w-full absolute bottom-4 bg-primary p-2 border rounded-lg transition-[transform] duration-300`}>
                <h2 ref={textRef} className="text-reveal max-h-[5.5rem] max-w-48 overflow-hidden text-xl text-white font-sans text-center">{product.title}</h2>
            </div>
        </button>
    )
}

export default ProductCard
