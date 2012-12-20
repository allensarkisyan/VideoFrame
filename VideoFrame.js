/*!
HTML5 - Video frame rate precision capturing
Version: 0.1.6
(c) 2012 Allen Sarkisyan - Released under the Open Source MIT License

Contributors:
Allen Sarkisyan - Lead engineer

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
	if (this === window) { return new VideoFrame(options); }
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
		return (this.video.currentTime * this.frameRate).toPrecision(5);
	},
	listen : function(format, tick) {
		var _video = this;
		if (!format) { console.log('VideoFrame: Error - The listen method requires the format parameter.'); return; }
		this.interval = setInterval(function() {
			if (_video.video.paused || _video.video.ended) { return; }
			var frame = ((format === 'SMPTE') ? _video.toSMPTE() : ((format === 'time') ? _video.toTime() : _video.get()));
			if (_video.obj.callback) { _video.obj.callback(frame, format); }
			return frame;
		}, (tick ? tick : 1000 / _video.frameRate));
	},
	stopListen : function() {
		var _video = this;
		clearInterval(_video.interval);
	},
	fps : FrameRates
};

VideoFrame.prototype.toTime = function(frames) {
	var time = (typeof frames !== 'number' ? this.video.currentTime : frames), frameRate = this.frameRate;
	var dt = (new Date()), format = 'hh:mm:ss' + (typeof frames === 'number' ? ':ff' : '');
	dt.setHours(0); dt.setMinutes(0); dt.setSeconds(0); dt.setMilliseconds(time * 1000);
	function wrap(n) { return ((n < 10) ? '0' + n : n); }
	return format.replace(/hh|mm|ss|ff/g, function(format) {
		switch (format) {
			case "hh": return wrap(dt.getHours() < 13 ? dt.getHours() : (dt.getHours() - 12));
			case "mm": return wrap(dt.getMinutes());
			case "ss": return wrap(dt.getSeconds());
			case "ff": return wrap(Math.floor(((time % 1) * frameRate)));
		}
	});
};

VideoFrame.prototype.toSMPTE = function() {
	return this.toTime(this.video.currentTime);
};

VideoFrame.prototype.toSeconds = function(SMPTE) {
	if (!SMPTE) { return Math.floor(this.video.currentTime); }
	var time = SMPTE.split(':');
	return (((Number(time[0]) * 60) * 60) + (Number(time[1]) * 60) + Number(time[2]));
};

VideoFrame.prototype.toMilliseconds = function(SMPTE) {
	return (this.toSeconds(SMPTE) * 1000);
};

VideoFrame.prototype.__seek = function(direction, frames) {
	if (!this.video.paused) { this.video.pause(); }
	var frame = Number(this.get());
	this.video.currentTime = ((((direction === 'backward' ? (frame - frames) : (frame + frames))) / this.frameRate) + 0.00001);
};

VideoFrame.prototype.seekForward = function(frames, callback) {
	if (!frames) { frames = 1; }
	this.__seek('forward', Number(frames));
	return (callback ? callback() : true);
};

VideoFrame.prototype.seekBackward = function(frames, callback) {
	if (!frames) { frames = 1; }
	this.__seek('backward', Number(frames));
	return (callback ? callback() : true);
};