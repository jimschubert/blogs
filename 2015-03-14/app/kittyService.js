(function () {
    'use strict';
    var module = angular.module('myApp.services', []);

    module.provider('kittyService', function KittyServiceProvider() {
        var height = 100,
            width = 100;

        this.setHeight = function (h) {
            height = h;
        };
        this.setWidth = function (w) {
            width = w;
        };

        this.$get = [function () {
            var service = {};

            service.getUrl = function () {
                return 'http://placekitten.com/g/' + width + '/' + height;
            };

            // This can be any valid return that you'd normally use
            // with module.service or module.factory
            return service;
        }];
    });
})();