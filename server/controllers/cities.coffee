City = require '../models/city'

module.exports.all = (req, res) ->
    City.all (err, cities) ->
        if err
            msg = "Server error occured while retrieving data."
            res.send error: true, msg: msg
        else
            res.send cities

module.exports.create = (req, res) ->
    City.create req.body, (err, city) =>
        if err
            msg = "Server error while creating city."
            res.send error: true, msg: msg, 500
        else
            res.send city

module.exports.destroy = (req, res) ->
    City.find req.params.id, (err, city) =>
        if err? or not city?
            res.send error: true, msg: "City not found", 404
        else
            city.destroy (err) ->
                if err
                    res.send error: 'Cannot delete city', 500
                else
                    res.send success: 'City succesfuly deleted'

                city = null
