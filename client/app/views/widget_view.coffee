View           = require "../lib/base_view"
AppRouter      = require "../routers/app_router"
CitiesView     = require "./cities_view"
City           = require "../models/city"
CityCollection = require "../collections/city_collection"

module.exports = class AppView extends View
    el: "body.widget"

    template: ->
        require "./templates/widget"

    initialize: ->
        @router = PiourCozyOWM.Routers.AppRouter = new AppRouter()

    afterRender: ->
        @citiesView = new CitiesView(collection: new CityCollection)
        @citiesView.collection.fetch
            error: =>
                alertUser "impossible to retrieve weather informations"

    events:
        "click": () ->
            intent =
                action: 'goto'
                params: "piour-owm/"

            window.parent.postMessage intent, window.location.origin

