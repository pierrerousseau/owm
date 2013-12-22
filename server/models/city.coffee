americano = require 'americano-cozy'

module.exports = City = americano.getModel 'City',
    'name': type: String
    'created': type: Date, default: Date

http = require "http"

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

City.fullCity = (city, callback, cities, fullCities) ->
    weatherUrl  = @weatherUrl + city.name
    forecastUrl = @forecastUrl + city.name

    fullCity      = {}
    fullCity.id   = city.id
    fullCity.name = city.name
    httpGet weatherUrl, city, (weather, err) =>
        if not err
            for key, value of weather
                fullCity[key] = value if key != "id"
        httpGet forecastUrl, fullCity, (forecast, err) =>
            if not err
                for key, value of forecast
                    fullCity[key] = value if key != "id"
            if fullCities
                fullCities.push(fullCity)
                @fullCities(cities, fullCities, callback)
            else
                callback.send(fullCity)

City.fullCities = (cities, fullCities, callback) ->
    city = cities.pop()
    if city
        @fullCity(city, callback, cities, fullCities)
    else
        callback.call(@, 0, fullCities.reverse())

City.all = (callback) ->
    @request "all", (err, cities) =>
        if err
            callback.call(@, err, [])
        else
            @fullCities(cities, [], callback)
