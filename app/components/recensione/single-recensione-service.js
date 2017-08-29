'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myApp.recensione.singleRecensioneService', [])

    .factory('SingleRecensione', function($firebaseObject) {
        var singleRecensioneService= {
            getSingleRecensione: function (postId) {
                var ref = firebase.database().ref().child("reviews").child(postId);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleRecensioneService;
    });

