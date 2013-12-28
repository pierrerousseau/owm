# App Namespace
# Change `CozyApp` to your app's name
@PiourCozyOWM            ?= {}
PiourCozyOWM.Routers     ?= {}
PiourCozyOWM.Views       ?= {}
PiourCozyOWM.Models      ?= {}
PiourCozyOWM.Collections ?= {}

$ ->
    # Load App Helpers
    require '../lib/app_helpers'

    # Initialize App
    if window.location.href.match "widget.html"
        PiourCozyOWM.Views.appView = new AppView = require 'views/widget_view'
        PiourCozyOWM.Views.appView.render()
    else
        PiourCozyOWM.Views.appView = new AppView = require 'views/app_view'
        PiourCozyOWM.Views.appView.render()

    # Initialize Backbone History
    Backbone.history.start pushState: yes
