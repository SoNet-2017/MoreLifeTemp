
'use strict';

angular.module('myApp.articolo', [
    'myApp.articolo.articoloListService',
    'myApp.articolo.singleArticoloService',
    'myApp.articolo.articoloService'
])

    .value('version', '0.1');