'use strict';

angular.module('myApp.recensione.recensioneListService', [])

    .factory('recensioneListService', function commonProp($firebaseArray, $firebaseObject) {

        var recensioneListService = {

            getAllRecensione: function () {
                //get the list of logged users
                var ref = firebase.database().ref().child("reviews");
                // download the data into a local object
                return $firebaseArray(ref);
            },

            getTimestamp: function (){

                var today = new Date();
                var day = today.getUTCDate();
                var month = today.getUTCMonth()+1; //January is 0!
                var year = today.getUTCFullYear();
                var hours = today.getUTCHours();
                var minutes = today.getUTCMinutes();
                var seconds = today.getUTCSeconds();

                if(day<10) {
                    day='0'+day;
                }

                if(month<10) {
                    month='0'+month;
                }
                if(hours<10) {
                    hours='0'+hours;
                }
                if(minutes<10) {
                    minutes='0'+minutes;
                }
                if(seconds<10) {
                    seconds='0'+seconds;
                }
                var currentDate = year.toString()+'/'+month.toString()+'/'+day.toString()+' '+hours.toString()+':'+minutes.toString()+':'+seconds.toString();

                return currentDate;
            }
        }

        return recensioneListService;
    });