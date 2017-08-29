'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.trend.singleTrendService', [])

    .factory('SingleTrend', function($firebaseObject) {
        var singleTrendService= {
            getSingleTrend: function (postId) {
                var ref = firebase.database().ref().child("trends").child(postId);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };


        return singleTrendService;
    });

