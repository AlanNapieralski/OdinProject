import { Link } from "react-router-dom"

const Nav = () => {

    return (
        <nav className="m-4 flex justify-between">
            <div className="bg-primary p-4 rounded">
                <Link to='/' className="text-4xl text-light hover:bg-secondary px-8 py-2 rounded">Home</Link>
                <Link to='/shop' className="text-4xl text-light hover:bg-secondary px-8 py-2 rounded">Shop</Link>
            </div>
            <div className="bg-primary p-4 rounded hidden">
                <Link className="text-4xl text-light hover:bg-secondary px-8 py-2 rounded">Cart</Link>
            </div>
        </nav>
    )
}

export default Nav