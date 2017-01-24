

/* 
 Copyright (c) 2015.

 This file is part of Project Manager.

 Project Manager is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Project Manager is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Project Manager.  If not, see <http://www.gnu.org/licenses/>. */

appManagerMSF.directive('trackerExportDetailed', function(){
    return{
        restrict: 'E',
        controller: 'trackerExportDetailedController',
        templateUrl: 'directives/trackerexportdetailed/trackerExportDetailedView.html',
        scope: {}
    }
});

appManagerMSF.controller('trackerExportDetailedController', ["$scope",'$filter', 'commonvariable', 'EventExportService', function($scope, $filter, commonvariable, EventExportService) {

    $scope.exporting = false;
    
    //new component for datepiker helder
    $scope.today = function() {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.openstart = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedstart = true;
    };

    $scope.openend = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedend = true;
    };
    
    $scope.submit = function () {

        $scope.exporting = true;
        
        var start = $filter('date')($scope.start_date,'yyyy-MM-dd');
        var end = $filter('date')($scope.end_date,'yyyy-MM-dd');

        var orgUnits = commonvariable.OrganisationUnitList;
        console.log(orgUnits);

        EventExportService.exportEventsWithDependenciesInZip(start, end, orgUnits)
            .then(function (eventsZipFile) {
                saveAs(eventsZipFile, $scope.file_name + '.zip');
            })
            .finally(function () {
                $scope.exporting = false;
            });
    }
}]);