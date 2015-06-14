View = require "../lib/base_view"

module.exports = class CityView extends View
    className: "city row"
    tagName: "li"

    events:
        "click .now-remove": "removeCity"

    template: ->
        template = require "./templates/city"
        data = @getRenderData().model
        if data
            if not data.hotness
                @model.initialize()
                data = @getRenderData().model
            template data

    removeCity: ->
        @model.destroy
            success: =>
                @remove()
            error: =>
                alertUser "impossible to remove " + @model.get "name"
