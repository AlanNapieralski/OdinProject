import './App.css'
import Section from './components/Section.jsx'

function App() {
  const fields = [
    {name: 'First Name', type: 'text'},
    {name: 'Last Name', type: 'text'}, 
    {name: 'Email', type: 'email'},
    {name: 'Phone Number', type: 'tel'}
  ]

  return <Section name='General Information' fields={fields} />
}

export default App
