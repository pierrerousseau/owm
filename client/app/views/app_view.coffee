View           = require "../lib/base_view"
AppRouter      = require "../routers/app_router"
CitiesView     = require "./cities_view"
City           = require "../models/city"
CityCollection = require '../collections/city_collection'

module.exports = class AppView extends View
    el: "body.application"

    template: ->
        require "./templates/home"

    initialize: ->
        @router = PiourCozyOWM.Routers.AppRouter = new AppRouter()

    afterRender: ->
        @citiesView = new CitiesView(collection: new CityCollection)
        @setUnit()
        @loadCities()

    events:
        "submit #search": "cityFind"
        "click #refresh": "refresh"
        "click .random-choice": "addRandomCity"
        "click .search": "showHelper"
        "click .unit": "changeUnit"

    setUnit: ->
        unitContainer = $(".unit")
        if localStorage["owm-unit"]?
            unitContainer.text(localStorage["owm-unit"])
        else
            unitContainer.text("C")

    changeUnit: ->
        unitContainer = $(".unit")
        if unitContainer.text().trim() == "C"
            unitContainer.text("F")
        else
            unitContainer.text("C")
        localStorage["owm-unit"] = unitContainer.text().trim()
        @refresh()

    displayRandom: ->
        $(".random-choice").remove()
        capitals = $("#capitals option")
        for num in [1, 2, 3]
            name = capitals[Math.floor(Math.random() * capitals.length)].value
            $.getJSON "cities/" + name, (data) ->
                tmpl = require "./templates/random"
                newCity = $ tmpl(new City(data).attributes)
                newCity.hide()
                $("#random-choices").append newCity
                newCity.show("slow")

    loadCities: ->
        @displayRandom()
        @setLoading()
        @citiesView.collection.fetch
            reset: true
            success: =>
                @unSetLoading()
            error: =>
                @unSetLoading()
                alert "impossible to retrieve weather informations"

    addCity: (name) ->
        @setLoading()
        cityObj =
            "name": name
        @citiesView.collection.create cityObj,
            "wait": true,
            "success": =>
                @unSetLoading()
            "error": =>
                @unSetLoading()
                alert "impossible to add weather informations for " + name

    cityFind: (evt) ->
        city    = @$el.find "input.city"
        @addCity(city.val())

        false

    refresh: (evt) ->
        @loadCities()

        false
    
    addRandomCity: (evt) ->
        current = $(evt.currentTarget)
        name    = current.find(".random-choice-name").text()
        @addCity(name)

        false

    setLoading: ->
        $("body").addClass("loading")
    unSetLoading: ->
        $("body").removeClass("loading")
