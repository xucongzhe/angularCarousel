## Remember to change file path  
## Inside app.js
```
require('angular');
require('angular-animate');

var carouselDirective = require('./directives/carousel/sdCarouselDirective');
var videoControlDirective = require('./directives/videoControl');

app.directive('sdCarousel', ['$interval', carouselDirective]);
app.directive('videoControl', [videoControlDirective]);

```
## Example sd-carousel Tag  
```
<sd-carousel category="all" autoscroll="6000" bullets arrows></sd-carousel>

```
## Example video Tag
```
<video controls preload = "none" video-control="itemToShow.videoControl" ng-click="playVideo(itemToShow, false)" poster="{[{itemToShow.image}]}">

```
## Todo
```
Add infinite loop function
