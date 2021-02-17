const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f8a7f1acf4eec9f2ff018e5ea91b0423&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                name: response.body.location.name,
                region: response.body.location.region,
                country: response.body.location.country,
                temperature: response.body.current.temperature,
                precipitation: response.body.current.precip
            })
        }
    })
}

module.exports = forecast