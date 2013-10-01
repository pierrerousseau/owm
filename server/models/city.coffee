americano = require 'americano-cozy'

module.exports = City = americano.getModel 'City',
    'name': type: String
    'created': type: Date, default: Date

http = require "http"

httpGet = (url, callback) ->
    http.get url, (res) ->
        data   = ''
        chunks = []
        length = 0

        res.on "data", (chunk) ->
            chunks.push chunk
            length += chunk.length
        res.on "end", () ->
            data   = Buffer.concat chunks, length
            result = JSON.parse(data.toString("UTF-8"))

            callback(result)

City.baseUrl     = "http://api.openweathermap.org/data/2.5/"
City.weatherUrl  = City.baseUrl + "weather?q="
City.forecastUrl = City.baseUrl + "forecast/daily?cnt=5&q="

City.fullCity = (city, cities, fullCities, callback) ->
    weatherUrl  = @weatherUrl + city.name
    forecastUrl = @forecastUrl + city.name
    httpGet weatherUrl, (weather) =>
        fullCity = weather
        httpGet forecastUrl, (forecast) =>
            for key, value of forecast 
                fullCity[key] = value
            fullCities.push(fullCity)
            @fullCities(cities, fullCities, callback)

City.fullCities = (cities, fullCities, callback) ->
    city = cities.pop()
    if city
        @fullCity(city, cities, fullCities, callback)
    else
        callback.call(@, 0, fullCities.reverse())

City.all = (callback) ->
    @request "all", (err, cities) =>
        if err
            callback.call(@, err, [])
        else
            @fullCities(cities, [], callback)
