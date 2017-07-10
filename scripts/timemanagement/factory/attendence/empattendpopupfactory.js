'use strict';

app
		.factory(
				'EmpAttendPopUpService',
				function(ngDialog, $q, $filter, $timeout, EmpAttendanceService,
						GenericAlertService) {
					var attendancePopup;
					var service = {};

					service.getEmpAttendenceSheets = function(projId) {
						var deferred = $q.defer();
						attendancePopup = ngDialog
								.open({
									template : 'views/timemanagement/attendance/empattendancesheets.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom2',
									controller : [
											'$scope',
											function($scope) {
												$scope.empAttendenceSheets = [];
														$scope.getEmpAttendenceSheets = function() {
															var getEmpAttendReq = {
																"status" : 1,
																"projId" : projId
															};
															EmpAttendanceService
																	.getEmpAttendanceSheets(
																			getEmpAttendReq)
																	.then(
																			function(
																					data) {
																				console
																						.log(JSON
																								.stringify(data));
																				$scope.empAttendenceSheets = data.empAttendenceTOs;
																			});
														},
														$scope.selectedAttendanceId = function(
																attendanceObj) {
															var returnPopObj = {
																"attendanceObj" : attendanceObj
															};
															deferred
																	.resolve(returnPopObj);
															ngDialog
															.close();
														}
											} ]
								});
						return deferred.promise;
					};
					return service;
				});