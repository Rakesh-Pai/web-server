/**
 * 
 */

const request= require('request')

const geocode = (location, callback) => {
	const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicmFrZXNod2lsbGJlIiwiYSI6ImNrOWtvdTJwODAwYjUza3F1ZGk0YjljZGoifQ.dMGmy3-inl1_W-nt_5hirg&limit=1'
	request({url: geocodeURL, json: true}, (error, response) => {
		if (error) {
			callback('Location service down.')
		} else if (error && error.body.message) {
			callback('Location not found')
		} else {
			
			callback({place: response.body.features[0].place_name,
				longitude: response.body.features[0].center[0],
				latitude: response.body.features[0].center[1]})
		}
	})
}

/*geocode('Bangalore', (data) => {
	console.log(data)
})*/

module.exports = {
	geocode: geocode
}