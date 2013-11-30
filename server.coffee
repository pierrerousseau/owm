americano = require 'americano'

port = process.env.PORT || 31437
americano.start name: 'Cozy OWM', port: port
