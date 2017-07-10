'use strict';

app.factory('PlantAttendPopUpService',
		function(ngDialog, $q, $filter, $timeout,PlantAttendanceService ,GenericAlertService) {
			var plantAttendPopUp;
			var service = {};

			service.getPlantAttendId = function(projId) {
				var deferred = $q.defer();
				plantAttendPopUp = ngDialog.open({
					template : 'views/timemanagement/attendance/.html',
					className : 'ngdialog-theme-plain ng-dialogueCustom1',
					controller : [
						'$scope',
						function($scope) {
						$scope.plantAttendIdDtls = [];
						$scope.getPlantAttendId = function() {
							var getPlantAttendIdReq = {
								"status" : 1,
								"projId" : projId
							};
							PlantAttendanceService
									.getPlantAttendId(getPlantAttendIdReq)
									.then(
											function(data) {
												console.log(JSON
														.stringify(data));
												$scope.plantAttendIdDtls = data.projAttendanceTOs;
											});
						},
					$scope.selectdData = function (selectdData) {                    
							ngDialog.close(selectdData);
                            var returnPopObj = {
                                "selectedAttendId": selectdData                                 
                            };
                            deferred.resolve(returnPopObj);         
					}         
				}]
			});
		return deferred.promise;
		};
	return service;
});