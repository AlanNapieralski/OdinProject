import Section from './Section'

function GeneralInfo() {

    const name = 'General Information'
    const fields = [
        {name: 'First Name', type: 'text'},
        {name: 'Last Name', type: 'text'}, 
        {name: 'Email', type: 'email'},
        {name: 'Phone Number', type: 'tel'}
    ]

    return <Section name={name} fields={fields} />
}

export default GeneralInfo