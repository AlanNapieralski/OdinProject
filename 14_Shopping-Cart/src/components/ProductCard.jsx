const ProductCard = ({product}) => {
    return (
        <div className="border-8 border-primary rounded">
            <img src={product.image} alt={product.title} className="w-48 h-48" />
            <h2 className="text-2xl">{product.title}</h2>
        </div>
    )
}

export default ProductCard