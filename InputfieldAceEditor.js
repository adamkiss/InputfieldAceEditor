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
  $ace =
    $('<div/>')
      .attr('id', id+'_ace')
      .data('for', '#'+id)
      .insertAfter($textarea)
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

  // non-configurable
    // add class to hack custom font/size/line-height
    $measure_node.addClass('hack_ace_measure_node');

    // set theme
    editor.setTheme("ace/theme/pw");

    // wrapping
    editor.getSession().setUseWrapMode(true);
    editor.getSession().setWrapLimitRange(null);
    
    // look and feel
    editor.setShowPrintMargin(false);
    editor.setShowInvisibles(true);
    editor.renderer.setShowGutter(true);
    editor.setHighlightActiveLine(false);

  // HOOKS
  // before any save occurs, put content back into textarea
  editor.on('blur', function(e) {
    $($('#'+editor.container.id).data('for')).val(editor.getValue());
  });

  editor.on('changeSelection', function(e){
    $('.ace_line_group', $editor)
      .removeClass('ace_line_group_active')
    .eq(editor.selection.getCursor().row)
      .addClass('ace_line_group_active');
  });

  return editor;
}