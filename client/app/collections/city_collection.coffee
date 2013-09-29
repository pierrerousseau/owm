City = require '../models/city'

module.exports = class CityCollection extends Backbone.Collection

    model: City
    url: 'cities'

    constructor: (@view) ->
        super()

        @bind "add", @view.renderOne
        @bind "reset", @view.renderAll
