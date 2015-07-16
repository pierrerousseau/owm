(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("collections/city_collection", function(exports, require, module) {
var City, CityCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

City = require('../models/city');

module.exports = CityCollection = (function(superClass) {
  extend(CityCollection, superClass);

  CityCollection.prototype.model = City;

  CityCollection.prototype.url = 'cities';

  function CityCollection(view) {
    this.view = view;
    CityCollection.__super__.constructor.apply(this, arguments);
  }

  return CityCollection;

})(Backbone.Collection);

});

;require.register("initialize", function(exports, require, module) {
if (this.PiourCozyOWM == null) {
  this.PiourCozyOWM = {};
}

if (PiourCozyOWM.Routers == null) {
  PiourCozyOWM.Routers = {};
}

if (PiourCozyOWM.Views == null) {
  PiourCozyOWM.Views = {};
}

if (PiourCozyOWM.Models == null) {
  PiourCozyOWM.Models = {};
}

if (PiourCozyOWM.Collections == null) {
  PiourCozyOWM.Collections = {};
}

$(function() {
  var AppView;
  require('../lib/app_helpers');
  if (window.location.href.match("widget.html")) {
    PiourCozyOWM.Views.appView = new (AppView = require('views/widget_view'));
    PiourCozyOWM.Views.appView.render();
  } else {
    PiourCozyOWM.Views.appView = new (AppView = require('views/app_view'));
    PiourCozyOWM.Views.appView.render();
  }
  return Backbone.history.start({
    pushState: true
  });
});

});

;require.register("lib/app_helpers", function(exports, require, module) {
(function() {
  return (function() {
    var console, dummy, method, methods, results;
    console = window.console = window.console || {};
    method = void 0;
    dummy = function() {};
    methods = 'assert,count,debug,dir,dirxml,error,exception, group,groupCollapsed,groupEnd,info,log,markTimeline, profile,profileEnd,time,timeEnd,trace,warn'.split(',');
    results = [];
    while (method = methods.pop()) {
      results.push(console[method] = console[method] || dummy);
    }
    return results;
  })();
})();

});

;require.register("lib/base_view", function(exports, require, module) {
var BaseView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = BaseView = (function(superClass) {
  extend(BaseView, superClass);

  function BaseView() {
    return BaseView.__super__.constructor.apply(this, arguments);
  }

  BaseView.prototype.template = function() {};

  BaseView.prototype.initialize = function() {};

  BaseView.prototype.getRenderData = function() {
    var ref;
    return {
      model: (ref = this.model) != null ? ref.toJSON() : void 0
    };
  };

  BaseView.prototype.render = function() {
    this.beforeRender();
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  };

  BaseView.prototype.beforeRender = function() {};

  BaseView.prototype.afterRender = function() {};

  BaseView.prototype.destroy = function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    return Backbone.View.prototype.remove.call(this);
  };

  return BaseView;

})(Backbone.View);

});

