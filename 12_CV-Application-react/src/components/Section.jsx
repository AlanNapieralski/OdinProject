import { useState } from 'react'

function Section(props) {

    const [values, setValues] = useState(
        props.fields.reduce((acc, field) => {
            acc[field.name] = ''
            return acc
        }, {})
    )

    const [edit, setEdit] = useState(0)

    const handleSubmit = () => {
       setEdit( prevState => 1 - prevState)
    }

    const handleEdit = () => {
       setEdit( prevState => 1 - prevState)
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
            <div key={name} className='flex justify-between items-center m-4 p-1 border-2 border-gray-500 border-opacity-50 rounded'>
                <h2 className='font-bold pr-4'>{name}</h2>
                {edit ? <input className='p-1 w-2/3 border-l-2 truncate' type={type} value={values[name]}
                    onChange={ event => handleChange(name, event.target.value)}></input>
                : <p className='p-1 w-2/3 border-l-2 border-gray-500 pl-4 text-left'>{values[name]}</p>}
            </div>
        )
    })

    return (
        <div className='flex flex-col items-end mb-8'>
            <div className='w-full p-4 border-4 rounded space-y-6 > *'>
                <div className="flex justify-between p-4">
                    <h1 className='text-left'>{props.name}</h1>
                    { edit ? null : <button onClick={handleEdit} className='text-right'>Edit</button>}
                </div> 
                <div>
                    {fieldsList}
                </div>
            </div>
            { edit ? <button onClick={handleSubmit} className='m-4 bg-green-500'>Submit</button> : null }
        </div>
    )
}

export default Section