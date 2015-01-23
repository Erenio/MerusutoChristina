#= require decorators/ratchet/sliders

class App.Widgets.Slider extends Backbone.View
  events:
    "touchstart": "onTouchStart"
    "touchmove": "onTouchMove"
    "touchend": "onTouchEnd"
    "mousedown": "onMouseDown"
    "mousemove": "onMouseMove"
    "mouseup": "onMouseUp"

  onTouchStart: (event) ->
    Ratchet.Sliders.onTouchStart(event)
  onTouchMove: (event) ->
    Ratchet.Sliders.onTouchMove(event)
  onTouchEnd: (event) ->
    Ratchet.Sliders.onTouchEnd(event)

  _imitateTouchEvent: (event) ->
    event.touches ||= [_.pick(event, "pageX", "pageY")]
    event

  onMouseDown: (event) ->
    if @mouseIsDown
      event.stopPropagation()
      event.preventDefault()
    @mouseIsDown = true
    @onTouchStart(@_imitateTouchEvent(event))
  onMouseMove: (event) ->
    @onTouchMove(@_imitateTouchEvent(event)) if @mouseIsDown
  onMouseUp: (event) ->
    @mouseIsDown = false
    @onTouchEnd(@_imitateTouchEvent(event))
