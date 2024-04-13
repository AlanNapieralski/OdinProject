import './style.css'

let validForm = false

// email must be a valid email address and is required
function checkEmail() {
    const email = document.getElementById('email')
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    
    if (email.value.match(emailPattern)) {
       email.style.backgroundColor = '#C7E67F'
       email.dataset.isValid = 'true'
    } else {
       email.style.backgroundColor = '#FF7F7F'
       email.dataset.isValid = 'false'
    }

    
}
document.getElementById('email').addEventListener('input', checkEmail)

function checkCountry() {
    const country = document.getElementById('country')
    
    if (country.value !== '') {
       country.style.backgroundColor = '#C7E67F'
       country.dataset.isValid = 'true'
    } else {
        country.style.backgroundColor = '#FF7F7F'
        country.dataset.isValid = 'false'
    }

}
document.getElementById('country').addEventListener('input', checkCountry)

// post code must be a valid uk postcode
function checkUKPostCode() {
    const postCode = document.getElementById('postcode')
    const postCodePattern = /^[A-Z]{1,2}[0-9]{1,2} [0-9][A-Z]{2}$/
    
    if (postCode.value.match(postCodePattern)) {
       postCode.style.backgroundColor = '#C7E67F'
        postCode.dataset.isValid = 'true'
    } else {
        postCode.style.backgroundColor = '#FF7F7F'
        postCode.dataset.isValid = 'false'
    }

}
document.getElementById('postcode').addEventListener('input', checkUKPostCode)

// password must be at least 8 characters long and is required
function checkPassword(password) {
    if (password.value.length >= 8) {
       password.style.backgroundColor = '#C7E67F'
       password.dataset.isValid = 'true'
    } else {
        password.style.backgroundColor = '#FF7F7F'
        password.dataset.isValid = 'false'
    }

}
const passwordFields = [document.getElementById('psw'), document.getElementById('psw-repeat')]

passwordFields.forEach(element => {
    element.addEventListener('input', () => checkPassword(element))
})

// check for each input field to have isValid dataset set to true if so, submit can be execvuted if not alert
function checkForm() {
    const inputs = document.querySelectorAll('input')
    let formValid = true

    const isValid = Array.from(inputs).every(input => input.dataset.isValid === 'true')

    if (isValid) {
        alert('Please check if the form is correct and try again!')
    } else {
        alert('Form has been submitted!')
    }
}

document.getElementById('signupbtn').addEventListener('click', checkForm)