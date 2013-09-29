americano = require 'americano-cozy'

module.exports = City = americano.getModel 'City',
    'name': type: String
    'created': type: Date, default: Date

City.all = (params, callback) ->
    City.request "all", params, callback
