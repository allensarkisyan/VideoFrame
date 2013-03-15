/*
VideoFrame: HTML5 Video - SMTPE Time Code capturing and Frame Seeking API
@version 0.2.2
@author Allen Sarkisyan
@copyright (c) 2013 Allen Sarkisyan 
@license Released under the Open Source MIT License

Contributors:
Allen Sarkisyan - Lead engineer
Paige Raynes - Product Development
Dan Jacinto - Video Asset Quality Analyst

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
*/
var VideoFrame=function(a){if(this===window)return new VideoFrame(a);this.obj=a||{};this.frameRate=this.obj.frameRate||24;this.video=document.getElementById(this.obj.id)||document.getElementsByTagName("video")[0]},FrameRates={film:24,NTSC:29.97,NTSC_Film:23.98,NTSC_HD:59.94,PAL:25,PAL_HD:50,web:30,high:60};
VideoFrame.prototype={get:function(){return Math.floor(this.video.currentTime.toFixed(5)*this.frameRate)},listen:function(a,b){var c=this;a?this.interval=setInterval(function(){if(!c.video.paused&&!c.video.ended){var b="SMPTE"===a?c.toSMPTE():"time"===a?c.toTime():c.get();c.obj.callback&&c.obj.callback(b,a);return b}},b?b:1E3/c.frameRate/2):console.log("VideoFrame: Error - The listen method requires the format parameter.")},stopListen:function(){clearInterval(this.interval)},fps:FrameRates};
VideoFrame.prototype.toTime=function(a){function b(a){return 10>a?"0"+a:a}var c="number"!==typeof a?this.video.currentTime:a,e=this.frameRate,d=new Date;a="hh:mm:ss"+("number"===typeof a?":ff":"");d.setHours(0);d.setMinutes(0);d.setSeconds(0);d.setMilliseconds(1E3*c);return a.replace(/hh|mm|ss|ff/g,function(a){switch(a){case "hh":return b(13>d.getHours()?d.getHours():d.getHours()-12);case "mm":return b(d.getMinutes());case "ss":return b(d.getSeconds());case "ff":return b(Math.floor(c%1*e))}})};
VideoFrame.prototype.toSMPTE=function(a){if(!a)return this.toTime(this.video.currentTime);a=Number(a);var b=this.frameRate,c=60*b,e=(a/(3600*b)).toFixed(0),c=Number((a/c).toString().split(".")[0])%60,d=Number((a/b).toString().split(".")[0])%60;return(10>e?"0"+e:e)+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)+":"+(10>a%b?"0"+a%b:a%b)};VideoFrame.prototype.toSeconds=function(a){if(!a)return Math.floor(this.video.currentTime);a=a.split(":");return 3600*Number(a[0])+60*Number(a[1])+Number(a[2])};
VideoFrame.prototype.toMilliseconds=function(a){var b=!a?Number(this.toSMPTE().split(":")[3]):Number(a.split(":")[3]),b=1E3/this.frameRate*(isNaN(b)?0:b);return Math.floor(1E3*this.toSeconds(a)+b)};VideoFrame.prototype.toFrames=function(a){a=!a?this.toSMPTE().split(":"):a.split(":");var b=this.frameRate;return Math.floor(3600*Number(a[0])*b+60*Number(a[1])*b+Number(a[2])*b+Number(a[3]))};
VideoFrame.prototype.__seek=function(a,b){this.video.paused||this.video.pause();var c=Number(this.get());this.video.currentTime=("backward"===a?c-b:c+b)/this.frameRate+1E-5};VideoFrame.prototype.seekForward=function(a,b){a||(a=1);this.__seek("forward",Number(a));return b?b():!0};VideoFrame.prototype.seekBackward=function(a,b){a||(a=1);this.__seek("backward",Number(a));return b?b():!0};
VideoFrame.prototype.seekTo=function(a){a=a||{};var b,c=Object.keys(a)[0];if("SMPTE"==c||"time"==c)b=a[c],b=this.toMilliseconds(b)/1E3+0.0010,this.video.currentTime=b;else{switch(c){case "frame":b=this.toSMPTE(a[c]);b=this.toMilliseconds(b)/1E3+0.0010;break;case "seconds":b=Number(a[c]);break;case "milliseconds":b=Number(a[c])/1E3+0.0010}isNaN(b)||(this.video.currentTime=b)}};