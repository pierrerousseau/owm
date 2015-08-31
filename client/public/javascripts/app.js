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
var AppRouter, AppView, CitiesView, City, CityCollection, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require("../lib/base_view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

CityCollection = require('../collections/city_collection');

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
    "click .random-choice": "addRandomCity",
    "click .search": "showHelper"
  };

  AppView.prototype.displayRandom = function() {
    var capitals, i, len, name, num, ref, results;
    $(".random-choice").remove();
    capitals = $("#capitals option");
    ref = [1, 2, 3];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      num = ref[i];
      name = capitals[Math.floor(Math.random() * capitals.length)].value;
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
buf.push(attrs({ "class": ('now') + ' ' + ("col-md-6 col-lg-3 weather-" + (weather.icon) + " temp-" + (hotness) + "") }, {"class":true}));
buf.push('><div class="now-title row"><div');
buf.push(attrs({ 'title':("" + (country) + ""), "class": ('now-name') + ' ' + ("col-xs-6") }, {"class":true,"title":true}));
buf.push('>' + escape((interp = name) == null ? '' : interp) + '</div><div class="now-description col-xs-4">' + escape((interp = weather.description) == null ? '' : interp) + '</div><div title="remove" class="now-remove col-xs-2"><img src="icons/remove.svg" alt="remove"/></div></div><div class="now-infos row"><div class="now-weather col-xs-6"><span');
buf.push(attrs({ "class": ("wi wi-" + (wiclass) + "") }, {"class":true}));
buf.push('></span></div><div class="now-temp col-xs-4">' + escape((interp = temp) == null ? '' : interp) + '°</div><div class="now-humidity col-xs-2"><img src="icons/humidity.svg" alt="humidity"/> ' + escape((interp = humidity) == null ? '' : interp) + '%</div></div></div><div class="today col-md-5 col-lg-2">');
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

buf.push('</div><div class="week col-lg-7"><div class="days row"><div class="pad hidden-xs col-lg-1"></div>');
// iterate days
;(function(){
  if ('number' == typeof days.length) {

    for (var index = 0, $$l = days.length; index < $$l; index++) {
      var day = days[index];

buf.push('<div');
buf.push(attrs({ "class": ('day') + ' ' + ("col-xs-10 col-md-2 weather-" + (day.weather.icon) + " temp-" + (day.hotness) + " index-" + (index) + "") }, {"class":true}));
buf.push('><div class="day-name">' + escape((interp = day.name) == null ? '' : interp) + '</div><div class="day-date">' + escape((interp = day.date) == null ? '' : interp) + '</div><div class="day-weather"><span');
buf.push(attrs({ "class": ("wi wi-" + (day.wiclass) + "") }, {"class":true}));
buf.push('></span></div><div class="day-description">' + escape((interp = day.weather.description) == null ? '' : interp) + '</div><div title=temperature during night="title=temperature during night" class="day-temp">' + escape((interp = day.night) == null ? '' : interp) + '°</div><strong title=temperature during day="title=temperature during day" class="day-temp">' + escape((interp = day.day) == null ? '' : interp) + '°</strong></div>');
    }

  } else {
    var $$l = 0;
    for (var index in days) {
      $$l++;      var day = days[index];

buf.push('<div');
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
buf.push('<datalist id="capitals"><option value="Paris, fr"></option><option value="Beijing, cn"></option><option value="Tokyo, jp"></option><option value="Moscow, ru"></option><option value="Seoul, kr"></option><option value="Jakarta, id"></option><option value="Tehran, ir"></option><option value="Mexico, mx"></option><option value="Lima, pe"></option><option value="Bangkok, th"></option><option value="London, gb"></option><option value="Bogota, co"></option><option value="Cairo, eg"></option><option value="Baghdad, iq"></option><option value="Hong Kong, hk"></option><option value="Dhaka, bd"></option><option value="Singapore, sg"></option><option value="Ankara, tr"></option><option value="Santiago, cl"></option><option value="Riyadh, sa"></option><option value="Kinshasa, cd"></option><option value="Berlin, de"></option><option value="Damascus, sy"></option><option value="Hanoi, vn"></option><option value="Madrid, es"></option><option value="Pyongyang, kp"></option><option value="Kabul, af"></option><option value="Addis Ababa, et"></option><option value="Buenos Aires, ar"></option><option value="Rome, it"></option><option value="Kiev, ua"></option><option value="Nairobi, ke"></option><option value="Brasília, br"></option><option value="Taipei, tw"></option><option value="Amman, jo"></option><option value="Luanda, ao"></option><option value="Pretoria, za"></option><option value="Tashkent, uz"></option><option value="Stockholm, se"></option><option value="Havana, cu"></option><option value="Phnom Penh, kh"></option><option value="Bucharest, ro"></option><option value="Baku, az"></option><option value="Caracas, ve"></option><option value="Rabat, ma"></option><option value="Vienna, at"></option><option value="Khartoum, sd"></option><option value="Budapest, hu"></option><option value="Warsaw, pl"></option><option value="Minsk, by"></option><option value="Manila, ph"></option><option value="Kampala, ug"></option><option value="Accra, gh"></option><option value="Yaoundé, cm"></option><option value="Antananarivo, mg"></option><option value="Beirut, lb"></option><option value="Algiers, dz"></option><option value="Quito, ec"></option><option value="Harare, zw"></option><option value="Doha, qa"></option><option value="Camayenne, gn"></option><option value="Kuala Lumpur, my"></option><option value="Montevideo, uy"></option><option value="Lusaka, zm"></option><option value="Bamako, ml"></option><option value="Prague, cz"></option><option value="Port-au-Prince, ht"></option><option value="Tripoli, ly"></option><option value="Kuwait City, kw"></option><option value="Belgrade, rs"></option><option value="Santo Domingo, do"></option><option value="Mogadishu, so"></option><option value="Sofia, bg"></option><option value="Brazzaville, cg"></option><option value="Brussels, be"></option><option value="Yerevan, am"></option><option value="Maputo, mz"></option><option value="Freetown, sl"></option><option value="Tbilisi, ge"></option><option value="Dakar, sn"></option><option value="Ouagadougou, bf"></option><option value="Dublin, ir"></option><option value="Monrovia, lr"></option><option value="Guatemala City, gt"></option><option value="Islamabad, pk"></option><option value="Managua, ni"></option><option value="Loikaw, mm"></option><option value="Ulaanbaatar, mn"></option><option value="Lilongwe, mw"></option><option value="Ottawa, ca"></option><option value="La Paz, bo"></option><option value="Bishkek, kg"></option><option value="Lomé, tg"></option><option value="Panama City, pa"></option><option value="Kathmandu, np"></option><option value="Amsterdam, nl"></option><option value="Zagreb, hr"></option><option value="Muscat, om"></option><option value="Niamey, ne"></option><option value="Chişinău, md"></option><option value="Jerusalem, il"></option><option value="Abuja, ng"></option><option value="Tirana, al"></option><option value="Tunis, tu"></option><option value="Ashgabat, tm"></option><option value="N\'Djamena, td"></option><option value="Tegucigalpa, hn"></option><option value="Bangui, cf"></option><option value="Athens, gr"></option><option value="Nouakchott, mr"></option><option value="Kigali, rw"></option><option value="Riga, lv"></option><option value="Kingston, jm"></option><option value="Astana, kz"></option><option value="Oslo, no"></option><option value="Helsinki, fi"></option><option value="Abu Dhabi, ae"></option><option value="Dushanbe, tj"></option><option value="Vilnius, lt"></option><option value="Libreville, ga"></option><option value="Asmara, er"></option><option value="Lisbon, pt"></option><option value="San Salvador, sv"></option><option value="Asunción, py"></option><option value="Macau, mo"></option><option value="Skopje, mk"></option><option value="Copenhagen, dk"></option><option value="Djibouti, dj"></option><option value="Yamoussoukro, ci"></option><option value="Bissau, gw"></option><option value="Bratislava, sk"></option><option value="San Juan, pr"></option><option value="Tallinn, ee"></option><option value="Bujumbura, bj"></option><option value="Sarajevo, ba"></option><option value="Wellington, nz"></option><option value="Juba, ss"></option><option value="Canberra, au"></option><option value="San José, cr"></option><option value="Port Moresby, pg"></option><option value="Vientiane, la"></option><option value="Dodoma, tz"></option><option value="Maseru, ls"></option><option value="Nicosia, cy"></option><option value="Ljubljana, si"></option><option value="Paramaribo, sr"></option><option value="Windhoek, na"></option><option value="New Delhi, in"></option><option value="Nassau, bs"></option><option value="Gaborone, bw"></option><option value="Porto-Novo, bj"></option><option value="Prishtina, xk"></option><option value="El Aaiún, eh"></option><option value="Tiraspol, md"></option><option value="Port Louis, mu"></option><option value="Podgorica, me"></option><option value="Manama, bh"></option><option value="Georgetown, gy"></option><option value="Praia, cv"></option><option value="Berne, ch"></option><option value="Sri Jayawardenapura Kotte, lk"></option><option value="Reykjavík, is"></option><option value="Bridgetown, bb"></option><option value="Malé, mv"></option><option value="Thimphu, bt"></option><option value="Malabo, gq"></option><option value="Nouméa, nb"></option><option value="Suva, fj"></option><option value="Mbabane, sz"></option><option value="Luxembourg, lu"></option><option value="Castries, lc"></option><option value="Saipan, mp"></option><option value="Moroni, km"></option><option value="Honiara, sb"></option><option value="Dili, tl"></option><option value="Sao Tome, st"></option><option value="Pago Pago, as"></option><option value="Willemstad, cw"></option><option value="Kingstown, vc"></option><option value="Apia, ws"></option><option value="Port Vila, vu"></option><option value="Monaco, mc"></option><option value="Banjul, gm"></option><option value="Tarawa, ki"></option><option value="Oranjestad, aw"></option><option value="Victoria, sc"></option><option value="Gibraltar, gi"></option><option value="Saint Helier, je"></option><option value="George Town, ky"></option><option value="Douglas, im"></option><option value="Papeete, pf"></option><option value="Ramallah, ps"></option><option value="Majuro, mh"></option><option value="Andorra, ad"></option><option value="St. John\'s, ca"></option><option value="Peter Port, gg"></option><option value="Belmopan, bz"></option><option value="Nuuk, gl"></option><option value="Roseau, dm"></option><option value="Basseterre, kn"></option><option value="Mariehamn, ax"></option><option value="Charlotte Amalie, vi"></option><option value="Palikir, fm"></option><option value="Road Town, vg"></option><option value="St. George\'s, gd"></option><option value="Valletta, mt"></option><option value="Marigot, mf"></option><option value="Saint-Pierre, re"></option><option value="Avarua, ck"></option><option value="Vaduz, li"></option><option value="San Marino, sm"></option><option value="Funafuti, tv"></option><option value="Cockburn Town, tc"></option><option value="Gustavia, bl"></option><option value="Stanley, fk"></option><option value="Longyearbyen, sj"></option><option value="Philipsburg, sx"></option><option value="Mata-Utu, wf"></option><option value="Hamilton, bm"></option></datalist><div id="content"><div id="add-head"><div class="row"><div class="left hidden-xs hidden-sm col-md-2"><img src="images/sun-cloud.svg"/></div><h1 class="col-md-4">Cozy <strong>Weather </strong>Forecast<img id="refresh" src="icons/refresh.svg"/></h1><div class="right hidden-xs hidden-sm col-md-2"><img src="images/cloud.svg"/></div><form id="search" class="col-xs-offset-1 col-xs-10 col-md-offset-0 col-md-3"><label><strong>Add a new city </strong>to your forecast</label><div class="input-group"><input list="capitals" type="text" placeholder="Paris, fr" class="city form-control"/><div title="The list is just here to help, if you can\'t find your city there, just type its name and press enter" class="input-group-addon search"><img src="icons/search.svg" alt="search"/></div></div><p class="help-block">Tip: To ensure the location, add the country code after the city name (for ex: Paris, fr)</p></form></div></div><div id="loader" class="loader-inner ball-pulse"><div></div><div></div><div></div><p>Loading weather, please wait ...</p></div><ul id="cities"></ul><div id="random"><p class="row">Click to add to your cozy forecast ...</p><div id="random-choices" class="row"><div class="hidden-xs col-md-1 col-lg-3 random-pad"></div></div></div><div id="footer"> \ndata from <a href="https://openweathermap.org" target="_blank">OpenWeatherMap </a>-\nicons from <a href="https://erikflowers.github.io/weather-icons/" target="_blank">Erik Flowers</a></div></div>');
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