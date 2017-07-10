'use strict';

app
		.factory(
				'EmpAttendenaceLeaveFactory',
				function(ngDialog, $q, $filter, $timeout, EmpAttendanceService,
						GenericAlertService) {
					var leaveTypesPopup;
					var service = {};

					service.getProjLeaveCodes = function(clientId) {
						var deferred = $q.defer();
						leaveTypesPopup = ngDialog
								.open({
									template : 'views/timemanagement/attendance/leavetypes.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom1',
									controller : [
											'$scope',
											function($scope) {
												$scope.leaveTypes = [];
												$scope.getLeaveTypes = function() {
													var req = {
														"clientId" : clientId,
														"status" : 1
													};
													EmpAttendanceService
															.getProjLeaveCodes(
																	req)
															.then(
																	function(
																			data) {
																		$scope.leaveTypes = data.leaveTypeTOs;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'An error occurred while fetching Leave Types',
																						"Error");
																	});
												}
												$scope.selectdType = function(
														leaveType) {
													ngDialog
															.close(leaveTypesPopup);
													var returnPopObj = {
														"projLeaveType" : leaveType
													};
													deferred
															.resolve(returnPopObj);
												}
											} ]
								});
						return deferred.promise;
					};
					return service;
				});