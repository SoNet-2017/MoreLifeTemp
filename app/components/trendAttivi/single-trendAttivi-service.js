'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.trendAttivi.singleTrendAttivoService', [])

    .factory('SingleTrendAttivo', function($firebaseObject) {
        var singleTrendAttivoService= {
            getSingleTrend: function (postId) {
                var ref = firebase.database().ref().child("newtrend").child(postId);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleTrendAttivoService;
    });

