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
var City,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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
    var forecast, hour, i, len, next5, nextHour, now;
    next5 = [];
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
    var day, forecast, i, len, next5, nextDay;
    next5 = [];
    forecast = this.get("days");
    if (forecast) {
      forecast = forecast.list;
      if (forecast) {
        for (i = 0, len = forecast.length; i < len; i++) {
          day = forecast[i];
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
    this.setLoading();
    return this.citiesView.collection.fetch({
      success: (function(_this) {
        return function() {
          return _this.unSetLoading();
        };
      })(this),
      error: (function(_this) {
        return function() {
          _this.unSetLoading();
          return alertUser("impossible to retrieve weather informations");
        };
      })(this)
    });
  };

  AppView.prototype.events = {
    "submit #search": "cityFind",
    "submit #refresh": "refresh"
  };

  AppView.prototype.cityFind = function(evt) {
    var city, cityObj;
    city = this.$el.find("input.city");
    cityObj = {
      "name": city.val()
    };
    this.citiesView.collection.create(cityObj, {
      error: (function(_this) {
        return function() {
          return alertUser("impossible to add weather informations for " + city.val());
        };
      })(this)
    });
    return false;
  };

  AppView.prototype.refresh = function(evt) {
    this.setLoading();
    this.citiesView.collection.fetch({
      reset: true,
      success: (function(_this) {
        return function() {
          return _this.unSetLoading();
        };
      })(this),
      error: (function(_this) {
        return function() {
          _this.unSetLoading();
          return alertUser("impossible to retrieve weather informations");
        };
      })(this)
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
    return this.model.destroy({
      success: (function(_this) {
        return function() {
          return _this.remove();
        };
      })(this),
      error: (function(_this) {
        return function() {
          return alertUser("impossible to remove " + _this.model.get("name"));
        };
      })(this)
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
}
return buf.join("");
};
});

;require.register("views/widget_view", function(exports, require, module) {
var AppRouter, AppView, CitiesView, City, CityCollection, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require("../lib/base_view");

AppRouter = require("../routers/app_router");

CitiesView = require("./cities_view");

City = require("../models/city");

CityCollection = require("../collections/city_collection");

module.exports = AppView = (function(superClass) {
  extend(AppView, superClass);

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
    this.citiesView = new CitiesView({
      collection: new CityCollection
    });
    return this.citiesView.collection.fetch({
      error: (function(_this) {
        return function() {
          return alertUser("impossible to retrieve weather informations");
        };
      })(this)
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