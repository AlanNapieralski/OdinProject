import Section from './Section'

function EduInfo() {

    const name = 'Educational Info'
    const fields = [
        {name: 'High School', type: 'text'},
        {name: 'University', type: 'text'},
        {name: 'Other Educational Information', type: 'text'}
    ]

    return <Section name={name} fields={fields} />
}

export default EduInfo