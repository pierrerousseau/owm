module.exports = class City extends Backbone.Model

    urlRoot: 'cities'

    weatherUrl: "http://api.openweathermap.org/data/2.5/weather?q="
    forecastUrl:
        "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=5&q="

    initialize: ->
        $.ajax
            "url": @weatherUrl + @get("name")
            "dataType": "jsonp"
            "success": @addCityWeatherInfos
            "error": @badCity

    toRoundCelcius: (value) ->
        parseInt(value - 273.15)

    toReadableDate: (value) ->
        date = new Date 0
        date.setUTCSeconds value
        "" +
        date.getDate() + '/' +
        (date.getMonth()+ 1) + '/' +
        date.getFullYear()

    addCityWeatherInfos: (city) =>
        if city.main
            @set "temp", @toRoundCelcius(city.main.temp)
            @set "humidity", city.main.humidity
        if city.weather
            @set "weather", city.weather[0]
        if city.clouds
            @set "clouds", city.clouds.all

        if city.sys
            @set "country", city.sys.country
        if city.name
            @set "name", city.name

        @set "days", []

        if city
            $.ajax
                "url": @forecastUrl + @get("name")
                "dataType": "jsonp"
                "success": @addCityForecastInfos
                "error": @badCity


    addCityForecastInfos: (city) =>
        next5 = []
        for day in city.list
            nextDay = {}
            nextDay.date     = @toReadableDate(day.dt)
            nextDay.day      = @toRoundCelcius(day.temp.day)
            nextDay.night    = @toRoundCelcius(day.temp.night)
            nextDay.humidity = day.humidity
            nextDay.weather  = day.weather[0]

            next5.push nextDay
        @set "days", next5

    badCity: (err) =>
        alertUser "impossible to find weather for " + @get "name"
