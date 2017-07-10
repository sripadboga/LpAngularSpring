'use strict';

app
		.factory(
				'CreateTimeSheetFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						CreateTimeSheetService,GenericAlertService) {
					var projEmpPopup;
					var service = {};
					service.empPopupDetails = function(actionType,
							editTimeSheet) {
						var deferred = $q.defer();
						projEmpPopup = ngDialog
								.open({

									template : 'views/timemanagement/timesheet/createtimesheet/createstaffpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedEmp = [];
												$scope.addTimeSheet =[];
												$scope.editTimeSheet =[];
												$scope.addCrew =[];
												$scope.empPopupDetails=[];
												$scope.staffList = [];
												
												if (actionType === 'Add') {
													$scope.staffList
															.push({
																'selected':false, 
																'employeeID' : null,
																'firstName' : null,
																'surName' : null,
																'tradeName' : null,
																'category' : null,
																'status' : 1
															});
												} else {
													$scope.staffList = angular
															.copy(editTimeSheet);
													editTimeSheet = [];
												}
												
												
												var createTimeSheetService = {};
												$scope.staffDetails = function(
														staff) {
													var empPopup = createTimeSheetService
															.getStaffDetails();
													projEmpPopup
															.then(
																	function(
																			data) {
																		tab.projEmpClassTO = data.projEmpClassTO;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting project employee class Details",
																						'Error');
																	});
												}
												createTimeSheetService.getStaffDetails = function() {
													var deferred = $q.defer();
													ngDialog
															.open({
																template : 'views/timemanagement/timesheet/createtimesheet/emppopup.html',
																closeByDocument : false,
																showClose : true,
																controller : [
																		'$scope',
																		function(
																				$scope) {

																			$scope.projEmpDetails = [];

																			$scope.getProjEmpDetail = function() {
																				var req = {
																					"status" : 1,
																					"projId" : $rootScope.projId
																				}
																				CreateTimeSheetService
																						.getProjEmpClasses(
																								req)
																						.then(
																								function(
																										data) {
																									$scope.projEmpDetails = data.projEmpClassTOs;
																								});
																			}
																			$scope.projEmpPopUp = function(
																					projEmpClassTO) {
																				var returnProjEmpClassTO = {
																					"projEmpClassTO" : projEmpClassTO
																				};
																				deferred
																						.resolve(returnProjEmpClassTO);
																				$scope
																						.closeThisDialog();

																			}
																		} ]
															});
													return deferred.promise;
												}

												
												$scope.addCrew=function(actionType){
													var deferred = $q.defer();
													ngDialog
															.open({
																template : 'views/timemanagement/timesheet/createtimesheet/crewpopup.html',
																closeByDocument : false,
																showClose : true,
																controller : [
																		'$scope',
																		function(
																				$scope) {

																			$scope.crewDetails = [];

																			$scope.getCrewDetails = function() {
																				var req = {
																					
																				}
																				CreateTimeSheetService
																						.getCrewDetails(
																								req)
																						.then(
																								function(
																										data) {
																									$scope.projEmpDetails = data.projEmpClassTOs;
																								});
																			}
																			$scope.crewPopUp = function(
																					projEmpClassTO) {
																				var returnProjEmpClassTO = {
																					"projEmpClassTO" : projEmpClassTO
																				};
																				deferred
																						.resolve(returnProjEmpClassTO);
																				$scope
																						.closeThisDialog();

																			}
																		} ]
															});
													return deferred.promise;
												}

												
												
												
														$scope.addRows = function() {

															$scope.staffList
																	.push({
																		'selected':false, 
																		'projId' : $scope.projId,
																		'employeeID' : null,
																		'firstName' : null,
																		'surName' : null,
																		'tradeName' : null,
																		'category' : null,
																		'status' : 1

																	});
														},
														$scope.saveStaff = function() {
															var req = {
																"projManpowerTOs" : $scope.staffList,
																"projId" : $scope.projId
															}
															CreateTimeSheetService
																	.saveStaffEmp(
																			req)
																	.then(
																			function(
																					data) {

																				var succMsg = GenericAlertService
																						.alertMessage(
																								'Manpower Details are saved Successfully',
																								'Info');
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Manpower Details  are failed to save',
																								"Error");
																			});
															ngDialog.close();
														},

														$scope.staffPopUpRowSelect = function(
																staff) {
															if (staff.selected) {
																selectedEmp
																		.push(staff);
															} else {
																selectedEmp
																		.pop(staff);
															}
														},
														$scope.deleteProjRows = function() {
															if (selectedEmp.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedEmp.length < $scope.staffList.length) {
																angular
																		.forEach(
																				selectedEmp,
																				function(
																						value,
																						key) {
																					$scope.staffList
																							.splice(
																									$scope.staffList
																											.indexOf(value),
																									1);
																					
																				});
																selectedEmp = [];
																GenericAlertService
																.alertMessage(
																		'Rows are deleted Successfully',
																		"Info");
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
											} ]

								});
						return deferred.promise;
					}
					return service;
				});