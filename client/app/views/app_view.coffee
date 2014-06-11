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
        @setLoading()
        @citiesView.collection.fetch
            success: =>
                @unSetLoading()
            error: =>
                @unSetLoading()
                alertUser "impossible to retrieve weather informations"

    events:
        "submit #search": "cityFind"
        "submit #refresh": "refresh"

    cityFind: (evt) ->
        city    = @$el.find "input.city"
        cityObj =
            "name": city.val()
        @citiesView.collection.create cityObj,
            error: =>
                alertUser "impossible to add weather informations for " +
                          city.val()

        false

    refresh: (evt) ->
        @setLoading()
        @citiesView.collection.fetch
            reset: true
            success: =>
                @unSetLoading()
            error: =>
                @unSetLoading()
                alertUser "impossible to retrieve weather informations"


        false
    
    setLoading: ->
        @.$el.find("button").toggleClass "btn-default"
        @.$el.find("button").toggleClass "btn-warning"
    unSetLoading: ->
        @.$el.find("button").toggleClass "btn-default"
        @.$el.find("button").toggleClass "btn-warning"
