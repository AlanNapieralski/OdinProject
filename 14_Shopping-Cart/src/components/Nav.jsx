const Nav = () => {

    return (
        <nav className="m-4 flex justify-between">
            <div className="bg-primary p-4 rounded">
                <button className="text-4xl text-light hover:bg-secondary px-8 py-2 rounded">Home</button>
                <button className="text-4xl text-light hover:bg-secondary px-8 py-2 rounded">Shop</button>
            </div>
            <div className="bg-primary p-4 rounded hidden">
                <button className="text-4xl text-light hover:bg-secondary px-8 py-2 rounded">Cart</button>
            </div>
        </nav>
    )
}

export default Nav