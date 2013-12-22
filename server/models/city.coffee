americano = require 'americano-cozy'

module.exports = City = americano.getModel 'City',
    'name': type: String
    'created': type: Date, default: Date

http  = require "http"
async = require "async"


httpGet = (url, deflt, callback) ->
    result = deflt
    req = http.get url, (res) ->
        data   = ''
        chunks = []
        length = 0

        res.on "data", (chunk) ->
            chunks.push chunk
            length += chunk.length
        res.on "end", () ->
            data   = Buffer.concat chunks, length
            result = ""
            if data.length
                result = JSON.parse(data.toString("UTF-8"))
            callback(result)

    req.on "error", ->
        callback(deflt, "error")


City.baseUrl     = "http://api.openweathermap.org/data/2.5/"
City.weatherUrl  = City.baseUrl + "weather?q="
City.forecastUrl = City.baseUrl + "forecast/daily?cnt=5&q="

City.fullCity = (city, mainCallback) ->
    weatherUrl  = City.weatherUrl + city.name
    forecastUrl = City.forecastUrl + city.name

    fullCity      =
        id: city.id
        name: city.name
    async.series([
        ((callback) ->
            httpGet weatherUrl, null, (weather, err) =>
                if not err
                    for key, value of weather
                        fullCity[key] = value if key != "id"
                callback()),
        ((callback) ->
            httpGet forecastUrl, null, (forecast, err) =>
                if not err
                    for key, value of forecast
                        fullCity[key] = value if key != "id"
                callback(null, fullCity))
    ], (err, results) ->
        mainCallback(null, fullCity))

City.fullCities = (cities, callback) ->
    async.map cities, @fullCity, (err, results) ->
        callback(err, results)

City.all = (callback) ->
    @request "all", (err, cities) =>
        if err
            callback.call(@, err, [])
        else
            @fullCities(cities, callback)
