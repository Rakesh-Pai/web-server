/**
 * 
 */

const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(__dirname)
console.log(publicDirectoryPath)
console.log(viewsPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
const weather = require('./utils/weather')
const port = process.env.PORT ||8080

//for static pages in public folder
app.use(express.static(publicDirectoryPath))

app.get('/indextemplate', (request, response) => {
	//response.send("Hello Express")
	response.render("indextemplate", {
		title: 'View template ',
		name: 'Handlebar'
	})
})

app.get('/abouthandlebar', (request, response) => {
	response.render('abouthandlebar')
})

app.get('/helphandlebar', (request, response) => {
	response.render("helphandlebar", {helpMessage:"This message is for those on help page.",
		name: "Rakesh"})
})

app.get('/products', (request, response) => {
	console.log(request.query.search)
	if (!request.query.search) {
		return response.send({error: "Enter the products to search."})
	}
	response.send({
		products: []
	})
	
})
/*app.get('/index', (request, response) => {
	response.render({
		Person: {
			name: "Rakesh",
			location: "Bangalore"
		}
	})
})*/
/*app.get('/help', (request, response) => {
	response.send("Help page.")
})

app.get('/about', (request, response) => {
	response.send([{
		firstname: 'Rakesh'
	}, {
		lastname: 'Pai'
	}])
})*/

app.get('/weather', (request, response) => {
	if(!request.query.address) {
		return response.send({
			error: "No address."
		})
	}
	weather(request.query.address, (data) => {
		if (data.temperature) {
			return response.send({
				temperature: data.temperature,
				precipitation: data.precipitation,
				humidity: data.humidity
			})
		} 
		response.send({
			error: data
		})
	})
	/*response.send({
		
		forecast: 'Sunny',
		location: 'Bangalore'
	})*/
})

app.get('/helphandlebar/*', (request, response) => {
	response.render("404errorhandler", {errorMessage:"This help article does not exist.",
		name: "Rakesh"})
})

app.get('*', (request, response) => {
	//response.send("This page does not exist")
	response.render("404errorhandler", {
		errorMessage: "This page does not exist."
	})
})

app.listen(port, () => {
	console.log('Listening on port 8080')
})