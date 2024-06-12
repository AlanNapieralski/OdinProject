import React, { useState, useEffect, useRef } from 'react'
import ProductCard from '../components/ProductCard'
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

    const [anyHovered, setAnyHovered] = useState(false)
    const refs = useRef(Array.from({ length: 9}, () => React.createRef()))
   
    const mouseOverEvent = () => setAnyHovered(true)
    const mouseLeaveEvent = () => setAnyHovered(false)

    useEffect(() => {
        refs.current.forEach(ref => {
            if (ref.current) {
                ref.current.addEventListener('mouseover', mouseOverEvent)
                ref.current.addEventListener('mouseleave', mouseLeaveEvent)
            }
        })

        return () => {
            refs.current.forEach(ref => {
                if (ref.current) {
                    ref.current.removeEventListener('mouseover', mouseOverEvent)
                    ref.current.removeEventListener('mouseleave', mouseLeaveEvent)
                }
            })
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-sans m-2'>Category: Everything</h1>
            <div className='min-w-[700px] grid grid-cols-3 gap-4'>
                { products.map( (product, index) => (
                        <div ref={refs.current[index]} key={index}>
                            <ProductCard product={product} anyHovered={anyHovered} />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Shop