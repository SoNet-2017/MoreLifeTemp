'use strict';

angular.module('myApp.trend.trendService', [])

    .factory('Trend', function($firebaseArray) {
        var trendService = {
            getDataTrend: function () {
                var ref = firebase.database().ref().child("trends");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return trendService;
    });
