import './style.css'

const weatherData = async (cityName) =>{
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=024c83f3b8aa4796972160109241304&q=${cityName}`,  {mode: 'cors'})
  const data = await response.json()
  return {
    icon: data.current.condition.icon,
    temp: data.current.temp_c,
  }
}

async function renderWeather(cityName) {
  const data = await weatherData(cityName)
  const { icon, temp } = data

  const HTMLicon = document.querySelector('img')
  HTMLicon.src = icon

  const HTMLtemp = document.querySelector('.value')
  HTMLtemp.innerHTML = `${temp}°C`
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault() // Prevent the form from refreshing the page
  renderWeather(e.target.elements[0].value) // Assuming the input is the first element in the form
})