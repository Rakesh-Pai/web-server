/**
 * 
 */

console.log("Client side javascrit file is loaded.")
fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data)
	})
})
const address = 'boston'
	
const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener(('submit'), (e) => {
	e.preventDefault()
	const inputValue = input.value
	console.log(inputValue)
	message1.textConten = 'Loading...'
	message2.textContent = ''
	fetch('http://api.weatherstack.com/current?access_key=62ad9c85c8f095b3c38bf2f95e86433f&query=' + inputValue)
	.then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error.info)
				message1.textContent = data.error.info
			} else {
				console.log(data.request.query)
				console.log('temperature ' + data.current.temperature)
				console.log('precipitation ' + data.current.precip)
				console.log('humidity ' + data.current.humidity)
				message2.textContent = data.current.temperature + ' ' + data.current.precip + ' ' + data.current.humidity
				+ ' ' + data.current.wind_speed
				mesage1.textContent = ""
			}
		})
	})
	
})