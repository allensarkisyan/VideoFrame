/*!
HTML5 - Video frame rate precision capturing
Version: 0.0.3
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

var VideoFrame = function(options) {
	this.obj = options || {};
	this.frameRate = this.obj.frameRate || 24;
	this.video = document.getElementById(this.obj.id) || document.getElementsByTagName('video')[0];
};

var FrameRates = {
	film: 24,
	NTSC : 29.97,
	NTSC_Film: 23.98,
	NTSC_HD : 59.94,
	PAL: 25,
	PAL_HD: 50,
	web: 30,
	high: 60
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
	},
	fps : FrameRates
};

// Usage
var video = new VideoFrame({
	id : 'videoPlayer_html5_api',
	frameRate: FrameRates.NTSC,
	callback : function(response) {
		console.log('callback response: ' + response);
	}
});