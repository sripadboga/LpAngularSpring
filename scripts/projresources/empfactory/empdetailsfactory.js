'use strict';
app
		.factory(
				'EmpDetailsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						EmpDesignationPopupService, EmpRegisterService,
						GenericAlertService) {
					var empDetailsFactoryPopUp;
					var service = {};
					service.empDetailsFactoryPopUp = function(data,editEmpDetails,actionType) {
						var deferred = $q.defer();
						empDetailsFactoryPopUp = ngDialog
								.open({
									template : 'views/projresources/projempreg/empdetails/empdetailspopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addEmpDetails = [];
												var ParentCompanyData = [];
												var selectedEmp = [];
												$scope.empDetails = data.empRegisterDtlTOs;
												$scope.empCompanyMap = data.empCompanyMap;
												$scope.emppocureMentCatgMap = data.emppocureMentCatgMap;
												$scope.empClassMap = data.empempClassMap;
												$scope.genderList = data.genders;
												$scope.empLocalityList = data.localites;
												$scope.employeeTypeList = data.empTypes;
												$scope.action = actionType;

												if (actionType === 'Add') {
													$scope.addEmpDetails.push({
														"selected" : false,
														"code" : null,
														"firstName" : null,
														"lastName" : null,
														"dob" : null,
														"gender" : null,
														"location" : null,
														"empStatus" : null,
														"cmpLabelKeyTO" : {
															"id" : null,
															"code" : null,
															"name" : null,
														},
														"empClssLabelKeyTO" : {
															"id" : null,
															"code" : null,
															"name" : null
														},
														"procureLabelKeyTO" : {
															"id" : null,
															"code" : null,
															"name" : null
														}
													})
												} else {
													$scope.addEmpDetails = angular
															.copy(editEmpDetails);
													editEmpDetails = [];
												}
														$scope.addRows = function() {
															$scope.addEmpDetails
																	.push({
																		"selected" : false,
																		"code" : null,
																		"firstName" : null,
																		"lastName" : null,
																		"dob" : null,
																		"gender" : null,
																		"location" : null,
																		"empStatus" : null,
																		"cmpLabelKeyTO" : {
																			"id" : null,
																			"code" : null,
																			"name" : null,
																		},
																		"empClssLabelKeyTO" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		},

																		"procureLabelKeyTO" : {
																			"id" : null,
																			"code" : null,
																			"name" : null
																		}
																	})
														},
														$scope.empDesignation = function(
																projLabelKeyTO) {
															var desgPopUpService = [];
															desgPopUpService = EmpDesignationPopupService
																	.empDesignationList(searchProject);
															desgPopUpService
																	.then(
																			function(
																					data) {
																				projLabelKeyTO.id = data.designationLabelKeyTO.id;
																				projLabelKeyTO.code = data.designationLabelKeyTO.code;
																				projLabelKeyTO.name = data.designationLabelKeyTO.name;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting Crew List Details",
																								'Error');
																			});
														}
														$scope.empDetailsPopUpRowSelect = function(
																employee) {
															if (employee.selected) {
																selectedEmp
																		.push(employee);
															} else {
																selectedEmp
																		.pop(employee);
															}
														},
														$scope.deleteRows = function() {
															if (selectedEmp.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedEmp.length < $scope.addEmpDetails.length) {
																angular
																		.forEach(
																				selectedEmp,
																				function(
																						value,
																						key) {
																					$scope.addEmpDetails
																							.splice(
																									$scope.addEmpDetails
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
												$scope.saveEmpRegisters = function() {
													var saveEmpRegReq = {
														"empRegisterTOs" : $scope.addEmpDetails,
														"status" : 1
													}
													alert(JSON
															.stringify(saveEmpRegReq));
													EmpRegisterService
															.saveEmpregisters(
																	saveEmpRegReq)
															.then(
																	function(
																			data) {
																		GenericAlertService
																				.alertMessage(
																						'Employee Registration'
																								+ data.message,
																						data.status);
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Employee Registration are Failed to Save ',
																						"Warning");
																	});
													ngDialog.close();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
