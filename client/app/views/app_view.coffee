View           = require "../lib/base_view"
AppRouter      = require "../routers/app_router"
CitiesView     = require "./cities_view"
City           = require "../models/city"
CityCollection = require '../collections/city_collection'

capitals = ["Beijing", "Tokyo", "Moscow", "Korea", "Jakarta", "Tehran", "Mexico", "Lima", "Bangkok", "London", "Bogotá", "Cairo", "Baghdad", "Hong Kong", "Dhaka", "Singapore", "Ankara", "Santiago", "Riyadh", "Kinshasa", "Berlin", "Damascus", "Hanoi", "Madrid", "Pyongyang", "Kabul", "Addis Ababa", "Buenos Aires", "Rome", "Kiev", "Nairobi", "Brasília", "Taipei", "Amman", "Luanda", "Pretoria", "Paris", "Tashkent", "Stockholm", "Havana", "Phnom Penh", "Bucharest", "Baku", "Caracas", "Rabat", "Vienna", "Khartoum", "Budapest", "Warsaw", "Minsk", "Manila", "Kampala", "Accra", "Yaoundé", "Antananarivo", "Beirut", "Algiers", "Quito", "Harare", "Doha", "Sana'a Conakry", "Kuala Lumpur", "Montevideo", "Lusaka", "Hargeisa", "Bamako", "Prague", "Port-au-Prince", "Tripoli", "Kuwait City", "Belgrade", "Santo Domingo", "Mogadishu", "Sofia", "Brazzaville", "Brussels", "Yerevan", "Maputo", "Freetown", "Tbilisi", "Dakar", "Ouagadougou", "Dublin", "Monrovia", "Guatemala City", "Islamabad", "Managua", "Naypyidaw", "Ulan Bator", "Lilongwe", "Ottawa", "La Paz", "Bishkek", "Lomé", "Panama City", "Kathmandu", "Amsterdam", "Zagreb", "Muscat", "Niamey", "Chişinău", "Jerusalem", "Abuja", "Tirana", "Tunis", "Ashgabat", "N'Djamena", "Tegucigalpa", "Bangui", "Athens", "Nouakchott", "Kigali", "Riga", "Kingston", "Astana", "Oslo", "Helsinki", "Abu Dhabi", "Dushanbe", "Vilnius", "Libreville", "Asmara", "Lisbon", "San Salvador", "Asunción", "Macau", "Skopje", "Copenhagen", "Djibouti", "Yamoussoukro", "Bissau", "Bratislava", "San Juan", "Tallinn", "Bujumbura", "Sarajevo", "Wellington", "Juba", "Canberra", "San José", "Port Moresby", "Vientiane", "Dodoma", "Maseru", "Nicosia", "Ljubljana", "Paramaribo", "Windhoek", "New Delhi", "Nassau", "Gaborone", "Porto-Novo", "Prishtina", "El Aaiún", "Tiraspol", "Port Louis", "Podgorica", "Manama", "Georgetown", "Praia", "Berne", "Sri Jayawardenapura Kotte", "Reykjavík", "Bridgetown", "Malé", "Thimphu", "Malabo", "Nouméa", "Suva", "Mbabane", "Luxembourg", "Castries", "Saipan", "Moroni", "Honiara", "Dili", "Sao Tome", "Pago Pago", "Stepanakert", "Willemstad", "Kingstown", "Apia", "Port Vila", "Monaco", "Banjul", "Tarawa", "Oranjestad", "Victoria", "Gibraltar", "Saint Helier", "George Town", "Douglas", "Papeete", "Ramallah", "Majuro", "Andorra", "St. John's", "Peter Port", "Belmopan", "Nuuk", "Roseau", "Basseterre", "Mariehamn", "Charlotte Amalie", "Palikir", "Road Town", "St. George's", "Valletta", "Marigot", "Saint-Pierre", "Avarua", "Vaduz", "San Marino", "Funafuti", "Cockburn Town", "Gustavia", "Stanley", "Longyearbyen", "Philipsburg", "Mata-Utu", "Hamilton"]

module.exports = class AppView extends View
    el: "body.application"

    template: ->
        require "./templates/home"

    initialize: ->
        @router = PiourCozyOWM.Routers.AppRouter = new AppRouter()

    displayRandom: ->
        for num in [1, 2, 3]
            name = capitals[Math.floor(Math.random() * capitals.length)]
            $.getJSON "cities/" + name, (data) ->
                tmpl = require "./templates/random"
                console.log new City(data).attributes
                $("#add-choices-examples").append tmpl(new City(data).attributes)

    afterRender: ->
        @displayRandom()
        @citiesView = new CitiesView(collection: new CityCollection)
        @setLoading()
        @citiesView.collection.fetch
            success: =>
                @unSetLoading()
            error: =>
                @unSetLoading()
                alertUser "impossible to retrieve weather informations"

    events:
        "submit #search": "cityFind"
        "submit #refresh": "refresh"

    cityFind: (evt) ->
        city    = @$el.find "input.city"
        cityObj =
            "name": city.val()
        @citiesView.collection.create cityObj,
            error: =>
                alertUser "impossible to add weather informations for " +
                          city.val()

        false

    refresh: (evt) ->
        @setLoading()
        @citiesView.collection.fetch
            reset: true
            success: =>
                @unSetLoading()
            error: =>
                @unSetLoading()
                alertUser "impossible to retrieve weather informations"


        false
    
    setLoading: ->
        @.$el.find("button").toggleClass "btn-default"
        @.$el.find("button").toggleClass "btn-warning"
    unSetLoading: ->
        @.$el.find("button").toggleClass "btn-default"
        @.$el.find("button").toggleClass "btn-warning"
