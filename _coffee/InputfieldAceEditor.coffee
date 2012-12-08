# @codekit-prepend "modules/constants"
# @codekit-prepend "modules/editor"

$ ->
	if config.InputfieldAceEditor
		editors = []
		$.each config.InputfieldAceEditor, (i, el) ->
			editors[el] = new Editor config[el]