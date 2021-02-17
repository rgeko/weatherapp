//CORE MODULES
const path = require('path')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//NPM MODULES
const express = require('express')

//CREATE A NEW EXPRESS APPLICATION
const app = express()

//=====================================STATIC FOLDERS
//DEFINE PATH TO PUBLIC FOLDER FOR STATIC PAGES
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
//END==================================STATIC FOLDERS


//=====================================TEMPLATE ENGINE SETUP
const viewsPath = path.join(__dirname, '../views')
app.set('views', viewsPath)
app.set('view engine', 'pug')
//END==================================TEMPLATE ENGINE SETUP



//req OBJECT CONTAINS INFORMATION REGARDING THE REQUEST TO THE SERVER
//res OBJECT CONTAINS VARIOUS METHODS WHICH WE CAN USE TO CUSTOMIZE WHAT WE SEND BACK TO THE REQUESTER

app.get('/', (req, res) => {
    res.render('index', {
        title: 'index',
        name: 'Weather App',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Weather App - Help Section',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Weather App - About Section',
    })
})
//WEATHER ROUTER
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({       //STOPS THE APP
            error: "Insert a location!"
        })
    }
    geocode((req.query.location), (error, coordinates) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(coordinates.latitude, coordinates.longitude, (error, data) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: data.name + ", " + data.region + ", " + data.country,
                forecast: "Actually is " + data.temperature + " °C, with a precipitation of " + data.precipitation + " mm/min"
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({       //STOPS THE APP
            error: 'You must insert a search parameter'
        }) 
    }
    res.send({
        search: req.query.search
    })
})


//404 PAGE ROUTER -> GOES LAST!
app.get('*', (req, res) => {
    res.render('404', {
        title: 404
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

