#= require libs/ratchet/sliders

class App.Widgets.Slider extends Backbone.View
  events:
    "touchstart .slider": "onTouchStart"
    "touchmove .slider": "onTouchMove"
    "touchend .slider": "onTouchEnd"
    "mousedown .slider": "onMouseDown"
    "mousemove .slider": "onMouseMove"
    "mouseup .slider": "onMouseUp"

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
    @mouseIsDown = true
    @onTouchStart(@_imitateTouchEvent(event))
  onMouseMove: (event) ->
    @onTouchMove(@_imitateTouchEvent(event)) if @mouseIsDown
  onMouseUp: (event) ->
    @mouseIsDown = false
    @onTouchEnd(@_imitateTouchEvent(event))
