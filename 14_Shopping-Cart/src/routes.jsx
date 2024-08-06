import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Layout from './pages/Layout.jsx'
import Preview from './Preview.jsx'


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
    },
    {
        path: '/preview',
        element: <Preview />
    }

]

export default routes
