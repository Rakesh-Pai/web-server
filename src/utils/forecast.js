/**
 * 
 */
const geocode = require('./geocode')
const weather  = require('./weather')
const forecast = (latitude, longitude, callback) => {
	const location = latitude + ',' + longitude
	console.log(location)
	geocode.geocode(location, (data) => {
		if (data.place) {
			weather(data.place, (data) => {
				callback(undefined, data)
			})
		} else {
			callback(data, undefined)
		}
	})
}

module.exports = {
		forecast: forecast
}