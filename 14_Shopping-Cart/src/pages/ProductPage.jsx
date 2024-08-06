const ProductPage = ({product}) => {

    return (
        <div className="w-3/4 h-3/4 bg-secondary flex flex-col border rounded-4xl">
            <div className="flex justify-center">
                <img src={product.image} /> 
                <div>
                    <h1>{product.title}</h1>
                    <div>
                        <p>Quantity</p>
                        <input type="number"></input>
                    </div>
                    <button>Add to Cart</button> 
                </div>
            </div>    
            <hr></hr>
            <div>
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default ProductPage