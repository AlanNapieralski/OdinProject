import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'

const Preview = () => {

    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=9")
            .then(res => res.json())
            .then(json => {
                setProduct(json[0])
            })
    }, [])

    return (
        <div className='h-screen flex justify-center items-center'>
            {product && <ProductCard product={product} />}        
        </div>
    )
}

export default Preview