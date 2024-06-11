import { useEffect, useState } from 'react'

const ProductCard = ({product}) => {

    const [height, setHeight] = useState(0)
    const [isHovered, setHovered] = useState(false)

    useEffect(() => {
        const textHeight = document.querySelector('.text-reveal').offsetHeight
        setHeight(textHeight)        
    }, [])


    return (
        <div className="group relative p-4 flex flex-col justify-center items-center bg-primary border rounded-lg drop-shadow-lg" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <img src={product.image} alt={product.title} className="z-10 w-48 h-48 overflow-hidden border rounded-sm" />
            <div style={{transform: isHovered ? `translateY(calc(${height}px - 0.5rem))`: null}} 
                 className={`text-reveal flex justify-center w-full absolute bottom-4 bg-primary p-2 border rounded-lg transition-[transform] duration-300`}>
                <h2 className="max-h-[5.5rem] bottom-0 max-w-48 overflow-hidden text-xl text-white font-sans text-center">{product.title}</h2> 
            </div>
        </div>
    )
}

export default ProductCard