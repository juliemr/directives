angular.module('hoverButtonExample', ['jd.hoverbutton']).controller(
  'egController', function($scope) {
    $scope.message = 'not started';

    $scope.elapsed = 0;

    $scope.doStart = function() {
      $scope.message = "started";
    };

    $scope.doComplete = function() {
      $scope.message = "done";
    };
  });
