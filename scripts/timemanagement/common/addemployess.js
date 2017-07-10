'use strict';

app
		.factory(
				'EmpRegisterPopUpService',
				function(ngDialog, $q, $filter, $timeout, EmpAttendanceService,
						GenericAlertService) {
					var empDtlsPopup;
					var service = {};

					service.getEmpRegisters = function() {
						var deferred = $q.defer();
						empDtlsPopup = ngDialog
								.open({
									template : 'views/timemanagement/common/employeedetails.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom1',
									controller : [
											'$scope',
											function($scope) {
												$scope.empDtls = [];
												var selectedEmpData = [];
														$scope.getEmpRegisters = function() {
															var req = {
																"status" : 1
															};
															EmpAttendanceService
																	.getEmpRegisters(
																			req)
																	.then(
																			function(
																					data) {
																				console
																						.log(JSON
																								.stringify(data));
																				$scope.empDtls = data.userProjDetailsTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'An error occurred while fetching Employee details',
																								"Error");
																			});
														},
														
														$scope.searchEmpId = function(empId) {
															asdfgchvhjkasedrgyhjkl
															$scope.filterEmpId = angular
																	.copy($scope.empId);
															$scope.searchResult = true;
														},
														
														$scope.popUpRowSelect = function(
																emp) {
															if (emp.select) {
																selectedEmpData
																		.push(emp);
															} else {
																selectedEmpData
																		.pop(emp);
															}
														},
														$scope.saveEmployeeDtls = function() {
															var saveEmpDtlsReq = {
																"projEmpDtlTOs" : selectedEmpData
															};
															console
																	.log(JSON
																			.stringify(saveEmpDtlsReq));
															EmpAttendanceService
																	.saveEmployeeDetails(
																			saveEmpDtlsReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Employee List(s) are saved succuessfully',
																								"Info");
																				var returnPopObj = {
																					"projEmpDtlTOs" : data.projEmpDtlTOs
																				};
																				selectedEmpData = [];
																				deferred
																						.resolve(returnPopObj);
																				$scope
																						.closeThisDialog();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Employee List(s) are failed to save',
																								"Error");
																			});
														}
											} ]
								});
						return deferred.promise;
					};
					return service;
				});