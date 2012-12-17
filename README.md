## VideoFrame - HTML5 Video frame rate precision capturing - Version: 0.1.4
### (c) 2012 Allen Sarkisyan - Released under the Open Source MIT License

Contributors
==========
* Allen Sarkisyan
* Paige Raynes
* Dan Jacinto

License
==========
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

Properties
==========
the FrameRates object - the industry standard video frame rates are defined here, these properties are also available with the fps object after the video has been defined.

```javascript
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
```
* frameRate - Returns the assigned frameRate
* video - Returns the HTMLVideoElement.

Methods
==========
The methods available are get, listen, stopListen, and toTime.
* get() - Retrieves the current frame of the playing source.
* listen(tick) - The listen method gets the video frame every 1000 milliseconds, the tick argument over rides the default interval.
* stopListen() - Clears the interval.
* toTime() - Returns the current time value in hh:mm:ss format.
* toSMPTE() - Returns the current time with frame count in the SMPTE time code format hh:mm:ss:ff
* toSeconds(SMPTE) - Returns the current time value in seconds - Optional: Accepts a SMPTE time code for conversion to seconds.
* toMilliseconds(SMPTE) - Returns the current time value in milliseconds - Optional: Accepts a SMPTE time code for conversion to milliseconds.

Usage
==========
Step 1) Declaration - Initial declaration is done with a configuration object.
> The configuration object takes these properties: id, and frameRate. it also provides a callback method.
* id defines the video element;
* frameRate defines the frame rate of the video source being played.
* callback defines a callback function that is called when a frame is captured.

```javascript
var video = new VideoFrame({
	id : 'videoPlayer',
	frameRate: FrameRates.film,
	callback : function(response) {
		console.log('callback response: ' + response);
	}
});
```

You may also initiate VideoFrame without a configuration object if you are certain you have a HTML5 video element on the page, and the video source frame rate is 24fps.

```javascript
var video = new VideoFrame();
```

Step 2) Usage - Retrieval of the current frame is done by calling the get method
* To receive the current frame number, make a call to the video.get(); method, can't be simpler. - you may use your judgment when rounding the floating point remainder.
* video.toTime() - Retrieves the current time in hh:mm:ss format;
* video.toSMPTE() - Retrieves the current time with frame count in the SMPTE time code format hh:mm:ss:ff
* video.toSeconds() - Retrieves the current time in seconds - Optional: Accepts a SMPTE time code for conversion to seconds.
* video.toMilliseconds() - Retrieves the current time in milliseconds - Optional: Accepts a SMPTE time code for conversion to milliseconds.