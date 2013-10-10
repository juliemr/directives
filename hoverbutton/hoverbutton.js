angular.module('jd.hoverbutton', []).directive('jdHoverButton',
    function($timeout, $parse) {
  return {
    'restrict': 'E',
    'scope': {
      'jdTimer': '=',
      'jdMaxTime': '@',
      'jdBegin': '&',
      'jdOnComplete': '&'
    },
    'replace': true,
    'template': '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height=34 width=34>' + 
      '<circle cx="17" cy="17" r="15" stroke="black"' +
      'stroke-width="1" fill="red" fill-opacity=".5"/>' + 
      '<circle cx="17" cy="17" r="0" stroke="black" stroke-width="1" fill="black"/>' +
      '</svg>',
    link: function(scope, element, attrs) {
      var completeTimeout;
      var tickInterval = 100;

      element.on('mouseover', function() {
        scope.jdBegin();
        completeTimeout = $timeout(function tick() {
          if (scope.jdTimer < scope.jdMaxTime) {
            scope.jdTimer += tickInterval;
            completeTimeout = $timeout(tick, tickInterval);
            angular.element(element.find('circle')[1]).attr('r', 14 * scope.jdTimer / scope.jdMaxTime);
          } else {
            scope.jdOnComplete();
          }
        }, tickInterval);
      });

      element.on('mouseout', function() {
        scope.$apply(function() {
          scope.jdTimer = 0;
          angular.element(element.find('circle')[1]).attr('r', 14 * scope.jdTimer / scope.jdMaxTime);
          $timeout.cancel(completeTimeout);
        });
      });
    }
  };
});
