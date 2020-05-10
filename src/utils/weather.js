/**
 * 
 */
const request = require('request')
const weather = (address, callback) => {
	const geocodeURL = 'http://api.weatherstack.com/current?access_key=62ad9c85c8f095b3c38bf2f95e86433f&query=' + encodeURIComponent(address)
	request({url: geocodeURL, json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to weather app.')
		} else if (error && error.body.error) {
			callback('Address entered is wrong. Please enter another address.')
		} else {
			callback({ temperature: response.body.current.temperature,
				precipitation: response.body.current.precip,
				humidity: response.body.current.humidity})
			}
	})
}

/*geocode('bangalore', (data) => {
	console.log(data)
})*/

module.exports = weather