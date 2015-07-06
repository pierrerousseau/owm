americano = require 'americano-cozy'

module.exports =
    city:
        byDate: (doc) -> emit Date.parse(doc.created), doc
