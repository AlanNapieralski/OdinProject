const Shop = () => {

    useEffect(() => {
        const products = fetch("https://fakestoreapi.com/products?limit=9")
    }, [])

    return (
        <>
            <h1>Category: Everything</h1> 
            
        </>
    )
}