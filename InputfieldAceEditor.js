var _line_height = 28;

// init+run
$(document).ready(function(){

  //iterate over ace fields
  if (config.InputfieldAceEditor){
    var editors = [];

    $.each(config.InputfieldAceEditor, function(i, el){
      duplicate(el);
      editors[el] = setup(el);
    });
  }
});

// duplicate textarea => ACE div
function duplicate(id){
  // create our div copy of textarea for ACE
  $textarea =
    $('#'+id)
      .hide();
  $acetools =
    $textarea.siblings('.ace-editor-tools');
  $ace =
    $('<div/>')
      .attr('id', id+'_ace')
      .data('for', '#'+id)
      .insertAfter($acetools)
      .text($textarea.val()); 
  return id+'_ace'; 
}

// setup ace
function setup(id){
  // CREATE EDITOR
  var editor_id = id+'_ace';
  var editor = ace.edit(editor_id);
  var $editor = $('#'+editor_id);
  var $measure_node = $('>div:not([class])', $editor);

  // SETTINGS
  // configurable
    editor.getSession().setMode("ace/mode/"+config[id].mode);
    $editor
      .addClass('setting-size-normal')
      .height(config[id].rows * _line_height)
    editor.setTheme("ace/theme/pw-light");

    // look and feel
    // invisible characters
    editor.setShowInvisibles(config[id].f_invisible_characters);

    // focus mode
    if (config[id].f_focus_mode===1) $editor.addClass('focus-mode');

  // non-configurable
    // add class to hack custom font/size/line-height
    $measure_node.addClass('hack_ace_measure_node');

    // wrapping
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange(null);
    
    // look and feel
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(true);
    editor.setSelectionStyle('text');
    editor.setShowFoldWidgets(true);
    editor.setHighlightActiveLine(false);

  // HOOKS
  // before any save occurs, put content back into textarea
  editor.on('blur', function(e) {
    $($('#'+editor.container.id).data('for')).val(editor.getValue());
  });

  editor.on('changeSelection', function(e){
    var active_line = getActiveLineIndex(editor);
    setActiveLine($editor, active_line);
  });

  return editor;
}

function getActiveLineIndex(editor){
  return editor.getCursorPosition().row - editor.getFirstVisibleRow();
}

function setActiveLine($editor, index){
  $('.ace_line_group', $editor)
    .removeClass('ace_line_group_active')
  .eq(index)
    .addClass('ace_line_group_active');
}

function setActiveGutterLine($editor, index){
    // gutters were turned off
    $('.ace_gutter-cell', $editor)
      .removeClass('ace_line_gutter_active')
    .eq(index)
      .addClass('ace_line_gutter_active');
}