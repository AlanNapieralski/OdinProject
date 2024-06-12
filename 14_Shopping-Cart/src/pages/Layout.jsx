import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

const Layout = ({Main}) => {

    return (
        <>
            <Nav />
            <Main /> 
            <Footer />
        </>
    )
}

export default Layout