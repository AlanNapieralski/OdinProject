import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Greeting from './Greeting.jsx'
import Animal from './Animal.jsx'
import Count from './Count.jsx'
import Person from './Person.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Person />
    {/* <Count /> */}
    {/* <Greeting />  */}
    {/* <Animal /> */}
  </React.StrictMode>,
)
