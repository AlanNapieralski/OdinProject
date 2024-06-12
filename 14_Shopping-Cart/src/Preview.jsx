import { useState, useEffect } from 'react'
import ProductPage from './pages/ProductPage'
import placeholder from './assets/images/placeholder.jpg'

const Preview = () => {

    
    const [product, setProduct] = useState({
        title: 'loading...',
        image: placeholder,
        description: 'loading...'
    })

    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=1")
           .then(res => res.json())
           .then(json => setProduct(json))
    }, [])

    return (
        <div className='h-screen flex justify-center items-center'>
        <ProductPage product={product} /> 
        </div>
    )
}

export default Preview