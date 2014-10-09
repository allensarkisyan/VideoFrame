## VideoFrame - HTML5 Video - SMPTE Time Code capturing and Frame Seeking API - Version: 0.2.2
### (c) 2012 Allen Sarkisyan - Released under the Open Source MIT License

Contributors
==========
* Allen Sarkisyan - Lead engineer
* Paige Raynes - Product Development
* Dan Jacinto - Video Asset Quality Analyst

License
==========
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and/or distribute copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- Attribution must be credited to the original authors in derivative works.

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
* listen(format, tick) - The listen method requires the format parameter values include: (SMPTE, time, frame), the tick argument over rides the default interval set by the frame rate of the video.
* stopListen() - Clears the interval.
* toTime() - Returns the current time value in hh:mm:ss format.
* toSMPTE(frame) - Returns the current time with frame count in the SMPTE time code format hh:mm:ss:ff - Optional: Accepts a frame value for conversion to a SMPTE time code.
* toSeconds(SMPTE) - Returns the current time value in seconds - Optional: Accepts a SMPTE time code for conversion to seconds.
* toMilliseconds(SMPTE) - Returns the current time value in milliseconds - Optional: Accepts a SMPTE time code, or standard time code for conversion to milliseconds.
* toFrames(SMPTE) - Returns the frame count from a SMPTE time code.
* seekForward(frames) - Seeks forward the amount of frames declared by the frames parameter. Defaults to 1 frame.
* seekBackward(frames) - Seeks backward the amount of frames declared by the frames parameter. Defaults to 1 frame.
* seekTo(config) - Seeks to a certain SMPTE time code, standard time code, frame, second, or millisecond in the video. config example: { SMPTE: '00:01:12:22' }, { time: '00:01:12' },  { frame: 1750 }, { seconds: 72 }, { milliseconds: 72916 }

Usage
==========
Step 1) Declaration - Initial declaration is done with a configuration object.
> The configuration object takes these properties: id, and frameRate. it also provides a callback method.
* id defines the video element;
* frameRate defines the frame rate of the video source being played.
* callback defines a callback function that is called when a frame is captured.

```javascript
var video = VideoFrame({
	id : 'videoPlayer',
	frameRate: FrameRates.film,
	callback : function(response) {
		console.log('callback response: ' + response);
	}
});
```

You may also initiate VideoFrame without a configuration object if you are certain you have a HTML5 video element on the page, and the video source frame rate is 24fps.

```javascript
var video = VideoFrame();
```

Step 2) Usage - Retrieval of the current frame is done by calling the get method
* video.get() - To receive the current frame number, can't be simpler.
* video.toTime() - Retrieves the current time in hh:mm:ss format;
* video.listen(format, tick) - Polls the current video, default interval set by the frame rate Optional: override with tick argument - the format argument is required accepted values are: (SMPTE, time, frame)
* video.toSMPTE(frame) - Retrieves the current time with frame count in the SMPTE time code format hh:mm:ss:ff
* video.toSeconds(SMPTE) - Retrieves the current time in seconds - Optional: Accepts a SMPTE time code for conversion to seconds.
* video.toMilliseconds(SMPTE) - Retrieves the current time in milliseconds - Optional: Accepts a SMPTE time code, or standard time code for conversion to milliseconds.
* video.toFrames(SMPTE) - Returns the frame count from a SMPTE time code.
* video.seekForward(frames) - Seeks forward the amount of frames declared by the frames parameter. Defaults to 1 frame.
* video.seekBackward(frames) - Seeks backward the amount of frames declared by the frames parameter. Defaults to 1 frame.
* video.seekTo(config) - Seeks to a certain SMPTE time code, standard time code, frame, second, or millisecond in the video. config example: { SMPTE: '00:01:12:22' }, { time: '00:01:12' },  { frame: 1750 }, { seconds: 72 }, { milliseconds: 72916 }
