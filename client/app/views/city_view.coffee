View = require "../lib/view"

module.exports = class CityView extends View
    className: "city"
    tagName: "li"

    events:
        "click .remove": "deleteCity"

    constructor: (@model) ->
        super()

    initialize: ->
        @model.on "change", @render, @

    template: ->
        template = require "./templates/city"
        template @getRenderData()

    deleteCity: ->
        @model.destroy
            success: =>
                @remove()
            error: =>
                alertUser "impossible to remove " + @model.get "name"
