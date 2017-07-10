'use strict';

app
		.factory(
				'ProjManPowerFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,ProjectSettingsService,
						ProjEmpClassService, GenericAlertService) {
					var projManPowerPopup;
					var service = {};
					service.manPowerPopupDetails = function(actionType, projId,
							editManpower) {
						var deferred = $q.defer();
						projManPowerPopup = ngDialog
								.open({

									template : 'views/projectsettings/manpowerpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedManpower = [];
												$scope.manpowerList = [];
												if (actionType === 'Add') {
													$scope.manpowerList
															.push({
																'selected':false, 
																'projId' : $scope.projId,
																'originalQty' : null,
																'revisedQty' : null,
																'actualQty' : null,
																'remainingQty' : null,
																"projEmpClassTO" : {
																	id : null,
																	code : null,
																	name : null,
																	"empClassTO" : {
																		id : null,
																		code : null,
																		name : null
																	},
																	"projEmpCatgTO" : {
																		id : null,
																		code : null,
																		name : null
																	}
																},
																'estimateComplete' : null,
																'estimateCompletion' : null,
																'startDate' : null,
																'finishDate' : null,
																'status' : 1
															});
												} else {
													$scope.manpowerList = angular
															.copy(editManpower);
													editManpower = [];
												}
												
												$scope.calcRemainingUnits = function(
														budgetObj
														) {
													if (budgetObj.revisedQty != undefined
															&& budgetObj.revisedQty > 0) {
														
														budgetObj.remainingQty = budgetObj.revisedQty
																- budgetObj.actualQty;
														return budgetObj.remainingQty;
													} else {
														budgetObj.remainingQty = budgetObj.originalQty
																- budgetObj.actualQty;
														return budgetObj.remainingQty;
													}
												}
												var manPowerService = {};
												$scope.manPowerDetails = function(
														tab) {
													var projPowerPopup = manPowerService
															.getManPowerDetails();
													projPowerPopup
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
												manPowerService.getManPowerDetails = function() {
													var deferred = $q.defer();
													ngDialog
															.open({
																template : 'views/projectsettings/tradelist.html',
																closeByDocument : false,
																showClose : true,
																controller : [
																		'$scope',
																		function(
																				$scope) {

																			$scope.projEmpClassDetails = [];

																			$scope.getProjEmpClassDetails = function() {
																				var req = {
																					"status" : 1,
																					"projId" : $rootScope.projId
																				}
																				ProjEmpClassService
																						.getProjEmpClasses(
																								req)
																						.then(
																								function(
																										data) {
																									$scope.projEmpClassDetails = data.projEmpClassTOs;
																								});
																			}
																			$scope.projEmpClassPopUp = function(
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

															$scope.manpowerList
																	.push({
																		'projId' : $scope.projId,
																		'originalQty' : '',
																		'revisedQty' : '',
																		'actualQty' : '',
																		'remainingQty' : '',
																		'estimateComplete' : '',
																		'estimateCompletion' : '',
																		'startDate' : '',
																		'finishDate' : '',
																		'status' : 1

																	});
														},
														$scope.saveManpower = function() {
															var req = {
																"projManpowerTOs" : $scope.manpowerList,
																"projId" : $scope.projId
															}
															ProjectSettingsService
																	.saveProjManpowers(
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

														$scope.manpowerPopUpRowSelect = function(
																manpower) {
															if (manpower.selected) {
																selectedManpower
																		.push(manpower);
															} else {
																selectedManpower
																		.pop(manpower);
															}
														},
														$scope.deleteProjRows = function() {
															if (selectedManpower.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedManpower.length < $scope.manpowerList.length) {
																angular
																		.forEach(
																				selectedManpower,
																				function(
																						value,
																						key) {
																					$scope.manpowerList
																							.splice(
																									$scope.manpowerList
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedManpower = [];
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