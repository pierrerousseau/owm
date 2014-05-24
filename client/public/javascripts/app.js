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
    CityCollection.__super__.constructor.call(this);
    this.bind("add", this.view.renderOne);
    this.bind("reset", this.view.renderAll);
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

;require.register("lib/view", function(exports, require, module) {
var View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = View = (function(_super) {

  __extends(View, _super);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.tagName = 'section';

  View.prototype.template = function() {};

  View.prototype.initialize = function() {
    return this.render();
  };

  View.prototype.getRenderData = function() {
    var _ref;
    return {
      model: (_ref = this.model) != null ? _ref.toJSON() : void 0
    };
  };

  View.prototype.render = function() {
    this.beforeRender();
    this.$el.html(this.template());
    this.afterRender();
    return this;
  };

  View.prototype.beforeRender = function() {};

  View.prototype.afterRender = function() {};

  View.prototype.destroy = function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    return Backbone.View.prototype.remove.call(this);
  };

  return View;

})(Backbone.View);

});

;require.register("lib/view_collection", function(exports, require, module) {
var View, ViewCollection, methods,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

ViewCollection = (function(_super) {

  __extends(ViewCollection, _super);

  function ViewCollection() {
    this.renderAll = __bind(this.renderAll, this);

    this.renderOne = __bind(this.renderOne, this);
    return ViewCollection.__super__.constructor.apply(this, arguments);
  }

  ViewCollection.prototype.collection = new Backbone.Collection();

  ViewCollection.prototype.view = new View();

  ViewCollection.prototype.views = [];

  ViewCollection.prototype.length = function() {
    return this.views.length;
  };

  ViewCollection.prototype.add = function(views, options) {
    var view, _i, _len;
    if (options == null) {
      options = {};
    }
    views = _.isArray(views) ? views.slice() : [views];
    for (_i = 0, _len = views.length; _i < _len; _i++) {
      view = views[_i];
      if (!this.get(view.cid)) {
        this.views.push(view);
        if (!options.silent) {
          this.trigger('add', view, this);
        }
      }
    }
    return this;
  };

  ViewCollection.prototype.get = function(cid) {
    return this.find(function(view) {
      return view.cid === cid;
    }) || null;
  };

  ViewCollection.prototype.remove = function(views, options) {
    var view, _i, _len;
    if (options == null) {
      options = {};
    }
    views = _.isArray(views) ? views.slice() : [views];
    for (_i = 0, _len = views.length; _i < _len; _i++) {
      view = views[_i];
      this.destroy(view);
      if (!options.silent) {
        this.trigger('remove', view, this);
      }
    }
    return this;
  };

  ViewCollection.prototype.destroy = function(view, options) {
    var _views;
    if (view == null) {
      view = this;
    }
    if (options == null) {
      options = {};
    }
    _views = this.filter(_view)(function() {
      return view.cid !== _view.cid;
    });
    this.views = _views;
    view.undelegateEvents();
    view.$el.removeData().unbind();
    view.remove();
    Backbone.View.prototype.remove.call(view);
    if (!options.silent) {
      this.trigger('remove', view, this);
    }
    return this;
  };

  ViewCollection.prototype.reset = function(views, options) {
    var view, _i, _j, _len, _len1, _ref;
    if (options == null) {
      options = {};
    }
    views = _.isArray(views) ? views.slice() : [views];
    _ref = this.views;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      this.destroy(view, options);
    }
    if (views.length !== 0) {
      for (_j = 0, _len1 = views.length; _j < _len1; _j++) {
        view = views[_j];
        this.add(view, options);
      }
      if (!options.silent) {
        this.trigger('reset', view, this);
      }
    }
    return this;
  };

  ViewCollection.prototype.renderOne = function(model) {
    var view;
    view = new this.view(model);
    this.$el.prepend(view.render().el);
    this.add(view);
    return this;
  };

  ViewCollection.prototype.renderAll = function() {
    this.collection.each(this.renderOne);
    return this;
  };

  return ViewCollection;

})(View);

methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex', 'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

_.each(methods, function(method) {
  return ViewCollection.prototype[method] = function() {
    return _[method].apply(_, [this.views].concat(_.toArray(arguments)));
  };
});

module.exports = ViewCollection;

});

