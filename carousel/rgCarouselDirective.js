module.exports = function($interval) {
  return {
    restrict : 'E',
    templateUrl : 'themes/fullsite/assets/js/directives/carousel/rgCarousel-template.html',
    link : function(scope, element, attrs) {
      var carouselItems = require('../../json/carouselItems.json');
      var category = attrs.category;
      var videos = [];

      scope.isAutoScroll = false;
      scope.carouselIndex = 0;
      scope.autoscroll = initAttribute('autoscroll',attrs.autoscroll);
      scope.arrows = initAttribute('arrows',attrs.arrows);
      scope.bullets = initAttribute('bullets',attrs.bullets);

      if(category == 'all'){
       scope.items = angular.copy(carouselItems);
      }else{
       scope.items = _.where(carouselItems, { "mediaCategory" : category });
      }

      startWatchers();
      init();

      function init(){
        if(scope.autoscroll != 'false'){
          startAutoScroll();
        }

      }
 
      function startAutoScroll(){  
        if(scope.isAutoScroll == false){
            var itemsLength = scope.items.length;
            var scrollInterval = 5000;

            if(!isNaN(parseFloat(scope.autoscroll)) && parseFloat(scope.autoscroll) > 2000){
              scrollInterval = scope.autoscroll;
            }

            scope.autoScrollInterval = $interval(function(){
              if(scope.carouselIndex < itemsLength-1){
                scope.carouselIndex++;
              }else{
                scope.carouselIndex = 0;
              }
          },scrollInterval);
        }
        scope.isAutoScroll = true;
      }

      function stopAutoScroll(){
        if(scope.isAutoScroll){
          $interval.cancel(scope.autoScrollInterval);
        }
        scope.isAutoScroll = false;
      }

      function carouselScrollTo(index){
        scope.carouselIndex = index;
      }

      function initAttribute(attr,value){
        var variable;
        if(attr in attrs){
          variable = value;
        }else{
          variable = 'false';
        }
        return variable;
      }

      function startWatchers() {
        scope.$watch("items", function(newV) {
          if(angular.isDefined(newV)) {
            videos = _.filter(scope.items, function(item) {
              return item.mediaType == 'vid';
            });
          } else { 
            videos = [];
          }
        });
      }

      function playVideo(media, shouldPlay) {
        media.videoControl.isPlaying = shouldPlay; 
        if(shouldPlay == true){
          stopAutoScroll();       
        }else{
          startAutoScroll();
        }
      }

      function stopVideos() {
        _.each(videos, function(video) {
          video.videoControl.isPlaying = false;   
        }); 
      }

      function applySlideChangeImpact(action) {
        stopVideos();
        startAutoScroll();
        if(action == 'previous'){
          scope.carouselIndex--; 
        }else if(action == 'next'){
          scope.carouselIndex++; 
        }
      }
      scope.playVideo = playVideo;
      scope.applySlideChangeImpact = applySlideChangeImpact;
      scope.carouselIndex = 0;
      scope.carouselScrollTo = carouselScrollTo;
    }
  };
};
 