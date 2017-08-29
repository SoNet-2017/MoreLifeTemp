
'use strict';

angular.module('myApp.trendAttivi', [
    'myApp.trendAttivi.trendAttivoListService',
    'myApp.trendAttivi.singleTrendAttivoService',
    'myApp.trendAttivi.trendAttivoService'
])

    .value('version', '0.1');