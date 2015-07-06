# Open Weather Map application

Weather application based on the OpenWeather Map API

# To do ...

* display current weather and 14 days forcast for a stored city

# Changelog

* v0.6.1
  * update data-system access
* v0.6
  * full review of the design
* v0.5
  * display hour by hour weather for the current day (every 3 hours)
* v0.4
  * add the widget view
  * bug fix : display newly added a city
* v0.3
  * use of async
  * bug fix : stay alive when a city is not found
  * config update
  * change default port (all apps with same port may disturb cozy)
* v0.2 : use owm on server (client use causes https/http mixin)
* v0.1 : display weather for current day and the next 5 days

# Tools & resources used

* weather data from OpenWeatherMap, https://openweathermap.org/
* weather icons from Erik Flowers, https://erikflowers.github.io/weather-icons/
* loader icons from Connor Atherton, http://connoratherton.com/loaders
* stuff from bootstrap, http://getbootstrap.com/
* backbone.js, http://backbonejs.org/
* underscore.js, http://underscorejs.org/
* jquery, http://jquery.com/
* stuff from cozy.io
* please read package.json files (root and client directory) for other libs

# About Cozy

This app is suited to be deployed on the Cozy platform. Cozy is the personal
server for everyone. It allows you to install your every day web applications
easily on your server, a single place you control. This means you can manage
efficiently your data while protecting your privacy without technical skills.

More informations and hosting services on:
http://cozycloud.cc
