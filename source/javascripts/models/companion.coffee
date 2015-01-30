class App.Models.Companion extends Backbone.Model

  initialize: (attributes, options) ->
    @origin =
      atk: attributes.atk
      life: attributes.life
    @setLevelMode("zero")
    @origin.dps = @get('dps')
    @origin.mdps = @get('mdps')

  calcF: ->
    @f ||= 1.8 + 0.1 * @get("type")

  # 零觉满级
  calcMaxLv: (value) ->
    Math.floor(value * @calcF())

  # 满觉满级
  calcMaxLvAndGrow: (value) ->
    f = @calcF()
    rare = @get("rare")
    levelPart = Math.floor(value * f)
    growPart = Math.floor(value * (f - 1) / (19 + 10 * rare)) *
      5 * (if rare == 1 then 5 else 15)
    levelPart + growPart

  setLevelMode: (mode) ->
    switch mode
      when "zero"
        atk = @origin.atk
        life = @origin.life
      when "mxlv"
        atk = @calcMaxLv(@origin.atk)
        life = @calcMaxLv(@origin.life)
      when "mxlvgr"
        atk = @calcMaxLvAndGrow(@origin.atk)
        life = @calcMaxLvAndGrow(@origin.life)

    dps = atk / @get("aspd")
    mdps = dps * @get("anum")

    @set("atk", atk)
    @set("life", life)
    @set("dps", dps)
    @set("mdps", mdps)

  imageUrl: (type) ->
    "data/companions/#{type}/#{@id}.png"

  thumbnailUrl: ->
    @imageUrl("thumbnail")

  originalUrl: ->
    @imageUrl("original")

  getString: (strs, key) ->
    strs[@get(key) - 1]

  getRareString: ->
    @getString(["★", "★★", "★★★", "★★★★", "★★★★★"], "rare")

  getElementKey: ->
    @getString(["fire", "aqua", "wind", "light", "dark"], "element")

  getTypeString: ->
    @getString(["早熟", "平均", "晚成"], "type")

  getElementPolygonPointsString: (l, r) ->
    es = [@get("fire"), @get("aqua"), @get("wind"), @get("light"), @get("dark")]
    c = { x: l/2, y: l/2 }
    ps = _.map [0..4], (i) ->
      a = (i * 72 - 90) * (Math.PI * 2) / 360
      { x: c.x+Math.cos(a)*r*es[i], y: c.y+Math.sin(a)*r*es[i] }
    App.Utils.SVG.getPolygonPointsString(ps)
