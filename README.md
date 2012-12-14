ACE Editor v1.0.1
=======================

## What is this?

**Better** ProcessWire text editor for developers and at least 'a little' tech savvy clients.

![Screenshot](https://raw.github.com/adamkiss/InputfieldAceEditor/master/screenshot.png)

## Features

* Syntax highlight your text, for easier preparation of content
* Nice light, readable theme
* Supports Textile, Markdown & HTML
* Mode (language/syntax) is autoselected based on used field's textformatters (last is used)
* Works with multiple fields on page, each with different settings

### Features inspired by [iA writer](http://www.iawriter.com/)

* Blue Cursor
* Focus mode

## Install Note

This modules' CSS and JS were built using sass and coffee script. If you wish to keep your PW installation as sleek as possible, go ahead and delete _sass and _ace directories from your install. However, those will be (probably) recreated if you upload via Module Manager.

## Changelog

### v1.0.1 (December 14th, 2012)

* [fix] Bug with internalization (should work now)
* [enh] Changed background slightly
* [int] Recoded everything in coffee script

### v1.0.0 (December 5th, 2012)

* [add] Added Textile mode, with huge number of enhancements
* [add] Added auto mode select (yes!)
* [add] Added PHP mode, even though there are no means to invoke that yet
* [enh] Enhanced quote rendering in markdown
* [enh] Added many styles (sup,sub,cite,code,ins,del,…)
* [fix] Fixed the default values (and saving the default values)
* [cng] Show invisibles is off as default

### v0.9.8

* [add] Added 'Show invisible characters as an option (on by default)'
* [enh] Manned up feature programming
* [fix] removed permanent option

### v0.9.7

* fix/enhancement – added minimal version check to module, which halts install for unsupported versions

### v0.9.6

* Added focus mode
* blast! unfocused lines are only 40% opacity (instead 70%)
* v0.9.6 – Fixed readme, bumped version, better screenshot

### v0.9

* added HTML theme support
* added better tag parsing
* added underlining for URLs in tags (href, src, …)

### v0.8

* added Markdown theme support
* added better handling of bold/emphasis/list elements
* vastly improved url/image syntax highlighting

### v0.7

* find the *I won't pull my hair* hack to implement custom font-size / line-height
* I added custom actvi line highlighting
* code clean up
* v0.7.1 – Replaced Liberation with Luxi, increased font size

### ~> v0.6

* Basic ACE implementation
* Liberation sans font
* Textarea callback
* This Inputfield is now configurable

## Possible future features

* Fullscreen
* Toolbar with basic tags (really)
* HTML+Tags support
* Textile+Tags support
* Markdown+Tags support
* Inline help

---

Created in 2012 by Adam Kiss • Licensed under WTFPL (http://sam.zoy.org/wtfpl/)

Built on [ACE](https://github.com/ajaxorg/ace), so all the legal mumbo-jumbo and credit goes to people that helped built it. Except the details I made better, those are all mine.