;require.register("lib/view_collection", function(exports, require, module) {
var BaseView, ViewCollection,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseView = require('lib/base_view');

module.exports = ViewCollection = (function(superClass) {
  extend(ViewCollection, superClass);

  function ViewCollection() {
    this.removeItem = bind(this.removeItem, this);
    this.addItem = bind(this.addItem, this);
    return ViewCollection.__super__.constructor.apply(this, arguments);
  }

  ViewCollection.prototype.itemview = null;

  ViewCollection.prototype.views = {};

  ViewCollection.prototype.template = function() {
    return '';
  };

  ViewCollection.prototype.itemViewOptions = function() {};

  ViewCollection.prototype.collectionEl = null;

  ViewCollection.prototype.onChange = function() {
    return this.$el.toggleClass('empty', _.size(this.views) === 0);
  };

  ViewCollection.prototype.appendView = function(view) {
    return this.$collectionEl.prepend(view.el);
  };

  ViewCollection.prototype.initialize = function() {
    ViewCollection.__super__.initialize.apply(this, arguments);
    this.views = {};
    this.listenTo(this.collection, "reset", this.onReset);
    this.listenTo(this.collection, "add", this.addItem);
    this.listenTo(this.collection, "remove", this.removeItem);
    if (this.collectionEl == null) {
      this.collectionEl = this.el;
      return this.$collectionEl = $(this.collectionEl);
    }
  };

  ViewCollection.prototype.render = function() {
    var id, ref, view;
    ref = this.views;
    for (id in ref) {
      view = ref[id];
      view.$el.detach();
    }
    return ViewCollection.__super__.render.apply(this, arguments);
  };

  ViewCollection.prototype.afterRender = function() {
    var id, ref, view;
    this.$collectionEl = $(this.collectionEl);
    ref = this.views;
    for (id in ref) {
      view = ref[id];
      this.appendView(view.$el);
    }
    this.onReset(this.collection);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.remove = function() {
    this.onReset([]);
    return ViewCollection.__super__.remove.apply(this, arguments);
  };

  ViewCollection.prototype.onReset = function(newcollection) {
    var id, ref, view;
    ref = this.views;
    for (id in ref) {
      view = ref[id];
      view.remove();
    }
    return newcollection.forEach(this.addItem);
  };

  ViewCollection.prototype.addItem = function(model) {
    var options, view;
    options = _.extend({}, {
      model: model
    }, this.itemViewOptions(model));
    view = new this.itemview(options);
    this.views[model.cid] = view.render();
    this.appendView(view);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.removeItem = function(model) {
    this.views[model.cid].remove();
    delete this.views[model.cid];
    return this.onChange(this.views);
  };

  return ViewCollection;

})(BaseView);

});

;require.register("models/city", function(exports, require, module) {
var City, dayNames, icons, nbNextDays, nbNextHours,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

icons = {
  "01d": "day-sunny",
  "01n": "night-clear",
  "02d": "day-cloudy",
  "02n": "night-cloudy",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "cloudy",
  "04n": "cloudy",
  "09d": "rain",
  "09n": "night-rain",
  "10d": "day-hail",
  "10n": "night-hail",
  "11d": "lightning",
  "11n": "lightning",
  "13d": "snow",
  "13n": "snow",
  "50d": "windy",
  "50n": "windy"
};

dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

nbNextHours = 5;

nbNextDays = 6;

module.exports = City = (function(superClass) {
  extend(City, superClass);

  function City() {
    this.fmtCityDaysForecastInfos = bind(this.fmtCityDaysForecastInfos, this);
    this.fmtCityForecastInfos = bind(this.fmtCityForecastInfos, this);
    this.fmtCityWeatherInfos = bind(this.fmtCityWeatherInfos, this);
    return City.__super__.constructor.apply(this, arguments);
  }

  City.prototype.urlRoot = 'cities';

  City.prototype.initialize = function() {
    this.fmtCityWeatherInfos();
    this.fmtCityForecastInfos();
    return this.fmtCityDaysForecastInfos();
  };

  City.prototype.toRoundCelcius = function(value) {
    return parseInt(value - 273.15);
  };

  City.prototype.toWiClass = function(icon) {
    return icons[icon];
  };

  City.prototype.toHotness = function(temp) {
    var hotness;
    hotness = "normal";
    if (temp != null) {
      temp = parseInt(temp);
      if (temp > 26) {
        hotness = "hot";
      }
      if (temp < 9) {
        hotness = "cold";
      }
    }
    return hotness;
  };

  City.prototype.fmtCityWeatherInfos = function() {
    var clouds, icon, main, main_weather, name, sys, toSet, weather;
    toSet = {};
    weather = this.get("weather");
    if (weather) {
      main = weather.main;
      toSet.temp = 0;
      toSet.humidity = 0;
      if (main) {
        toSet.temp = this.toRoundCelcius(main.temp);
        toSet.humidity = main.humidity;
      }
      main_weather = weather.weather;
      if (main_weather) {
        toSet.weather = main_weather[0];
      }
      clouds = weather.clouds;
      if (clouds) {
        toSet.clouds = clouds.all;
      }
      sys = weather.sys;
      toSet.country = "";
      if (sys) {
        toSet.country = sys.country.toLowerCase();
      }
      name = weather.name;
      if (name) {
        toSet.name = name;
      }
      toSet.wiclass = "lightning";
      if (toSet.weather != null) {
        icon = toSet.weather.icon;
        if (icon != null) {
          toSet.wiclass = this.toWiClass(icon);
        }
      } else {
        toSet.weather = {
          "icon": "11d"
        };
      }
      toSet.hotness = this.toHotness(toSet.temp);
    }
    return this.set(toSet);
  };

  City.prototype.toReadableHour = function(value) {
    return value.split(" ")[1].slice(0, nbNextHours);
  };

  City.prototype.toReadableDate = function(value) {
    var date;
    date = new Date(0);
    date.setUTCSeconds(value);
    return "" + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  };

  City.prototype.toDayName = function(value) {
    var date;
    date = new Date(0);
    date.setUTCSeconds(value);
    return dayNames[date.getDay()];
  };

  City.prototype.fmtCityForecastInfos = function() {
    var forecast, hour, i, len, nextHour, nexts, now;
    nexts = [];
    forecast = this.get("hours");
    if (forecast) {
      forecast = forecast.list;
      now = new Date().getTime();
      if (forecast) {
        for (i = 0, len = forecast.length; i < len; i++) {
          hour = forecast[i];
          if (hour.dt * 1000 >= now) {
            nextHour = {};
            nextHour.hour = this.toReadableHour(hour.dt_txt);
            nextHour.temp = this.toRoundCelcius(hour.main.temp);
            nextHour.humidity = hour.main.humidity;
            nextHour.weather = hour.weather[0];
            nextHour.wiclass = this.toWiClass(nextHour.weather.icon);
            nextHour.hotness = this.toHotness(nextHour.temp);
            nexts.push(nextHour);
          }
          if (nexts.length >= nbNextHours) {
            break;
          }
        }
      }
    }
    return this.set("hours", nexts);
  };

  City.prototype.fmtCityDaysForecastInfos = function() {
    var day, forecast, i, len, nextDay, nexts;
    nexts = [];
    forecast = this.get("days");
    if (forecast) {
      forecast = forecast.list;
      if (forecast) {
        for (i = 0, len = forecast.length; i < len; i++) {
          day = forecast[i];
          nextDay = {};
          nextDay.date = this.toReadableDate(day.dt);
          nextDay.name = this.toDayName(day.dt);
          nextDay.day = this.toRoundCelcius(day.temp.day);
          nextDay.night = this.toRoundCelcius(day.temp.night);
          nextDay.humidity = day.humidity;
          nextDay.weather = day.weather[0];
          nextDay.wiclass = this.toWiClass(nextDay.weather.icon);
          nextDay.hotness = this.toHotness(nextDay.day);
          nexts.push(nextDay);
        }
      }
    }
    return this.set("days", nexts);
  };

  return City;

})(Backbone.Model);

});

;require.register("routers/app_router", function(exports, require, module) {
var AppRouter,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = AppRouter = (function(superClass) {
  extend(AppRouter, superClass);

  function AppRouter() {
    return AppRouter.__super__.constructor.apply(this, arguments);
  }

  AppRouter.prototype.routes = {
    '': function() {}
  };

  return AppRouter;

})(Backbone.Router);

});

;require.register("views/app_view", function(exports, require, module) {
var AppRouter, AppView, CitiesView, City, CityCollection, View, capitals,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require("../lib/base_view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

CityCollection = require('../collections/city_collection');

capitals = ["Beijing", "Tokyo", "Moscow", "Korea", "Jakarta", "Tehran", "Mexico", "Lima", "Bangkok", "London", "Bogotá", "Cairo", "Baghdad", "Hong Kong", "Dhaka", "Singapore", "Ankara", "Santiago", "Riyadh", "Kinshasa", "Berlin", "Damascus", "Hanoi", "Madrid", "Pyongyang", "Kabul", "Addis Ababa", "Buenos Aires", "Rome", "Kiev", "Nairobi", "Brasília", "Taipei", "Amman", "Luanda", "Pretoria", "Paris", "Tashkent", "Stockholm", "Havana", "Phnom Penh", "Bucharest", "Baku", "Caracas", "Rabat", "Vienna", "Khartoum", "Budapest", "Warsaw", "Minsk", "Manila", "Kampala", "Accra", "Yaoundé", "Antananarivo", "Beirut", "Algiers", "Quito", "Harare", "Doha", "Sana'a Conakry", "Kuala Lumpur", "Montevideo", "Lusaka", "Hargeisa", "Bamako", "Prague", "Port-au-Prince", "Tripoli", "Kuwait City", "Belgrade", "Santo Domingo", "Mogadishu", "Sofia", "Brazzaville", "Brussels", "Yerevan", "Maputo", "Freetown", "Tbilisi", "Dakar", "Ouagadougou", "Dublin", "Monrovia", "Guatemala City", "Islamabad", "Managua", "Naypyidaw", "Ulan Bator", "Lilongwe", "Ottawa", "La Paz", "Bishkek", "Lomé", "Panama City", "Kathmandu", "Amsterdam", "Zagreb", "Muscat", "Niamey", "Chişinău", "Jerusalem", "Abuja", "Tirana", "Tunis", "Ashgabat", "N'Djamena", "Tegucigalpa", "Bangui", "Athens", "Nouakchott", "Kigali", "Riga", "Kingston", "Astana", "Oslo", "Helsinki", "Abu Dhabi", "Dushanbe", "Vilnius", "Libreville", "Asmara", "Lisbon", "San Salvador", "Asunción", "Macau", "Skopje", "Copenhagen", "Djibouti", "Yamoussoukro", "Bissau", "Bratislava", "San Juan", "Tallinn", "Bujumbura", "Sarajevo", "Wellington", "Juba", "Canberra", "San José", "Port Moresby", "Vientiane", "Dodoma", "Maseru", "Nicosia", "Ljubljana", "Paramaribo", "Windhoek", "New Delhi", "Nassau", "Gaborone", "Porto-Novo", "Prishtina", "El Aaiún", "Tiraspol", "Port Louis", "Podgorica", "Manama", "Georgetown", "Praia", "Berne", "Sri Jayawardenapura Kotte", "Reykjavík", "Bridgetown", "Malé", "Thimphu", "Malabo", "Nouméa", "Suva", "Mbabane", "Luxembourg", "Castries", "Saipan", "Moroni", "Honiara", "Dili", "Sao Tome", "Pago Pago", "Stepanakert", "Willemstad", "Kingstown", "Apia", "Port Vila", "Monaco", "Banjul", "Tarawa", "Oranjestad", "Victoria", "Gibraltar", "Saint Helier", "George Town", "Douglas", "Papeete", "Ramallah", "Majuro", "Andorra", "St. John's", "Peter Port", "Belmopan", "Nuuk", "Roseau", "Basseterre", "Mariehamn", "Charlotte Amalie", "Palikir", "Road Town", "St. George's", "Valletta", "Marigot", "Saint-Pierre", "Avarua", "Vaduz", "San Marino", "Funafuti", "Cockburn Town", "Gustavia", "Stanley", "Longyearbyen", "Philipsburg", "Mata-Utu", "Hamilton"];

module.exports = AppView = (function(superClass) {
  extend(AppView, superClass);

  function AppView() {
    return AppView.__super__.constructor.apply(this, arguments);
  }

  AppView.prototype.el = "body.application";

  AppView.prototype.template = function() {
    return require("./templates/home");
  };

  AppView.prototype.initialize = function() {
    return this.router = PiourCozyOWM.Routers.AppRouter = new AppRouter();
  };

  AppView.prototype.afterRender = function() {
    this.citiesView = new CitiesView({
      collection: new CityCollection
    });
    return this.loadCities();
  };

  AppView.prototype.events = {
    "submit #search": "cityFind",
    "click #refresh": "refresh",
    "click .random-choice": "addRandomCity"
  };

  AppView.prototype.displayRandom = function() {
    var i, len, name, num, ref, results;
    $(".random-choice").remove();
    ref = [1, 2, 3];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      num = ref[i];
      name = capitals[Math.floor(Math.random() * capitals.length)];
      results.push($.getJSON("cities/" + name, function(data) {
        var newCity, tmpl;
        tmpl = require("./templates/random");
        newCity = $(tmpl(new City(data).attributes));
        newCity.hide();
        $("#random-choices").append(newCity);
        return newCity.show("slow");
      }));
    }
    return results;
  };

  AppView.prototype.loadCities = function() {
    this.displayRandom();
    this.setLoading();
    return this.citiesView.collection.fetch({
      reset: true,
      success: (function(_this) {
        return function() {
          return _this.unSetLoading();
        };
      })(this),
      error: (function(_this) {
        return function() {
          _this.unSetLoading();
          return alert("impossible to retrieve weather informations");
        };
      })(this)
    });
  };

  AppView.prototype.addCity = function(name) {
    var cityObj;
    this.setLoading();
    cityObj = {
      "name": name
    };
    return this.citiesView.collection.create(cityObj, {
      "wait": true,
      "success": (function(_this) {
        return function() {
          return _this.unSetLoading();
        };
      })(this),
      "error": (function(_this) {
        return function() {
          _this.unSetLoading();
          return alert("impossible to add weather informations for " + name);
        };
      })(this)
    });
  };

  AppView.prototype.cityFind = function(evt) {
    var city;
    city = this.$el.find("input.city");
    this.addCity(city.val());
    return false;
  };

  AppView.prototype.refresh = function(evt) {
    this.loadCities();
    return false;
  };

  AppView.prototype.addRandomCity = function(evt) {
    var current, name;
    current = $(evt.currentTarget);
    name = current.find(".random-choice-name").text();
    this.addCity(name);
    return false;
  };

  AppView.prototype.setLoading = function() {
    return $("body").addClass("loading");
  };

  AppView.prototype.unSetLoading = function() {
    return $("body").removeClass("loading");
  };

  return AppView;

})(View);

});

;require.register("views/cities_view", function(exports, require, module) {
var CitiesView, CityView, ViewCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ViewCollection = require('../lib/view_collection');

CityView = require('./city_view');

module.exports = CitiesView = (function(superClass) {
  extend(CitiesView, superClass);

  function CitiesView() {
    return CitiesView.__super__.constructor.apply(this, arguments);
  }

  CitiesView.prototype.el = "#cities";

  CitiesView.prototype.itemview = CityView;

  return CitiesView;

})(ViewCollection);

});

;require.register("views/city_view", function(exports, require, module) {
var CityView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require("../lib/base_view");

module.exports = CityView = (function(superClass) {
  extend(CityView, superClass);

  function CityView() {
    return CityView.__super__.constructor.apply(this, arguments);
  }

  CityView.prototype.className = "city row";

  CityView.prototype.tagName = "li";

  CityView.prototype.events = {
    "click .now-remove": "removeCity"
  };

  CityView.prototype.template = function() {
    var data, template;
    template = require("./templates/city");
    data = this.getRenderData().model;
    if (data) {
      if (!data.hotness) {
        this.model.initialize();
        data = this.getRenderData().model;
      }
      return template(data);
    }
  };

  CityView.prototype.removeCity = function() {
    this.fromClick = true;
    return this.model.destroy({
      error: (function(_this) {
        return function() {
          return alert("impossible to remove " + _this.model.get("name"));
        };
      })(this)
    });
  };

  CityView.prototype.remove = function() {
    var el;
    el = this.$el;
    if (this.fromClick) {
      el.hide("slow", function() {
        return el.remove();
      });
      return this.fromClick = false;
    } else {
      return el.remove();
    }
  };

  return CityView;

})(View);

});

;require.register("views/templates/city", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ "class": ('now') + ' ' + ("col-md-offset-1 col-md-5 col-lg-3 weather-" + (weather.icon) + " temp-" + (hotness) + "") }, {"class":true}));
buf.push('><div class="now-title"><div');
buf.push(attrs({ 'title':("" + (country) + ""), "class": ('now-name') }, {"title":true}));
buf.push('>' + escape((interp = name) == null ? '' : interp) + '</div><div class="now-description">' + escape((interp = weather.description) == null ? '' : interp) + '</div><div title="remove" class="now-remove"><img src="icons/remove.svg" alt="remove"/></div></div><div class="now-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (wiclass) + "") }, {"class":true}));
buf.push('></span></div><div class="now-infos"><div class="now-temp">' + escape((interp = temp) == null ? '' : interp) + '°</div><div class="now-humidity"> <img src="icons/humidity.svg" alt="humidity"/> ' + escape((interp = humidity) == null ? '' : interp) + '%</div></div></div><div class="today col-md-5 col-lg-2">');
// iterate hours
;(function(){
  if ('number' == typeof hours.length) {

    for (var index = 0, $$l = hours.length; index < $$l; index++) {
      var time = hours[index];

buf.push('<div');
buf.push(attrs({ "class": ('time') + ' ' + ("weather-" + (time.weather.icon) + " temp-" + (time.hotness) + " index-" + (index) + "") }, {"class":true}));
buf.push('><div class="time-hour">' + escape((interp = time.hour) == null ? '' : interp) + '</div><div class="time-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (time.wiclass) + "") }, {"class":true}));
buf.push('></span></div><strong class="time-temp">' + escape((interp = time.temp) == null ? '' : interp) + '°</strong><div class="time-humidity">' + escape((interp = time.humidity) == null ? '' : interp) + '%</div></div>');
    }

  } else {
    var $$l = 0;
    for (var index in hours) {
      $$l++;      var time = hours[index];

buf.push('<div');
buf.push(attrs({ "class": ('time') + ' ' + ("weather-" + (time.weather.icon) + " temp-" + (time.hotness) + " index-" + (index) + "") }, {"class":true}));
buf.push('><div class="time-hour">' + escape((interp = time.hour) == null ? '' : interp) + '</div><div class="time-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (time.wiclass) + "") }, {"class":true}));
buf.push('></span></div><strong class="time-temp">' + escape((interp = time.temp) == null ? '' : interp) + '°</strong><div class="time-humidity">' + escape((interp = time.humidity) == null ? '' : interp) + '%</div></div>');
    }

  }
}).call(this);

buf.push('</div><div class="week col-lg-6"><div class="pad hidden-xs col-md-1 hidden-lg"></div><div class="days row">');
// iterate days
;(function(){
  if ('number' == typeof days.length) {

    for (var index = 0, $$l = days.length; index < $$l; index++) {
      var day = days[index];

buf.push('<div class="pad col-xs-1 hidden-md hidden-lg"></div><div');
buf.push(attrs({ "class": ('day') + ' ' + ("col-xs-10 col-md-2 weather-" + (day.weather.icon) + " temp-" + (day.hotness) + " index-" + (index) + "") }, {"class":true}));
buf.push('><div class="day-name">' + escape((interp = day.name) == null ? '' : interp) + '</div><div class="day-date">' + escape((interp = day.date) == null ? '' : interp) + '</div><div class="day-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (day.wiclass) + "") }, {"class":true}));
buf.push('></span></div><div class="day-description">' + escape((interp = day.weather.description) == null ? '' : interp) + '</div><div title=temperature during night="title=temperature during night" class="day-temp">' + escape((interp = day.night) == null ? '' : interp) + '°</div><strong title=temperature during day="title=temperature during day" class="day-temp">' + escape((interp = day.day) == null ? '' : interp) + '°</strong></div>');
    }

  } else {
    var $$l = 0;
    for (var index in days) {
      $$l++;      var day = days[index];

buf.push('<div class="pad col-xs-1 hidden-md hidden-lg"></div><div');
buf.push(attrs({ "class": ('day') + ' ' + ("col-xs-10 col-md-2 weather-" + (day.weather.icon) + " temp-" + (day.hotness) + " index-" + (index) + "") }, {"class":true}));
buf.push('><div class="day-name">' + escape((interp = day.name) == null ? '' : interp) + '</div><div class="day-date">' + escape((interp = day.date) == null ? '' : interp) + '</div><div class="day-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (day.wiclass) + "") }, {"class":true}));
buf.push('></span></div><div class="day-description">' + escape((interp = day.weather.description) == null ? '' : interp) + '</div><div title=temperature during night="title=temperature during night" class="day-temp">' + escape((interp = day.night) == null ? '' : interp) + '°</div><strong title=temperature during day="title=temperature during day" class="day-temp">' + escape((interp = day.day) == null ? '' : interp) + '°</strong></div>');
    }

  }
}).call(this);

buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("views/templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="content"><div id="add-head"><div class="row"><div class="left hidden-xs hidden-sm col-md-2"><img src="images/sun-cloud.svg"/></div><h1 class="col-md-4">Cozy <strong>Weather </strong>Forecast<img id="refresh" src="icons/refresh.svg"/></h1><div class="right hidden-xs hidden-sm col-md-2"><img src="images/cloud.svg"/></div><form id="search" class="col-xs-offset-1 col-xs-10 col-md-offset-0 col-md-3"><label><strong>Add a new city </strong>to your forecast</label><div class="input-group"><input placeholder="Paris, fr" class="city form-control"/><div class="input-group-addon"><img src="icons/search.svg" alt="search"/></div></div><p class="help-block">Tip: To ensure the location, add the country code after the city name (for ex: Paris, fr)</p></form></div></div><div id="loader" class="loader-inner ball-pulse"><div></div><div></div><div></div><p>Loading weather, please wait ...</p></div><ul id="cities"></ul><div id="random"><p class="row">Click to add to your cozy forecast ...</p><div id="random-choices" class="row"><div class="hidden-xs col-md-1 col-lg-3"></div></div></div><div id="footer"> \ndata from <a href="https://openweathermap.org" target="_blank">OpenWeatherMap </a>-\nicons from <a href="https://erikflowers.github.io/weather-icons/" target="_blank">Erik Flowers</a></div></div>');
}
return buf.join("");
};
});

;require.register("views/templates/random", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ "class": ('random-choice') + ' ' + ("col-xs-offset-1 col-xs-10 col-md-offset-0 col-md-3 col-lg-2 weather-" + (weather.icon) + " temp-" + (hotness) + "") }, {"class":true}));
buf.push('><div');
buf.push(attrs({ 'title':("" + (country) + ""), "class": ('random-choice-name') }, {"title":true}));
buf.push('>' + escape((interp = name) == null ? '' : interp) + '</div><div class="random-choice-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (wiclass) + "") }, {"class":true}));
buf.push('></span></div><div class="random-choice-infos"><div class="random-choice-temp">' + escape((interp = temp) == null ? '' : interp) + '°</div><div class="random-choice-humidity"> <img src="icons/humidity.svg" alt="humidity"/> ' + escape((interp = humidity) == null ? '' : interp) + '%</div></div></div>');
}
return buf.join("");
};
});

;
//# sourceMappingURL=app.js.map