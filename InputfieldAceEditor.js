// init+run
$(document).ready(function(){

  //iterate over ace fields
  if (config.InputfieldAceEditor){
    $.each(config.InputfieldAceEditor, function(i, el){
      var ace_id = duplicate(el);
      setup(ace_id);
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
  // create editor
  var editor = ace.edit(id);  

  // add hook 
  // before any save occurs, put content back into textarea
  editor.on('blur', function(e) {
    $($('#'+editor.container.id).data('for')).val(editor.getValue());
  });

  // set settings (whoa!)
  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/html");
}