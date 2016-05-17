# winOpen.js

Use pretty much like `window.open`, except now you can esaily set the options useing an object instead.


Examples n Such
---

	//	PARAMS: A full url can be passed for URL
	//		A string name can be passed for use as window name
	//		an Object containing a list of options (optionally you can set url and name here instead if you choose)
	//		Boolean repreasenting "replace", wether or not to open a new window or replace last used one
	winOpen('full://url', 'name', { opt: 'ions' }, true);
	
	//	Simple Call
	var newWindow = winOpen();
	var nW = $.winOpen();
	
	//	Get a list of all windows opened using winOpen
	var list = winOpen.getList();
	var list = jQuery.winOpenList();
	
	// All Options  //  For all "yes|no" options, you can also use Boolean values (not stringed), whereas `true == 'yes'`
	winOpen({
		url: '',
		name: '',
		channelmode: 	'no',	//	yes|no|1|0	Whether or not to display the window in theater mode. Default is no. IE only
		directories: 	'yes',	//	yes|no|1|0	Whether or not to add directory buttons. Default is yes. IE only
		fullscreen: 	'no',	//	yes|no|1|0	Whether or not to display the browser in full-screen mode. Default is no. A window in full-screen mode must also be in theater mode. IE only
		height: 		100,	//	pixels	The height of the window. Min. value is 100
		left: 			0,	//	pixels	The left position of the window
		location: 		'yes',	//	yes|no|1|0	Whether or not to display the address field. Default is yes
		menubar: 		'yes',	//	yes|no|1|0	Whether or not to display the menu bar. Default is yes
		resizable: 		'yes',	//	yes|no|1|0	Whether or not the window is resizable. Default is yes
		scrollbars: 	'yes',	//	yes|no|1|0	Whether or not to display scroll bars. Default is yes
		status: 		'yes',	//	yes|no|1|0	Whether or not to add a status bar. Default is yes
		titlebar: 		'yes',	//	yes|no|1|0	Whether or not to display the title bar. Ignored unless the calling application is an HTML Application or a trusted dialog box. Default is yes
		toolbar: 		'yes',	//	yes|no|1|0	Whether or not to display the browser toolbar. Default is yes
		top: 			0,	//	pixels	The top position of the window. IE only
		width: 			100	//	pixels	The width of the window. Min. value is 100
	}, true);
