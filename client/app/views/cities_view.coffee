ViewCollection = require '../lib/view_collection'
CityView       = require './city_view'
CityCollection = require '../collections/city_collection'

module.exports = class CitiesView extends ViewCollection
    el: "#cities"

    view: CityView

    initialize: ->
        @collection = new CityCollection @
