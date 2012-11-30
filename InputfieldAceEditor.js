$(document).ready(function(){

  // create our div copy of textarea for ACE
  $textarea =
    $('#Inputfield_body')
      .hide();
  $pre =
    $('<div/>')
      .attr('id', 'Inputfield_body_pre')
      .data('for','#Inputfield_body')
      .insertAfter($textarea)
      .text($textarea.val());

  // create editor
  var editor = ace.edit("Inputfield_body_pre");  

  // add hook 
  // before any save occurs, put content back into textarea
  editor.on('blur', function(e) {
    $($('#'+editor.container.id).data('for')).val(editor.getValue());
  });

  // set settings (whoa!)
  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/html");
});