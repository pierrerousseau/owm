module.exports = class City extends Backbone.Model

    urlRoot: 'cities'

    initialize: ->
        @fmtCityWeatherInfos()
        @fmtCityForecastInfos()
        @fmtCityDaysForecastInfos()

    toRoundCelcius: (value) ->
        parseInt(value - 273.15)

    fmtCityWeatherInfos: () =>
        toSet = {}

        weather = @get "weather"
        if weather
            main    = weather.main
            if main
                toSet.temp     = @toRoundCelcius(main.temp)
                toSet.humidity = main.humidity

            main_weather = weather.weather
            if main_weather
                toSet.weather = main_weather[0]

            clouds = weather.clouds
            if clouds
                toSet.clouds = clouds.all

            sys = weather.sys
            if sys
                toSet.country = sys.country

            name = weather.name
            if name
                toSet.name = name

        @set toSet

    toReadableHour: (value) ->
        value.split(" ")[1].slice(0, 5)

    toReadableDate: (value) ->
        date = new Date 0
        date.setUTCSeconds value
        "" +
        date.getDate() + '/' +
        (date.getMonth()+ 1) + '/' +
        date.getFullYear()

    fmtCityForecastInfos: () =>
        next5    = []
        forecast = @get "hours"
        if forecast
            forecast = forecast.list
            now      = new Date().getTime()
            if forecast
                for hour in forecast
                    if hour.dt * 1000 >= now
                        nextHour = {}
                        nextHour.hour     = @toReadableHour(hour.dt_txt)
                        nextHour.temp     = @toRoundCelcius(hour.main.temp)
                        nextHour.humidity = hour.main.humidity
                        nextHour.weather  = hour.weather[0]

                        next5.push nextHour

                    if next5.length >= 5
                        break

        @set "hours", next5

    fmtCityDaysForecastInfos: () =>
        next5    = []
        forecast = @get "days"
        if forecast
            forecast = forecast.list
            if forecast
                for day in forecast
                    nextDay = {}
                    nextDay.date     = @toReadableDate(day.dt)
                    nextDay.day      = @toRoundCelcius(day.temp.day)
                    nextDay.night    = @toRoundCelcius(day.temp.night)
                    nextDay.humidity = day.humidity
                    nextDay.weather  = day.weather[0]

                    next5.push nextDay
        @set "days", next5
