exports.config =
    files:
        javascripts:
            joinTo:
                'javascripts/app.js': /^app/
                'javascripts/vendor.js': /^vendor/
            order:
                # Files in `vendor` directories are compiled before other files
                # even if they aren't specified in order.
                before: [
                    'vendor/javascripts/jquery-2.1.4.min.js',
                    'vendor/javascripts/underscore-1.8.3.min.js',
                    'vendor/javascripts/backbone-1.2.1.min.js',
                    'vendor/javascripts/bootstrap-3.3.4.min.js',
                ]

        stylesheets:
            joinTo: 'stylesheets/app.css'
            order:
                before: []
                after: [
                    'vendor/stylesheets/bootstrap/bootstrap-3.3.4.min.css'
                    'vendor/stylesheets/bootstrap/bootstrap-theme-3.3.4.min.css'
                    'vendor/stylesheets/weather-icons-1.3.min.css'
                    'loaders.min.css'
                    'vendor/stylesheets/helpers.css'
                ]
        templates:
            defaultExtension: 'jade'
            joinTo: 'javascripts/app.js'
