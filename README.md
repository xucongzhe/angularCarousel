## Remember to change file path  
## Inside app.js
```
require('angular');
require('angular-animate');

var carouselDirective = require('./directives/carousel/rgCarouselDirective');
var videoControlDirective = require('./directives/videoControl');

app.directive('rgCarousel', ['$interval', carouselDirective]);
app.directive('videoControl', [videoControlDirective]);

```
## Example rg-carousel Tag  
```
<rg-carousel category="all" autoscroll="6000" bullets arrows></rg-carousel>

```
## Example video Tag
```
<video controls preload = "none" video-control="itemToShow.videoControl" ng-click="playVideo(itemToShow, false)" poster="{[{itemToShow.image}]}">

```
## Todo
```
Add infinite loop function