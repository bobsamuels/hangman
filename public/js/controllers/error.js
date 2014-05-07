'use strict';

hangmanModule.controller('ErrorCtrl', function ($scope, hangmanService) {
    $scope.error = hangmanService.getGameError();
});