class App.Models.Familiar extends App.Models.Companion

  initialize: (attributes, options) ->
    @origin =
      atk: attributes.atk
      life: attributes.life
    @setLevelMode("zero")

  setLevelMode: (mode) ->
    switch mode
      when "zero"
        atk = @origin.atk
        life = @origin.life

    dps = atk / @get("aspd")
    mdps = dps * @get("anum")

    @set("atk", atk)
    @set("life", life)
    @set("dps", dps)
    @set("mdps", mdps)

  imageUrl: (type) ->
    "data/familiars/#{type}/#{@id}.png"

  getSkinString: ->
    @getString(["坚硬", "常规", "柔软"], "skin")
