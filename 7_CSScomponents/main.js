import './style.css'

const toChangeColor = [document.querySelector('.play'), document.querySelector('.volume')]
document.querySelector('.start').onmousedown = function() { 
    Array.from(document.querySelectorAll('.first')).forEach(element => {
        element.style.display = 'block'
    })
    
    toChangeColor.forEach(element => {
        element.style.backgroundColor = '#D2F1FE'
        element.querySelector('i').style.color = '#162235'
    })
}

document.querySelector('.volume').onmousedown = function() {
    document.querySelector('.sliderContainer').style.display = 'block'
    document.querySelector('.slider').oninput = function() {
        document.querySelector('.overSlider').style.width = `${this.value}%`
    }
    document.querySelector('.controls').style.width = '90vw'

    toChangeColor.forEach(element => {
        element.style.backgroundColor = '#162235'
        element.querySelector('i').style.color = 'white'
    })
}