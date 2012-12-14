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

    @drop_target = $('#wrap_Inputfield_images .ui-widget-content').get(0)

    @setup_hooks()


  setup_hooks: =>
    @ace.on 'blur', (e) =>
      @$textarea.val @ace.getValue().replace /\s+$/g, ""

    @ace.on 'changeSelection', (e) =>
      @highlight_active_line

    @ace.container.addEventListener 'drop', (e) =>
      # this is super crude
      dropEvt = document.createEvent "Event"
      dropEvt.initEvent "drop", true, true
      dropEvt.dataTransfer = e.dataTransfer
      @drop_target.dispatchEvent dropEvt
      @insert_files(e.dataTransfer.files)

      e.preventDefault()
      e.stopPropagation()

  @get_active_line_index: ->
    @ace.getCursorPosition().row - @ace.getFirstVisibleRow()

  highlight_line: (index) ->
    $('.ace_line_group', @$ace)
      .removeClass(_c.status.active)
      .eq(index)
      .addClass(_c.status.active)

  highlight_active_line: ->
    @highlight_line @get_active_line_index()

  file_name_to_path: (filename) =>
      sanitized_name = filename
        .replace(/'"/g, "")
        .replace(/[^a-zA-Z0-9\-]/g, "_")
        .replace(/[-_.]{2,}/, "-")
        .replace(/_png$/,'.png')
        .replace(/_gif$/,'.gif')
        .replace(/_jpg$/,'.jpg')
        .toLowerCase()
      if @config.mode is 'textile'
        "!/site/assets/files/#{$('#PageIDIndicator').text()}/#{sanitized_name}(alt)!"
      else
        "<img alt=\"alt\" src=\"#{sanitized_name}\">"

  insert_files: (files) =>
    $.each files, (i, el) =>
      path = @file_name_to_path el.name
      cursor = @ace.getCursorPosition()
      console.log @ace
      console.log cursor
      @ace.getSession().getDocument().insertInLine cursor, path
    true
