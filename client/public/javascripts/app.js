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
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

City = require('../models/city');

module.exports = CityCollection = (function(_super) {

  __extends(CityCollection, _super);

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
var _ref, _ref1, _ref2, _ref3, _ref4;

if ((_ref = this.PiourCozyOWM) == null) {
  this.PiourCozyOWM = {};
}

if ((_ref1 = PiourCozyOWM.Routers) == null) {
  PiourCozyOWM.Routers = {};
}

if ((_ref2 = PiourCozyOWM.Views) == null) {
  PiourCozyOWM.Views = {};
}

if ((_ref3 = PiourCozyOWM.Models) == null) {
  PiourCozyOWM.Models = {};
}

if ((_ref4 = PiourCozyOWM.Collections) == null) {
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
    var console, dummy, method, methods, _results;
    console = window.console = window.console || {};
    method = void 0;
    dummy = function() {};
    methods = 'assert,count,debug,dir,dirxml,error,exception,\
                   group,groupCollapsed,groupEnd,info,log,markTimeline,\
                   profile,profileEnd,time,timeEnd,trace,warn'.split(',');
    _results = [];
    while (method = methods.pop()) {
      _results.push(console[method] = console[method] || dummy);
    }
    return _results;
  })();
})();

});

;require.register("lib/base_view", function(exports, require, module) {
var BaseView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseView = (function(_super) {

  __extends(BaseView, _super);

  function BaseView() {
    return BaseView.__super__.constructor.apply(this, arguments);
  }

  BaseView.prototype.template = function() {};

  BaseView.prototype.initialize = function() {};

  BaseView.prototype.getRenderData = function() {
    var _ref;
    return {
      model: (_ref = this.model) != null ? _ref.toJSON() : void 0
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
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('lib/base_view');

module.exports = ViewCollection = (function(_super) {

  __extends(ViewCollection, _super);

  function ViewCollection() {
    this.removeItem = __bind(this.removeItem, this);

    this.addItem = __bind(this.addItem, this);
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
    if (!(this.collectionEl != null)) {
      this.collectionEl = this.el;
      return this.$collectionEl = $(this.collectionEl);
    }
  };

  ViewCollection.prototype.render = function() {
    var id, view, _ref;
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
      view.$el.detach();
    }
    return ViewCollection.__super__.render.apply(this, arguments);
  };

  ViewCollection.prototype.afterRender = function() {
    var id, view, _ref;
    this.$collectionEl = $(this.collectionEl);
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
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
    var id, view, _ref;
    _ref = this.views;
    for (id in _ref) {
      view = _ref[id];
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
var City,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = City = (function(_super) {

  __extends(City, _super);

  function City() {
    this.fmtCityDaysForecastInfos = __bind(this.fmtCityDaysForecastInfos, this);

    this.fmtCityForecastInfos = __bind(this.fmtCityForecastInfos, this);

    this.fmtCityWeatherInfos = __bind(this.fmtCityWeatherInfos, this);
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

  City.prototype.fmtCityWeatherInfos = function() {
    var clouds, main, main_weather, name, sys, toSet, weather;
    toSet = {};
    weather = this.get("weather");
    if (weather) {
      main = weather.main;
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
      if (sys) {
        toSet.country = sys.country;
      }
      name = weather.name;
      if (name) {
        toSet.name = name;
      }
    }
    return this.set(toSet);
  };

  City.prototype.toReadableHour = function(value) {
    return value.split(" ")[1].slice(0, 5);
  };

  City.prototype.toReadableDate = function(value) {
    var date;
    date = new Date(0);
    date.setUTCSeconds(value);
    return "" + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  };

  City.prototype.fmtCityForecastInfos = function() {
    var forecast, hour, next5, nextHour, now, _i, _len;
    next5 = [];
    forecast = this.get("hours");
    if (forecast) {
      forecast = forecast.list;
      now = new Date().getTime();
      if (forecast) {
        for (_i = 0, _len = forecast.length; _i < _len; _i++) {
          hour = forecast[_i];
          if (hour.dt * 1000 >= now) {
            nextHour = {};
            nextHour.hour = this.toReadableHour(hour.dt_txt);
            nextHour.temp = this.toRoundCelcius(hour.main.temp);
            nextHour.humidity = hour.main.humidity;
            nextHour.weather = hour.weather[0];
            next5.push(nextHour);
          }
          if (next5.length >= 5) {
            break;
          }
        }
      }
    }
    return this.set("hours", next5);
  };

  City.prototype.fmtCityDaysForecastInfos = function() {
    var day, forecast, next5, nextDay, _i, _len;
    next5 = [];
    forecast = this.get("days");
    if (forecast) {
      forecast = forecast.list;
      if (forecast) {
        for (_i = 0, _len = forecast.length; _i < _len; _i++) {
          day = forecast[_i];
          nextDay = {};
          nextDay.date = this.toReadableDate(day.dt);
          nextDay.day = this.toRoundCelcius(day.temp.day);
          nextDay.night = this.toRoundCelcius(day.temp.night);
          nextDay.humidity = day.humidity;
          nextDay.weather = day.weather[0];
          next5.push(nextDay);
        }
      }
    }
    return this.set("days", next5);
  };

  return City;

})(Backbone.Model);

});

;require.register("routers/app_router", function(exports, require, module) {
var AppRouter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = AppRouter = (function(_super) {

  __extends(AppRouter, _super);

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
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require("../lib/base_view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

CityCollection = require('../collections/city_collection');

module.exports = AppView = (function(_super) {

  __extends(AppView, _super);

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
    var _this = this;
    this.citiesView = new CitiesView({
      collection: new CityCollection
    });
    this.setLoading();
    return this.citiesView.collection.fetch({
      success: function() {
        return _this.unSetLoading();
      },
      error: function() {
        _this.unSetLoading();
        return alertUser("impossible to retrieve weather informations");
      }
    });
  };

  AppView.prototype.events = {
    "submit #search": "cityFind",
    "submit #refresh": "refresh"
  };

  AppView.prototype.cityFind = function(evt) {
    var city, cityObj,
      _this = this;
    city = this.$el.find("input.city");
    cityObj = {
      "name": city.val()
    };
    this.citiesView.collection.create(cityObj, {
      error: function() {
        return alertUser("impossible to add weather informations for " + city.val());
      }
    });
    return false;
  };

  AppView.prototype.refresh = function(evt) {
    var _this = this;
    this.setLoading();
    this.citiesView.collection.fetch({
      reset: true,
      success: function() {
        return _this.unSetLoading();
      },
      error: function() {
        _this.unSetLoading();
        return alertUser("impossible to retrieve weather informations");
      }
    });
    return false;
  };

  AppView.prototype.setLoading = function() {
    this.$el.find("button").toggleClass("btn-default");
    return this.$el.find("button").toggleClass("btn-warning");
  };

  AppView.prototype.unSetLoading = function() {
    this.$el.find("button").toggleClass("btn-default");
    return this.$el.find("button").toggleClass("btn-warning");
  };

  return AppView;

})(View);

});

;require.register("views/cities_view", function(exports, require, module) {
var CitiesView, CityView, ViewCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ViewCollection = require('../lib/view_collection');

CityView = require('./city_view');

module.exports = CitiesView = (function(_super) {

  __extends(CitiesView, _super);

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
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require("../lib/base_view");

module.exports = CityView = (function(_super) {

  __extends(CityView, _super);

  function CityView() {
    return CityView.__super__.constructor.apply(this, arguments);
  }

  CityView.prototype.className = "city";

  CityView.prototype.tagName = "li";

  CityView.prototype.events = {
    "click .remove": "deleteCity"
  };

  CityView.prototype.template = function() {
    var template;
    template = require("./templates/city");
    return template(this.getRenderData());
  };

  CityView.prototype.deleteCity = function() {
    var _this = this;
    return this.model.destroy({
      success: function() {
        return _this.remove();
      },
      error: function() {
        return alertUser("impossible to remove " + _this.model.get("name"));
      }
    });
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
buf.push('<div class="row panel panel-warning"><div class="row"><div class="main col-xs-2"><div><div class="label label-default">Now</div></div><div><div title="temperature" class="label label-info temp">' + escape((interp = model.temp) == null ? '' : interp) + '°</div><div title="humidity" class="label label-info humidity">' + escape((interp = model.humidity) == null ? '' : interp) + '%</div></div>');
if ( model.weather)
{
buf.push('<div');
buf.push(attrs({ 'title':("" + (model.weather.description) + ""), "class": ('weather') }, {"title":true}));
buf.push('><img');
buf.push(attrs({ 'alt':("" + (model.weather.main) + ""), 'src':("icons/" + (model.weather.icon) + ".png") }, {"alt":true,"src":true}));
buf.push('/></div>');
}
buf.push('<div><span title="remove" class="remove">&times;</span><div');
buf.push(attrs({ 'title':("" + (model.country) + ""), "class": ('name') + ' ' + ('label') + ' ' + ('label-warning') }, {"title":true}));
buf.push('>' + escape((interp = model.name) == null ? '' : interp) + '</div></div></div>');
if ( model.hours)
{
// iterate model.hours
;(function(){
  if ('number' == typeof model.hours.length) {

    for (var $index = 0, $$l = model.hours.length; $index < $$l; $index++) {
      var hour = model.hours[$index];

buf.push('<div class="hour col-xs-2"><div><div class="label label-default">' + escape((interp = hour.hour) == null ? '' : interp) + '</div></div><div><div class="label label-info temp"><span title="temperature">' + escape((interp = hour.temp) == null ? '' : interp) + '°</span></div>');
if ( hour.humidity)
{
buf.push('<div title="humidity" class="label label-info humidity">' + escape((interp = hour.humidity) == null ? '' : interp) + '%</div>');
}
buf.push('</div>');
if ( hour.weather)
{
buf.push('<div');
buf.push(attrs({ 'title':("" + (hour.weather.description) + ""), "class": ('weather') }, {"title":true}));
buf.push('><img');
buf.push(attrs({ 'alt':("" + (hour.weather.main) + ""), 'src':("icons/" + (hour.weather.icon) + ".png") }, {"alt":true,"src":true}));
buf.push('/></div>');
}
buf.push('</div>');
    }

  } else {
    var $$l = 0;
    for (var $index in model.hours) {
      $$l++;      var hour = model.hours[$index];

buf.push('<div class="hour col-xs-2"><div><div class="label label-default">' + escape((interp = hour.hour) == null ? '' : interp) + '</div></div><div><div class="label label-info temp"><span title="temperature">' + escape((interp = hour.temp) == null ? '' : interp) + '°</span></div>');
if ( hour.humidity)
{
buf.push('<div title="humidity" class="label label-info humidity">' + escape((interp = hour.humidity) == null ? '' : interp) + '%</div>');
}
buf.push('</div>');
if ( hour.weather)
{
buf.push('<div');
buf.push(attrs({ 'title':("" + (hour.weather.description) + ""), "class": ('weather') }, {"title":true}));
buf.push('><img');
buf.push(attrs({ 'alt':("" + (hour.weather.main) + ""), 'src':("icons/" + (hour.weather.icon) + ".png") }, {"alt":true,"src":true}));
buf.push('/></div>');
}
buf.push('</div>');
    }

  }
}).call(this);

}
buf.push('</div>');
if ( model.days)
{
buf.push('<div class="row days"><div class="day col-xs-2"></div>');
// iterate model.days
;(function(){
  if ('number' == typeof model.days.length) {

    for (var $index = 0, $$l = model.days.length; $index < $$l; $index++) {
      var day = model.days[$index];

buf.push('<div class="day col-xs-2"><div><div class="label label-default">' + escape((interp = day.date) == null ? '' : interp) + '</div></div><div><div class="label label-info temp"><span title="temperature in night">' + escape((interp = day.night) == null ? '' : interp) + '° / </span><span title="temperature in day">' + escape((interp = day.day) == null ? '' : interp) + '°</span></div>');
if ( day.humidity)
{
buf.push('<div title="humidity" class="label label-info humidity">' + escape((interp = day.humidity) == null ? '' : interp) + '%</div>');
}
buf.push('</div>');
if ( day.weather)
{
buf.push('<div');
buf.push(attrs({ 'title':("" + (day.weather.description) + ""), "class": ('weather') }, {"title":true}));
buf.push('><img');
buf.push(attrs({ 'alt':("" + (day.weather.main) + ""), 'src':("icons/" + (day.weather.icon) + ".png") }, {"alt":true,"src":true}));
buf.push('/></div>');
}
buf.push('</div>');
    }

  } else {
    var $$l = 0;
    for (var $index in model.days) {
      $$l++;      var day = model.days[$index];

buf.push('<div class="day col-xs-2"><div><div class="label label-default">' + escape((interp = day.date) == null ? '' : interp) + '</div></div><div><div class="label label-info temp"><span title="temperature in night">' + escape((interp = day.night) == null ? '' : interp) + '° / </span><span title="temperature in day">' + escape((interp = day.day) == null ? '' : interp) + '°</span></div>');
if ( day.humidity)
{
buf.push('<div title="humidity" class="label label-info humidity">' + escape((interp = day.humidity) == null ? '' : interp) + '%</div>');
}
buf.push('</div>');
if ( day.weather)
{
buf.push('<div');
buf.push(attrs({ 'title':("" + (day.weather.description) + ""), "class": ('weather') }, {"title":true}));
buf.push('><img');
buf.push(attrs({ 'alt':("" + (day.weather.main) + ""), 'src':("icons/" + (day.weather.icon) + ".png") }, {"alt":true,"src":true}));
buf.push('/></div>');
}
buf.push('</div>');
    }

  }
}).call(this);

buf.push('</div>');
}
buf.push('</div>');
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
buf.push('<div id="content" class="container"><h2>Weather forecast for Cozy</h2><div class="row"><form id="search" role="form" class="col-xs-8 well"><input name="city" id="city-name" placeholder="Type the name of a city and press enter (or name,country code to ensure country. For ex. paris,fr)" title="Type the name of a city and press enter (or name,country code to ensure country. For ex. paris,fr)" type="text" class="form-control city"/></form><form id="refresh" class="col-xs-1"><button title="refresh" class="btn btn-default glyphicon glyphicon-refresh"></button></form></div><div class="alerts"></div><ul id="cities" class="list-unstyled"></ul></div><div id="footer" class="container"><small class="well well-small pull-right"><p><a href="http://openweathermap.org/">weather data from OpenWeatherMap</a></p><p><a href="http://d3stroy.deviantart.com/art/SILq-Weather-Icons-356609017">icons from ~d3stroy</a></p></small></div>');
}
return buf.join("");
};
});

;require.register("views/templates/widget", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="content" class="container"><ul id="cities" class="list-unstyled"></ul></div>');
}
return buf.join("");
};
});

;require.register("views/widget_view", function(exports, require, module) {
var AppRouter, AppView, CitiesView, City, CityCollection, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require("../lib/base_view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

CityCollection = require("../collections/city_collection");

module.exports = AppView = (function(_super) {

  __extends(AppView, _super);

  function AppView() {
    return AppView.__super__.constructor.apply(this, arguments);
  }

  AppView.prototype.el = "body.widget";

  AppView.prototype.template = function() {
    return require("./templates/widget");
  };

  AppView.prototype.initialize = function() {
    return this.router = PiourCozyOWM.Routers.AppRouter = new AppRouter();
  };

  AppView.prototype.afterRender = function() {
    var _this = this;
    this.citiesView = new CitiesView({
      collection: new CityCollection
    });
    return this.citiesView.collection.fetch({
      error: function() {
        return alertUser("impossible to retrieve weather informations");
      }
    });
  };

  AppView.prototype.events = {
    "click": function() {
      var intent;
      intent = {
        action: 'goto',
        params: "piour-owm/"
      };
      return window.parent.postMessage(intent, window.location.origin);
    }
  };

  return AppView;

})(View);

});

;
//# sourceMappingURL=app.js.map