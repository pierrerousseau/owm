americano = require 'americano-cozy'

module.exports =
    city:
        all: (doc) -> emit Date.parse(doc.created), doc
