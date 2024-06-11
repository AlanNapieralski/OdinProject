import { useState, useEffect, useRef } from 'react'
import ProductCard from './ProductCard'
import placeholder from '../assets/images/placeholder.jpg'

const Shop = () => {

    const [products, setProducts] = useState(Array(9).fill({
        title: 'loading...',
        image: placeholder
    }))

    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=9")
           .then(res => res.json())
           .then(json => setProducts(json))
    }, [])

    const ref = useRef(null)
    const [anyHovered, setAnyHovered] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (node) {
            console.log(node)
            node.addEventListener('mouseenter', () => setAnyHovered(true))
            node.addEventListener('mouseleave', () => setAnyHovered(false))
            
            return () => {
                node.removeEventListener('mouseenter', () => setAnyHovered(true))
                node.removeEventListener('mouseleave', () => setAnyHovered(false))
            }
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-sans m-2'>Category: Everything</h1>
            <div className='min-w-[700px] grid grid-cols-3 gap-4'>
                { products.map( (product, index) => (
                        <div ref={ref} key={index}>
                            <ProductCard product={product} anyHovered={anyHovered} />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Shop