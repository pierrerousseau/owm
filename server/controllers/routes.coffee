cities = require './cities'

module.exports =
    'cities':
        get: cities.all
        post: cities.create
    'cities/:id':
        delete: cities.destroy
