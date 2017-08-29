
'use strict';

angular.module('myApp.trend', [
    'myApp.trend.trendListService',
    'myApp.trend.singleTrendService',
    'myApp.trend.trendService'
])

    .value('version', '0.1');