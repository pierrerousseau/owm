http      = require "http"
async     = require "async"
americano = require "americano-cozy"

cityUrl = "http://openweathermap.org/city/"

# openweathermap limits the number of connection by minutes, 
# returning error 429 code, so we must retry sometimes
# let's do it for any empty answer from owm
maxRetry   = 5  # number of times to retry the call
delayRetry = 50 # ms to wait between each call

module.exports = City = americano.getModel "City",
    "name":
        "type": String
    "created":
        "type": Date,
        "default": Date


httpGet = (url, deflt, callback) ->
    result = deflt
    req = http.get url, (res) ->
        data   = ""
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


addCityKeys = (mainKey, values, city) ->
    for key, value of values
        city[mainKey][key] = value
    city


addAPIKey = (url) ->
    apiKey = "&APPID=74cd76c870c1c4a1df6c3bab6840471d"
    url + apiKey


callWithRetry = (url, callback, count) ->
    if not count
        count = 1
    httpGet url, null, (infos, err) ->
        if (not err) and (not infos) and count < maxRetry
            setTimeout((() -> callWithRetry url, callback, count + 1), 
                       delayRetry)
        else
            callback infos, err


City.baseUrl        = "http://api.openweathermap.org/data/2.5/"
City.weatherUrl     = City.baseUrl + "weather?q="
City.forecastUrl    = City.baseUrl + "forecast?id="
City.dayForecastUrl = City.baseUrl + "forecast/daily?cnt=5&id="

City.fullCity = (city, mainCallback) ->
    weatherUrl     = City.weatherUrl + city.name
    forecastUrl    = City.forecastUrl
    dayForecastUrl = City.dayForecastUrl

    fullCity =
        "id": city.id
        "name": city.name
        "weather": {},
        "hours": {},
        "days": {},

    async.series([
        ((callback) ->
            callWithRetry (addAPIKey weatherUrl), (weather, err) ->
                if not err
                    fullCity = addCityKeys "weather", weather, fullCity
                    fullCity.url = cityUrl + weather.id 
                    forecastUrl    += weather.id
                    dayForecastUrl += weather.id
                callback()),
        ((callback) ->
            callWithRetry (addAPIKey forecastUrl), (forecast, err) ->
                if not err
                    fullCity = addCityKeys "hours", forecast, fullCity
                callback()),
        ((callback) ->
            callWithRetry (addAPIKey dayForecastUrl), (forecast, err) ->
                if not err
                    fullCity = addCityKeys "days", forecast, fullCity
                callback(null, fullCity))
    ], (err, results) ->
        mainCallback(null, fullCity))

City.fullCities = (cities, callback) ->
    async.map cities, @fullCity, (err, results) ->
        callback(err, results)

City.all = (callback) ->
    @request "byDate", (err, cities) =>
        if err
            callback.call(@, err, [])
        else
            @fullCities(cities, callback)
