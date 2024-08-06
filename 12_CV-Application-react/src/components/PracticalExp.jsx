import Section from './Section'

function PracticalExp() {

    const name = 'Practical Experience'
    const fields = [
        {name: 'Soft skills', type: 'text'},
        {name: 'Relevant Experience', type: 'text'},
        {name: 'Other', type: 'text'}
    ]

    return <Section name={name} fields={fields} />
}

export default PracticalExp