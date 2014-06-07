View = require "../lib/base_view"

module.exports = class CityView extends View
    className: "city"
    tagName: "li"

    events:
        "click .remove": "deleteCity"

    template: ->
        template = require "./templates/city"
        template @getRenderData()

    deleteCity: ->
        @model.destroy
            success: =>
                @remove()
            error: =>
                alertUser "impossible to remove " + @model.get "name"
