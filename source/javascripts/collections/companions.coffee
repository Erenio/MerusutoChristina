class App.Collections.Companions extends Backbone.Collection
  url: "data/companions.json"
  model: App.Models.Companion

  initialize: ->
    @comparator = (model) -> -model.get("rare")