;require.register("models/city", function(exports, require, module) {
var City,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = City = (function(_super) {

  __extends(City, _super);

  function City() {
    this.fmtCityForecastInfos = __bind(this.fmtCityForecastInfos, this);

    this.fmtCityWeatherInfos = __bind(this.fmtCityWeatherInfos, this);
    return City.__super__.constructor.apply(this, arguments);
  }

  City.prototype.urlRoot = 'cities';

  City.prototype.initialize = function() {
    this.fmtCityWeatherInfos();
    return this.fmtCityForecastInfos();
  };

  City.prototype.toRoundCelcius = function(value) {
    return parseInt(value - 273.15);
  };

  City.prototype.fmtCityWeatherInfos = function() {
    var clouds, main, name, sys, toSet, weather;
    toSet = {};
    main = this.get("main");
    if (main) {
      toSet.temp = this.toRoundCelcius(main.temp);
      toSet.humidity = main.humidity;
    }
    weather = this.get("weather");
    if (weather) {
      toSet.weather = weather[0];
    }
    clouds = this.get("clouds");
    if (clouds) {
      toSet.clouds = clouds.all;
    }
    sys = this.get("sys");
    if (sys) {
      toSet.country = sys.country;
    }
    name = this.get("name");
    if (name) {
      toSet.name = name;
    }
    return this.set(toSet);
  };

  City.prototype.toReadableDate = function(value) {
    var date;
    date = new Date(0);
    date.setUTCSeconds(value);
    return "" + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  };

  City.prototype.fmtCityForecastInfos = function() {
    var day, forecast, next5, nextDay, _i, _len;
    next5 = [];
    forecast = this.get("list");
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
var AppRouter, AppView, CitiesView, City, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require("../lib/view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

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
    this.citiesView = new CitiesView();
    return this.citiesView.collection.fetch({
      error: function() {
        return alertUser("impossible to retrieve weather informations");
      }
    });
  };

  AppView.prototype.events = {
    "submit #search": "cityFind"
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

  return AppView;

})(View);

});

;require.register("views/cities_view", function(exports, require, module) {
var CitiesView, CityCollection, CityView, ViewCollection,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ViewCollection = require('../lib/view_collection');

CityView = require('./city_view');

CityCollection = require('../collections/city_collection');

module.exports = CitiesView = (function(_super) {

  __extends(CitiesView, _super);

  function CitiesView() {
    return CitiesView.__super__.constructor.apply(this, arguments);
  }

  CitiesView.prototype.el = "#cities";

  CitiesView.prototype.view = CityView;

  CitiesView.prototype.initialize = function() {
    return this.collection = new CityCollection(this);
  };

  return CitiesView;

})(ViewCollection);

});

;require.register("views/city_view", function(exports, require, module) {
var CityView, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require("../lib/view");

module.exports = CityView = (function(_super) {

  __extends(CityView, _super);

  CityView.prototype.className = "city";

  CityView.prototype.tagName = "li";

  CityView.prototype.events = {
    "click .remove": "deleteCity"
  };

  function CityView(model) {
    this.model = model;
    CityView.__super__.constructor.call(this);
  }

  CityView.prototype.initialize = function() {
    return this.model.on("change", (function(t, evt) {
      var _ref;
      if ((_ref = this.model.attributes.weather) != null ? _ref.icon : void 0) {
        return this.render.call(this);
      } else if (this.model.attributes.weather != null) {
        return this.model.initialize();
      } else if (this.model.attributes.message) {
        return alertUser(this.model.attributes.message);
      }
    }), this);
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
buf.push('<div class="row panel panel-warning"><div class="main col-xs-2"><div><div class="label label-default">Now</div></div><div><div title="temperature" class="label label-info temp">' + escape((interp = model.temp) == null ? '' : interp) + '°</div><div title="humidity" class="label label-info humidity">' + escape((interp = model.humidity) == null ? '' : interp) + '%</div></div>');
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
if ( model.days)
{
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
buf.push('<div id="content" class="container"><h2>Weather forecast for Cozy</h2><div class="row"><form id="search" role="form" class="col-xs-6 well"><input name="city" id="city-name" placeholder="Type the name of a city and press enter" title="Type the name of a city and press enter" type="text" class="form-control city"/></form></div><div class="alerts"></div><ul id="cities" class="list-unstyled"></ul></div><div id="footer" class="container"><small class="well well-small pull-right"><p><a href="http://openweathermap.org/">weather data from OpenWeatherMap</a></p><p><a href="http://d3stroy.deviantart.com/art/SILq-Weather-Icons-356609017">icons from ~d3stroy</a></p></small></div>');
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
var AppRouter, AppView, CitiesView, City, View,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require("../lib/view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

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
    this.citiesView = new CitiesView();
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