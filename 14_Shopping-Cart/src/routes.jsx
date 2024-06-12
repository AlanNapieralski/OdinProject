import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Layout from './pages/Layout.jsx'

const routes = [
    {
        path: '/',
        element: <Layout Main={Home} /> 
    },
    {
        path: '/shop',
        element: <Layout Main={Shop} /> 
    },
    {
        path: '/shop/:product',
        element: <></>
    },
    {
        path: '/cart',
        element: <></> 
    },
    {
        path: '/payment',
        element: <></>
    }

]

export default routes