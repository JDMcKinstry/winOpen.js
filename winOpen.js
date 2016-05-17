/*	winOpen()	*/
;(function() {	//	 alternate way to call for new window as well as maintain a list (use to winOpen.getList())
	var defaultSpecs = {	// predefined specs filter
			channelmode: 	'channelmode=no',	//	yes|no|1|0	Whether or not to display the window in theater mode. Default is no. IE only
			directories: 	'directories=yes',	//	yes|no|1|0	Whether or not to add directory buttons. Default is yes. IE only
			fullscreen: 	'fullscreen=no',	//	yes|no|1|0	Whether or not to display the browser in full-screen mode. Default is no. A window in full-screen mode must also be in theater mode. IE only
			height: 		'height=100',	//	pixels	The height of the window. Min. value is 100
			left: 			'left=0',	//	pixels	The left position of the window
			location: 		'location=yes',	//	yes|no|1|0	Whether or not to display the address field. Default is yes
			menubar: 		'menubar=yes',	//	yes|no|1|0	Whether or not to display the menu bar. Default is yes
			resizable: 		'resizable=yes',	//	yes|no|1|0	Whether or not the window is resizable. Default is yes
			scrollbars: 	'scrollbars=yes',	//	yes|no|1|0	Whether or not to display scroll bars. Default is yes
			status: 		'status=yes',	//	yes|no|1|0	Whether or not to add a status bar. Default is yes
			titlebar: 		'titlebar=yes',	//	yes|no|1|0	Whether or not to display the title bar. Ignored unless the calling application is an HTML Application or a trusted dialog box. Default is yes
			toolbar: 		'toolbar=yes',	//	yes|no|1|0	Whether or not to display the browser toolbar. Default is yes
			top: 			'top=0',	//	pixels	The top position of the window. IE only
			width: 			'width=100'	//	pixels	The width of the window. Min. value is 100
		},
		list = [];
	
	function clone(a) { if (null == a || "object" != typeof a) return a; var c = a.constructor(), b; for (b in a) a.hasOwnProperty(b) && (c[b] = a[b]); return c; };
	
	function joinObj() {
		var obj = [], str = "", ret = [],
			args = Array.prototype.slice.call(arguments, 0);
		for (var x in args) switch (typeof args[x]) {
			case 'object':
				obj[x] = args[x];
				break;
			case 'string':
				str = args[x];
				break;
		}
		for (var y in obj) {
			var ob = obj[y]
			for (var z in obj[y]) if (obj[y].hasOwnProperty(z)) switch (typeof obj[y][z]) {
				case "string":
					ret.push(obj[y][z]);
					break;
				case "object":
					var a = joinObj(obj[y][z], str);
					if (a) ret.push(a);
					break;
				default:
					if (obj[y][z]['valueOf']) ret.push(obj[y][z].valueOf());
			}
		}
		return ret ? ret.join(str) : "";
	}
	
	function matchUrl(url) {
		var	regMatch = void 0,
			araLabels = "url scheme authority path query fragment".split(" "),
			regUrl = /^(([^\:\/\?\#]+)\:)?(\/\/([^\/\?\#]*))?([^\?\#]*)(\?([^\#]*))?(\#(.*))?/,
			retVal = {
				url: null,
				scheme: null, authority: null,
				path: null, query: null,
				fragment: null, valid: null
			};
		"string" === typeof url && "" != url && (regMatch = url.match(regUrl));
		if ("object" === typeof regMatch) for (x in regMatch) araLabels[x] && (retVal[araLabels[x]] = regMatch[x]);
		retVal.scheme && retVal.authority && (retVal.valid = !0);
		return retVal
	};
	
	function winOpen() {
		var args = Array.prototype.slice.call(arguments, 0),
			url, name, specs = {}, replace = void 0;
		
		//	first check if obj.includeDefaults was passed to include defaults (if true)
		for (var x in args) if (typeof args[x] == 'object' && args[x]['includeDefaults']) specs = clone(defaultSpecs);
		
		for (var x in args) {	//	get url and name if provided
			if (!url || !name) {	// window name could be passed as 2nd string or in object
				if (args[x] && typeof args[x] == 'string') {
					if (!url && matchUrl(args[x])['valid']) url = args[x];
					if ((!name && !matchUrl(args[x])['valid']) || url && args[x] != url) name = args[x];
				}
				else if (typeof args[x] == 'object') {
					var ax = args[x];
					if (!url && ax.hasOwnProperty('url') && matchUrl(ax['url'])['valid'])  url = ax['url'];
					if (!name && ax.hasOwnProperty('name') && ax['name']) name = ax['name'];
					for (var y in ax) if (/boolean|number|string/.test(typeof ax[y]) && defaultSpecs[y]) specs[y] = y + '=' + (typeof ax[y] == 'boolean' ? (ax[y]==true?'yes':'no') : ax[y]);
					
				}// finally check replace param
				else if (typeof args[x] == 'boolean' && void 0 == replace) replace = args[x];
			}
			else break;
		}
		
		specs = joinObj(specs, ",");
		
		var newWin, newWinArgs = [];
		
		if (url) newWinArgs.push(url);
		if (name) newWinArgs.push(name);
		if (typeof specs == 'string' && specs) newWinArgs.push(specs);
		if (replace) newWinArgs.push(replace);
		
		newWin = window.open.apply(window, newWinArgs);
		newWin.winOpen = {
			index: list.length,
			url: url,
			name: name,
			specs: specs,
			replace: replace
		}
		list.push(newWin);
		
		newWin.onbeforeunload = function() { list.splice(this.winOpen.index, 1); }
		
		return newWin;
	}
	
	winOpen.getList = function(index) {
		if (typeof index == 'number' && list[index]) return list[index];
		return list;
	}
	
	//	add as global variable
	window.hasOwnProperty("winOpen")||(window.winOpen=winOpen);
	
	//	add as a jQuery extension
	if (window.hasOwnProperty('jQuery') && jQuery && !jQuery['winOpen']) {
		jQuery.extend({
			winOpen: function() {
				var args = Array.prototype.slice.call(arguments, 0);
				return winOpen.apply(this, args);
			}
		});
		jQuery.winOpenList = function(index) {
			if (typeof index == 'number' && list[index]) return list[index];
			return list;
		}
	}
})();
