cities = require './cities'

module.exports =
    'cities':
        get: cities.all
        post: cities.create
    'cities/:id':
        get: cities.get
        delete: cities.destroy
