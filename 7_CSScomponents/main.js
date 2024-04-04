import './style.css'


document.querySelector('.slider').oninput = function() {
    if (this.value > 15) {
        document.querySelector('.overSlider').style.width = `${this.value}%`
    }
}

