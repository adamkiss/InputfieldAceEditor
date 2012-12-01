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
  var editor = ace.edit(id+'_ace');  

  // ADD HOOK 
  // before any save occurs, put content back into textarea
  editor.on('blur', function(e) {
    $($('#'+editor.container.id).data('for')).val(editor.getValue());
  });

  // SETTINGS
  // configurable
  editor.getSession().setMode("ace/mode/"+config[id].mode);

  // non-configurable
  editor.setTheme("ace/theme/xcode");
  editor.setShowPrintMargin(false);
  editor.setShowInvisibles(true);
  editor.setFontSize('18px');
  editor.renderer.setShowGutter(false);
  editor.getSession().setUseWrapMode(true);
  editor.getSession().setWrapLimitRange(null);

  return editor;
}