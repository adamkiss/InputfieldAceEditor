class Editor
  constructor: (@config) ->
    @setup_html()
    @setup_ace()


  setup_html: ->
    @$textarea = $("##{@config.id}").hide()
    @$toolarea = @$textarea.siblings(".#{_c.part.tools}")
    @$ace = $('<div/>')
      .attr('id', "#{@config.id}_ace")
      .data('for', "##{@config.id}")
      .insertAfter(@$toolarea)
      .addClass(_c.size.normal.class) # TODO: configurable font size
      .height(@config.rows * _c.size.normal.line_height)
      .text(@$textarea.val())


  setup_ace: ->
    @ace = ace.edit @$ace.attr 'id'

    @$measure_node = $ '>div:not([class])', @$ace
    @$measure_node.addClass _c.part.measure_node

    @ace.getSession().setMode ("ace/mode/"+@config.mode)
    @ace.setTheme("ace/theme/pw-light")
    @ace.setShowInvisibles(@config.f_invisible_characters)
    @$ace.addClass _c.options.focus_mode if @config.f_focus_mode is 1

    @ace.getSession().setUseWrapMode true
    @ace.getSession().setWrapLimitRange null
    @ace.setShowPrintMargin false
    @ace.renderer.setShowGutter true
    @ace.setSelectionStyle 'text'
    @ace.setShowFoldWidgets true
    @ace.setHighlightActiveLine false

    @setup_hooks()


  setup_hooks: =>
    @ace.on 'blur', (e) =>
      @$textarea.val @ace.getValue().replace /\s+$/g, ""

    @ace.on 'changeSelection', (e) =>
      @highlight_active_line

  @get_active_line_index: ->
    @ace.getCursorPosition().row - @ace.getFirstVisibleRow()

  highlight_line: (index) ->
    $('.ace_line_group', @$ace)
      .removeClass(_c.status.active)
      .eq(index)
      .addClass(_c.status.active)

  highlight_active_line: ->
    @highlight_line @get_active_line_index()
