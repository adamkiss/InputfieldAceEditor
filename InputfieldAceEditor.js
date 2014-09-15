$(function() {
	if (config.InputfieldAceEditor)
		for(var i = 0; i < config.InputfieldAceEditor.length; ++i)
			(function() {
				var c = config.InputfieldAceEditor[i];

				var textarea = $("#"+ c.id);
				var editDiv = $("<div>", {
					position: "absolute",
					"class": textarea.attr("class"),
				});

				editDiv.insertBefore(textarea);
				textarea.css("display", "none");

				var editor = ace.edit(editDiv[0]);
				editor.setOptions({
					minLines: c.rows,
					maxLines: Infinity,
				});
				editor.getSession().setMode("ace/mode/"+ c.mode);
				editor.getSession().setValue(textarea.val());

				editor.getSession().on("change", function() {
					textarea.val(editor.getSession().getValue());
				});

				setTimeout(function() {
					textarea.parents(".ui-tabs").on("tabsactivate", function(){
						editor.resize();
					});
				}, 0);

			})();
});
