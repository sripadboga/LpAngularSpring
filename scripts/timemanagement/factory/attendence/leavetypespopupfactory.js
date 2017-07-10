'use strict';

app.factory('LeaveTypePopUpFactory',
		function(ngDialog, $q, $filter, $timeout, ProjLeaveTypeService,GenericAlertService) {
			var leaveTypesPopup;
			var service = {};

			service.getLeaveTypes = function() {
				var deferred = $q.defer();
				leaveTypesPopup = ngDialog.open({
					template : 'views/timemanagement/attendance/leavetypes.html',
					className : 'ngdialog-theme-plain ng-dialogueCustom1',
					controller : [
						'$scope',
						function($scope) {
						$scope.leaveTypes = [];
						$scope.getLeaveTypes = function(){
							var req = {
								"projId" : projId,
								"status" : 1
								};
							ProjLeaveTypeService.getProjLeaveTypes(req).then(function(data) {
									$scope.leaveTypes = data.projLeaveTypeTOs;
							},function(error){
								GenericAlertService.alertMessage('An error occurred while fetching Leave Types',"Error");
							});
						}
					$scope.selectdType = function (leaveType) {                    
						ngDialog.close(leaveTypesPopup);
						var returnPopObj = {
							"selectedLeaveType": leaveType                                 
						};
						 deferred.resolve(returnPopObj);                        
					}         
				}]
			});
		return deferred.promise;
		};
	return service;
});