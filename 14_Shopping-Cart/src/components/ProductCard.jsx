import { useState } from 'react'

const ProductCard = ({product}) => {

    return (
        <div className="card p-4 flex flex-col justify-center items-center bg-primary border border-yellow-900 rounded-lg drop-shadow-lg group">
            <img src={product.image} alt={product.title} className="w-48 h-48 overflow-hidden border rounded-sm" />
            <h2 className={" w-48 text-xl h-20 text-white font-sans text-center overflow-hidden title-reveal-animate group-hover:h-full group-hover:max-h-full"}></h2>
        </div>
    )
}

export default ProductCard