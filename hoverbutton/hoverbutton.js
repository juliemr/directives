angular.module('jd.hoverbutton', ['ngAnimate']).directive('jdHoverButton',
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
    'template': '<span>{{jdTimer}}</span>',
    link: function(scope, element, attrs) {
      var completeTimeout;
      var tickInterval = 100;

      element.on('mouseover', function() {
        scope.jdBegin();
        completeTimeout = $timeout(function tick() {
          if (scope.jdTimer < scope.jdMaxTime) {
            scope.jdTimer += tickInterval;
            completeTimeout = $timeout(tick, tickInterval);
          } else {
            scope.jdOnComplete();
          }
        }, tickInterval);
      });

      element.on('mouseout', function() {
        scope.$apply(function() {
        console.log('mouseout');
        scope.jdTimer = 0;
        $timeout.cancel(completeTimeout);
        });
      });
    }
  };
});
