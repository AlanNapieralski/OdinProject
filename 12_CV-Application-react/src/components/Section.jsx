import { useState } from 'react'

function Section(props) {

    const [values, setValues] = useState(
        props.fields.reduce((acc, field) => {
            acc[field.name] = ''
            return acc
        }, {})
    )

    const handleSubmit = () => {

    }

    const handleChange = (name, value) => {
       setValues( prevValues => ({
        ...prevValues,
        [name]: value,
       })) 
    }

    const fieldsList = props.fields.map( field => {
        const {name, type} = field

        return ( 
            <div key={name}>
                <h2>{name}</h2>
                <input type={type} value={values[name]}
                    onChange={ event => handleChange(name, event.target.value)}>
                </input>
            </div>
        )
    })

    return (
        <div className='w-1200px p-4 border-4 rounded space-y-6 > *'>
            <h1>{props.name}</h1>
            <div className='space-y-2 > *'>
              {fieldsList}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Section