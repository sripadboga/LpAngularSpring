'use strict';
app
		.factory(
				'ManpowerFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, CreateWorkDiaryService,
						ManpowerWageFactorFactory, EmpRegisterPopUpService,
						ProjectCrewPopupService) {
					var manpowerFactoryPopup;
					var service = {};
					service.manpowerFactoryPopup = function(actionType,
							editMans, projId,workDairyCostCodeList) {
						var deferred = $q.defer();
						manpowerFactoryPopup = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/manpowerpopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addMans = [];
												var selectedMan = [];
												$scope.action = actionType;
												$scope.crewLabelKeyTO = {
													"id" : null,
													"code" : null,
													"name" : null

												}
																							
														$scope.getManPowerCrewList = function() {
															var crewReq = {
																"status" : 1,
																"projId" : projId

															};
															var crewSerivcePopup = ProjectCrewPopupService
																	.getCrewPopup(crewReq);
															crewSerivcePopup
																	.then(
																			function(
																					data) {
																				// console.log(JSON.stringify(data.projCrewTO.code));
																				$scope.crewLabelKeyTO.id = data.projCrewTO.id;
																				$scope.crewLabelKeyTO.code = data.projCrewTO.code;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting Crew List Details",
																								'Error');
																			});
														},
												$scope.getWageFactor = function(wageFactorLabelKeyTO) {

													var wagePopup = [];
													wagePopup = ManpowerWageFactorFactory
															.wageFactorDetailsList();
													wagePopup
															.then(
																	function(
																			data) {
																		 console.log(JSON.stringify( data.employeeWageRateTO.name));
																		wageFactorLabelKeyTO.id = data.employeeWageRateTO.id;
																		wageFactorLabelKeyTO.name = data.employeeWageRateTO.name;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting WageFactor Details",
																						'Error');
																	});
												}
												if (actionType === 'Add') {
													$scope.addMans
															.push({
																"select" : false,
																"resourceId" : '',
																"empRegLableKeyTO" : {
																	"code" : null,
																	"firstName" : null,
																	"lastName" : null
																	
																	
																},
																"wageFactorLabelKeyTO" : {
																		"id" : null,
																		"code" : null,
																		"name" : null

																	},
															
																"workDairyCostCodeList" : null,
																"total1" : '',
																
																"workDairyCostCodeList" : null,
																"total2" : '',
																"totalAndIdle" : null,
																"comments" : null,
																"approvalPerson" : null
															});
												} else {
													$scope.addMans = angular
															.copy(editMans);
													editMans = [];
												}
											
												$scope.addEmployeeRegDetails = function(empRegLableKeyTO) {
													var empPopup = [];
													
													empPopup = EmpRegisterPopUpService
															.getEmpRegisters();
													empPopup
															.then(
																	function(
																			data) {
																		//console.log(JSON.stringify(data.empRegisterDtlTO.name));
																		
																		empRegLableKeyTO.code = data.empRegisterDtlTO.code;
																		empRegLableKeyTO.firstName = data.empRegisterDtlTO.firstName;
																		empRegLableKeyTO.lastName = data.empRegisterDtlTO.lastName;
																		
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while gettting  Employee Data",
																						'Error');
																	});
												}
												

														$scope.addManpowerDetails = function() {
															$scope.addMans
																	.push({
																		"select" : false,
																		"resourceId" : '',
																		"empRegLableKeyTO" : {
																			"code" : null,
																			"firstName" : null,
																			"lastName" : null
																			
																			
																		},
																		"wageFactorLabelKeyTO" : {
																				"id" : null,
																				"code" : null,
																				"name" : null

																			},
																	
																		"workDairyCostCodeList" : null,
																		"total1" : '',
																		
																		"workDairyCostCodeList" : null,
																		"total2" : '',
																		"totalAndIdle" : null,
																		"comments" : null,
																		"approvalPerson" : null

																	});
														},
														
														$scope.manpowerPopupRowSelect = function(
																man) {
															if (man.select) {
																selectedMan
																		.push(man);
															} else {
																selectedMan
																		.pop(man);
															}
														},
														$scope.deleteManpowerRows = function() {
															if (selectedMan.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedMan.length < $scope.addMans.length) {
																angular
																		.forEach(
																				selectedMan,
																				function(
																						value,
																						key) {
																					$scope.addMans
																							.splice(
																									$scope.addMans
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedMan = [];
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
													/*	$scope.deleteManpowerRows = function() {
															deleteManPowerDtlds=[];
															var tempManpowerRequest = [];
															var flag = false;
															angular
																	.forEach(
																			$scope.WorkdairyEmpDtlTOs,
																			function(
																					value,
																					key) {
																				if (!value.select) {
																					tempManpowerRequest
																							.push(value);
																				} else {
																					if (value.id > 0) {
																						deleteManPowerDtlds
																								.push(value.id);
																					}
																					flag = true;
																				}
																			});
															if (!flag) {
																GenericAlertService
																		.alertMessage(
																				"please select records to delete",
																				"Warning");

															}
															$scope.WorkdairyEmpDtlTOs = tempManpowerRequest;
														},*/
												$scope.saveManpowerDetails = function() {
													var req = {
															"workDairyEmpDtlTOs" : $scope.workDairyEmpDtlTOs
															
													}
													console.log(JSON.stringify(req));
													CreateWorkDiaryService
															.saveManpowers(req)
															.then(
																	function(
																			data) {
																		
																		$scope.workDairyEmpDtlTOs = data.workDairyEmpDtlTOs
																		
																		GenericAlertService.alertMessage("Success","Info");
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'ManpowerUtilisation Details are Failed to Save ',
																						"Warning");
																	});
													
												}
										
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
