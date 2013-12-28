View = require "../lib/view"

module.exports = class CityView extends View
    className: "city"
    tagName: "li"

    events:
        "click .remove": "deleteCity"

    constructor: (@model) ->
        super()

    initialize: ->
        @model.on "change", ((t, evt) ->
            if @model.attributes.weather?.icon
                @render.call @
            else if @model.attributes.weather?
                @model.initialize()
            else if @model.attributes.message
                alertUser @model.attributes.message), @

    template: ->
        template = require "./templates/city"
        template @getRenderData()

    deleteCity: ->
        @model.destroy
            success: =>
                @remove()
            error: =>
                alertUser "impossible to remove " + @model.get "name"
