ViewCollection = require '../lib/view_collection'
CityView       = require './city_view'

module.exports = class CitiesView extends ViewCollection
    el: "#cities"

    itemview: CityView
