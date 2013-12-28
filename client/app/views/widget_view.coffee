View       = require "../lib/view"
AppRouter  = require "../routers/app_router"
CitiesView = require "./cities_view"
City       = require "../models/city"

module.exports = class AppView extends View
    el: "body.widget"

    template: ->
        require "./templates/widget"

    initialize: ->
        @router = PiourCozyOWM.Routers.AppRouter = new AppRouter()

    afterRender: ->
        @citiesView = new CitiesView()
        @citiesView.collection.fetch
            error: =>
                alertUser "impossible to retrieve weather informations"

    events:
        "click": () ->
            intent =
                action: 'goto'
                params: "piour-owm/"

            window.parent.postMessage intent, window.location.origin

