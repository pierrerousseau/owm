americano = require 'americano'

port = process.env.PORT || 9250
americano.start name: 'Cozy OWM', port: port
