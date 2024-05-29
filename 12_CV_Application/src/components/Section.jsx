import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'

function Section(props) {

    const [values, setValues] = useState(
        props.fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {})
    );

    const handleSubmit = () => {

    }

    const fieldsList = props.fields.map( field => {
        const {name, type} = field


        return ( 
            <div key={uuidv4()}>
                <h2>{name}</h2>
                <input type={type} value={value}
                    onChange={ event => setValue(event.target.value)}> 
                </input>
            </div>
        )
    })

    return (
        <>
            <h1>{props.name}</h1>
            <div className="w-200 h-80 border-4 rounded">
              {fieldsList} 
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Section