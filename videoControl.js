/**
video-control directive is used to control the interactivity of a video player through an object properties
**/
module.exports = function() {
  return {
    restrict : "A",
    scope : {
      "videoControl" : "="
    },
    link : function(scope, element, attrs) {
      scope.$watch("videoControl.isPlaying", function(newV, oldV) {
        if(newV === true) {
          element.get(0).play();
        } else {
          element.get(0).pause();
        }
      });
    }
  };
};
