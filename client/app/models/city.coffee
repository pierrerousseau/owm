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

    toRoundCelcius: (value) ->
        parseInt(value - 273.15)

    toWiClass: (icon) ->
        return icons[icon]

    toHotness: (temp) ->
        hotness = "normal"
        if temp?
            temp = parseInt(temp)
            if  temp > 26
                hotness = "hot"
            if temp < 9
                hotness = "cold"
        hotness

    fmtCityWeatherInfos: () =>
        toSet = {}

        weather = @get "weather"
        console.log(weather)
        if weather
            main = weather.main
            toSet.temp = 0
            toSet.humidity = 0
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
            toSet.hotness = @toHotness(toSet.temp)

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
                        nextHour.temp     = @toRoundCelcius(hour.main.temp)
                        nextHour.humidity = hour.main.humidity
                        nextHour.weather  = hour.weather[0]
                        nextHour.wiclass  = @toWiClass(nextHour.weather.icon)
                        nextHour.hotness  = @toHotness(nextHour.temp)

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
                    nextDay.day      = @toRoundCelcius(day.temp.day)
                    nextDay.night    = @toRoundCelcius(day.temp.night)
                    nextDay.humidity = day.humidity
                    nextDay.weather  = day.weather[0]
                    nextDay.wiclass  = @toWiClass(nextDay.weather.icon)
                    nextDay.hotness  = @toHotness(nextDay.day)

                    nexts.push nextDay
        @set "days", nexts
