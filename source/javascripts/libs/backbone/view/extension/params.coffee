# Params extension for Backbone.View
# 
# class Demo extends Backbone.View
#   params:
#     required: [
#       ":param"
#     ]
#     optional:
#       ":param": ":default"
#

class Backbone.View.Extension.Params

  initialize: (options) ->
    # Required parameters
    for param in @params.required
      @[param] = _.required(options, param)

    # Optional parameters
    for param, value of @params.optional
      @[param] = options[param] || value