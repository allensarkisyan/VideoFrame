/*!
HTML5 - Video frame precision capturing
Version: 0.0.1
(c) 2012 Allen Sarkisyan - Released under the Open Source MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights 
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished 
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
var VideoFrame = function(id, rate, callback) {
	var video, frameRate, self = this;
	var args = arguments, len = args.length;
	if (len > 0) {
		if (len === 2 && typeof parseFloat(args[1]) === 'number') { // id was passed, id, frameRate

		} else if (len === 2 && typeof parseFloat(args[0]) === 'number') { // id was not passed, frameRate and callback

		} else if (len === 1 && typeof args[0] === 'string' && typeof parseFloat(args[0]) !== 'number') { // only id was passed

		} else if (len === 1 && typeof parseFloat(args[0]) === 'number') { // only frameRate was passed

		}

		for (var i in args) {
			console.log(args[i]);
			if (typeof args[i] === 'string') {
				video = document.getElementById(args[i]) || document.getElementsByTagName('video')[0];
			} else if (typeof args[i] === 'number') {
				frameRate = args[i];
			}
		}
		console.log('Getting video from local var video: ');
		console.log(video);
		console.log('Getting frame rate from local var frameRate: ' + frameRate);
	}
	return {
		options : {
			id : (document.getElementById(id) || document.getElementsByTagName('video')[0]),
			frameRate: (rate || 24)
		},
		get : function() {
			var video = this.options.id;
			console.log( (video.currentTime * this.options.frameRate).toPrecision(5) );
			return callback || this;
		}
	};
};
*/

var web = 29.97 * 60;
var film = 24 * 60;
var pal = 25 * 60;


// Object approach
var VideoFrame = function(options) {
	var obj = options || {};
	var frameRate = obj.frameRate || 24;
	var video = document.getElementById(obj.id) || document.getElementsByTagName('video')[0];
	return {
		get : function() {
			var frame = (video.currentTime * frameRate).toPrecision(5);
			console.log(frame);
			return obj.callback ? obj.callback(frame) : this;
		}
	};
};

VideoFrame({
	id : 'videoPlayer_html5_api',
	frameRate: 24,
	callback : function(response) {
		console.log('callback response: ' + response);
	}
});


// Prototype approach
var VideoFrame = function(options) {
	this.obj = options || {};
	this.frameRate = this.obj.frameRate || 24;
	this.video = document.getElementById(this.obj.id) || document.getElementsByTagName('video')[0];
};

VideoFrame.prototype = {
	get : function() {
		var frame = (this.video.currentTime * this.frameRate).toPrecision(5);
		if (this.obj.callback) { this.obj.callback(frame); }
		return frame;
	},
	listen : function(tick) {
		var _video = this;
		_video.interval = setInterval(function() {
			return _video.get();
		}, (tick ? tick : 1000));
	},
	stopListen : function() {
		var _video = this;
		clearInterval(_video.interval);
	}
};

var video = new VideoFrame({
	id : 'videoPlayer_html5_api',
	frameRate: 29.97,
	callback : function(response) {
		console.log('callback response: ' + response);
	}
});













// Individual declarations
VideoFrame.prototype.get = function() {
	var frame = (this.video.currentTime * this.frameRate).toPrecision(5);
	if (this.obj.callback) { this.obj.callback(frame); }
	return frame;
};

VideoFrame.prototype.listen = function(tick) {
	var _video = this;
	_video.interval = setInterval(function() {
		return _video.get();
	}, (tick ? tick : 1000));
};

VideoFrame.prototype.stopListen = function() {
	var _video = this;
	clearInterval(_video.interval);
};
