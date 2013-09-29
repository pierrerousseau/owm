View       = require "../lib/view"
AppRouter  = require "../routers/app_router"
CitiesView = require "./cities_view"
City       = require "../models/city"

module.exports = class AppView extends View
    el: "body.application"

    template: ->
        require "./templates/home"

    initialize: ->
        @router = CozyApp.Routers.AppRouter = new AppRouter()

    afterRender: ->
        @citiesView = new CitiesView()
        @citiesView.collection.fetch
            error: =>
                alertUser "impossible to retrieve weather informations"

    events:
        "submit #search": "cityFind"

    cityFind: (evt) ->
        city    = @$el.find "input.city"
        cityObj =
            "name": city.val()
        @citiesView.collection.create cityObj,
            error: =>
                alertUser "impossible to add weather informations for " +
                          city.val()

        false
