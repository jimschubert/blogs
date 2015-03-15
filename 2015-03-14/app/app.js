'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.version',
    'myApp.services'
])
.controller('View1Ctrl', ['$scope', 'kittyService', function ($scope, kittyService) {
    $scope.kittycat = kittyService.getUrl();
}])
.config(['kittyServiceProvider', function (kittyServiceProvider) {
    var widths = [200,300,400,500,600];
    var heights = [300,400,500,600,700];
    kittyServiceProvider.setHeight(heights[Math.floor(Math.random()*heights.length)]);
    kittyServiceProvider.setWidth(widths[Math.floor(Math.random()*widths.length)]);
}]);
