module.exports = class City extends Backbone.Model

    urlRoot: 'cities'

    initialize: ->
        @fmtCityWeatherInfos()
        @fmtCityForecastInfos()

    toRoundCelcius: (value) ->
        parseInt(value - 273.15)

    fmtCityWeatherInfos: () =>
        main = @get "main"
        if main
            @set "temp", @toRoundCelcius(main.temp)
            @set "humidity", main.humidity

        weather = @get "weather"
        if weather
            @set "weather", weather[0]

        clouds = @get "clouds"
        if clouds
            @set "clouds", clouds.all

        sys = @get "sys"
        if sys
            @set "country", sys.country

        name = @get "name"
        if name
            @set "name", name

    toReadableDate: (value) ->
        date = new Date 0
        date.setUTCSeconds value
        "" +
        date.getDate() + '/' +
        (date.getMonth()+ 1) + '/' +
        date.getFullYear()

    fmtCityForecastInfos: () =>
        next5 = []
        for day in @get "list"
            nextDay = {}
            nextDay.date     = @toReadableDate(day.dt)
            nextDay.day      = @toRoundCelcius(day.temp.day)
            nextDay.night    = @toRoundCelcius(day.temp.night)
            nextDay.humidity = day.humidity
            nextDay.weather  = day.weather[0]

            next5.push nextDay
        @set "days", next5
