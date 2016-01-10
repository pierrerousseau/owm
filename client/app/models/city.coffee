icons =
    "01d": "day-sunny"
    "01n": "night-clear"
    "02d": "day-cloudy"
    "02n": "night-cloudy"
    "03d": "cloud"
    "03n": "cloud"
    "04d": "cloudy"
    "04n": "cloudy"
    "09d": "rain"
    "09n": "night-rain"
    "10d": "day-hail"
    "10n": "night-hail"
    "11d": "lightning"
    "11n": "lightning"
    "13d": "snow"
    "13n": "snow"
    "50d": "windy"
    "50n": "windy"

dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

nbNextHours = 5
nbNextDays  = 6

module.exports = class City extends Backbone.Model

    urlRoot: 'cities'

    initialize: ->
        @fmtCityWeatherInfos()
        @fmtCityForecastInfos()
        @fmtCityDaysForecastInfos()

    toRoundDegres: (value) ->
        deg = parseInt(value - 273.15)
        if localStorage["owm-unit"]? and localStorage["owm-unit"] == "F"
            deg = parseInt(value * 1.8 - 459.67)
        deg

    toWiClass: (icon) ->
        return icons[icon]

    toHotness: (temp) ->
        hotness = "normal"
        if temp?
            temp = parseInt(temp)
            if  temp > 300
                hotness = "hot"
            if temp < 23
                hotness = "cold"
        hotness

    fmtCityWeatherInfos: () =>
        toSet = {}

        weather = @get "weather"
        if weather
            main = weather.main

            toSet.humidity = 0
            toSet.temp     = 0
            toSet.hotness  = @toHotness(toSet.temp)
            if main
                toSet.hotness  = @toHotness(main.temp)
                toSet.temp     = @toRoundDegres(main.temp)
                toSet.humidity = main.humidity

            main_weather = weather.weather
            if main_weather
                toSet.weather = main_weather[0]

            clouds = weather.clouds
            if clouds
                toSet.clouds = clouds.all

            sys = weather.sys
            toSet.country = ""
            if sys
                toSet.country = sys.country.toLowerCase()

            name = weather.name
            if name
                toSet.name = name

            toSet.wiclass = "lightning"
            if toSet.weather?
                icon = toSet.weather.icon
                if icon?
                    toSet.wiclass = @toWiClass(icon)
            else
                toSet.weather =
                    "icon": "11d"

        @set toSet

    toReadableHour: (value) ->
        value.split(" ")[1].slice(0, nbNextHours)

    toReadableDate: (value) ->
        date = new Date 0
        date.setUTCSeconds value
        "" +
        date.getDate() + '/' +
        (date.getMonth()+ 1) + '/' +
        date.getFullYear()

    toDayName: (value) ->
        date = new Date 0
        date.setUTCSeconds value
        dayNames[date.getDay()]

    fmtCityForecastInfos: () =>
        nexts    = []
        forecast = @get "hours"
        if forecast
            forecast = forecast.list
            now      = new Date().getTime()
            if forecast
                for hour in forecast
                    if hour.dt * 1000 >= now
                        nextHour = {}
                        nextHour.hour     = @toReadableHour(hour.dt_txt)
                        nextHour.hotness  = @toHotness(hour.main.temp)
                        nextHour.temp     = @toRoundDegres(hour.main.temp)
                        nextHour.humidity = hour.main.humidity
                        nextHour.weather  = hour.weather[0]
                        nextHour.wiclass  = @toWiClass(nextHour.weather.icon)

                        nexts.push nextHour

                    if nexts.length >= nbNextHours
                        break

        @set "hours", nexts

    fmtCityDaysForecastInfos: () =>
        nexts    = []
        forecast = @get "days"
        if forecast
            forecast = forecast.list
            if forecast
                for day in forecast
                    nextDay = {}
                    nextDay.date     = @toReadableDate(day.dt)
                    nextDay.name     = @toDayName(day.dt)
                    nextDay.hotness  = @toHotness(day.temp.day)
                    nextDay.day      = @toRoundDegres(day.temp.day)
                    nextDay.night    = @toRoundDegres(day.temp.night)
                    nextDay.humidity = day.humidity
                    nextDay.weather  = day.weather[0]
                    nextDay.wiclass  = @toWiClass(nextDay.weather.icon)

                    nexts.push nextDay
        @set "days", nexts
