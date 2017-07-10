'use strict';
app
		.config(function($stateProvider) {
			$stateProvider.state("projsor", {
				url : '/projsor',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/projectlib/sor/projsor.html',
						controller : 'ProjSORController'
					}
				}
			})
		})
		.controller(
				"ProjSORController",
				function($rootScope, $scope, $q, $state, ngDialog, ProjSORService,
						ProjEmpClassService, GenericAlertService,
						UserEPSProjectService) {
					$scope.SORData = [];
					var deleteSORData = [];
					$scope.searchProject = {};
					

							$scope.getUserProjects = function() {
								var userProjectSelection = UserEPSProjectService
										.epsProjectPopup();
								userProjectSelection
										.then(
												function(userEPSProjData) {
													$scope.searchProject = userEPSProjData.selectedProject;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting EPS Project name",
																	'Error');
												});
							},
							$scope.getSORDetails = function() {
								var sorReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId,
								};
								if (sorReq.projId == null ||  sorReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjSORService.getSORDetails(sorReq).then(function(data) {
									$scope.SORData = data.projSORItemTOs;
									if ($scope.SORData<=0) {
										GenericAlertService.alertMessage("SOR Details  are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
									});
				},
								
								
								$scope.resetSORData = function() {
								$scope.SORData = [];
								$scope.searchProject = {};
							}

					$scope.rowSelect = function(rowData) {
						console.log(rowData.select);
						if (rowData.select) {
							deleteSORData.push(rowData.id);
						} else {
							deleteSORData.pop(rowData.id);
						}
					
					}

					var sorpopup;
					var addSORservice = {};
					var deferred = $q.defer();
					$scope.addSORDetails = function(actionType, itemData,
							projId) {
						sorpopup = addSORservice.addProjSORDetails(actionType,
								itemData, projId);
						sorpopup.then(function(data){
							$scope.SORData = data.projSORItemTOs;
						},function(error){
							GenericAlertService
							.alertMessage(
									"Error occured while saving SOR Details",
									"Error");
						});
					}
							addSORservice.addProjSORDetails = function(actionType,
									itemData, projId) {
								if ($scope.searchProject.projId !== undefined
										&& $scope.searchProject.projId != null) {

								sorpopup = ngDialog
										.open({
											template : 'views/projectlib/sor/projsoreditpopup.html',
											scope : $scope,
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.action = actionType;
														$scope.addSORData = [];
														$scope.measurements = [];
														$scope.projSorId = null;
														var sorData = [];

														$scope.itemId1 = 1;
														$scope.isExpand1 = true;
														$scope.itemClick1 = function(
																itemId, expand) {
															$scope.itemId1 = itemId;
															$scope.isExpand1 = !expand;
														};
														
														if (itemData) {
															$scope.pcode = itemData.name;
															$scope.projSorId = itemData.id;
														}

														$scope.projSorifOnLoad = function() {
															var measurementReq = {
																"status" : "1",
																"sorId" : $scope.projSorId,
																"projId" : projId
															};
															ProjSORService
																	.projSorifOnLoad(
																			measurementReq)
																	.then(
																			function(
																					data) {
																				$scope.measurements = data.measureUnitResp.measureUnitTOs;
																				if ($scope.projSorId != null) {
																					$scope.addSORData = data.projSORItemTOs;
																				}
																				sorData = data.projSORItemTOs;
																			});

														},
																$scope.updateMeasureId = function(
																		tab,
																		data) {
																	tab.measureId = data.id;
																}

														if (actionType === 'Add') {
															$scope.addSORData
																	.push(angular
																			.copy({
																				"select" : false,
																				"projId" : projId,
																				"parentId" : null,
																				"item" : false,
																				"deleteFlag" : false,
																				"status" : 1,
																				"code" : '',
																				"name" : '',
																				"comments" : '',
																				"childSORItemTOs" : []
																			}));
															$scope.itemClick1(null, false);
														} else {
															$scope.editSORData = angular
															.copy(sorData);
													sorData = [];
														}

																$scope.addSORGroup = function(projId) {
																	$scope.addSORData
																			.push(angular
																					.copy({
																						"select" : false,
																						"projId" : projId,
																						"parentId" : null,
																						"item" : false,
																						"deleteFlag" : false,
																						"status" : 1,
																						"code" : '',
																						"name" : '',
																						"comments" : '',
																						"childSORItemTOs" : []
																					}));
																	$scope.itemClick1(null, false);

																},
																$scope.addSORSUBGroup = function(
																		tabData,
																		projId) {
																	tabData.childSORItemTOs
																			.push(angular
																					.copy({
																						"select" : false,
																						"projId" : projId,
																						"parentId" : tabData.id,
																						"item" : false,
																						"deleteFlag" : false,
																						"status" : 1,
																						"code" : '',
																						"name" : '',
																						"comments" : '',
																						"childSORItemTOs" : []
																					}));
																	$scope.itemClick1(tabData.id, false);

																},
																$scope.addSORItem = function(
																		tabData,
																		projId) {
																	tabData.childSORItemTOs
																			.push(angular
																					.copy({
																						"select" : false,
																						"projId" : projId,
																						"parentId" : tabData.id,
																						"status" : 1,
																						"deleteFlag" : false,
																						"code" : '',
																						"name" : '',
																						"item" : true,
																						"measureUnitTO" : '',
																						"measureId" : null,
																						"manPowerHrs" : '',
																						"labourRate" : '',
																						"plantRate" : '',
																						"materialRate" : '',
																						"othersRate" : '',
																						"amount" : '',
																						"quantity" : '',
																						"total" : '',
																						"comments" : ''
																					}));
																	$scope.itemClick1(tabData.id, false);
																}
																$scope.deleteSOR = function(
																		tab) {
																	tab.deleteFlag = true;
																},

																$scope.saveSORDetails = function() {
																	var sorSaveReq = {
																			"projSORItemTOs" : $scope.addSORData,
																			"projId" : $scope.searchProject.projId
																		};
																		console
																				.log(JSON
																						.stringify(sorSaveReq));
																		ProjSORService
																		.saveSORDetails(
																				sorSaveReq)
																				.then(
																						function(
																								data) {
																							console.log(JSON.stringify(data));
																							if (data.status != null
																									&& data.status !== undefined
																									&& data.status === 'Info') {
																								var projSORTOs = data.projSORItemTOs;
																								var succMsg = GenericAlertService
																										.alertMessageModal(
																												'Project SOR Details '
																														+ data.message,
																												data.status);
																								succMsg
																										.then(
																												function(
																														data) {
																													var returnPopObj = {
																														"projSORItemTOs" : projSORTOs
																													};
																													deferred
																															.resolve(returnPopObj);
																												},
																												function(
																														error) {
																													GenericAlertService
																															.alertMessage(
																																	"Error occured while saving SOR Details",
																																	"Error");
																												});
																								ngDialog.close();
																							}
																						});
																}

													} ]

										});
								return deferred.promise;
								}else {
									GenericAlertService.alertMessage(
											"Please select Project Id", 'Warning');
								}
								return addSORservice;
							},
							$scope.deactivateSORDetails = function() {

								if (deleteSORData == undefined
										|| deleteSORData.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one SOR to Deactivate",
													"Warning");
									return;
								}
								var sorDeactivateReq = {
									"projSORItemIds" : deleteSORData,
									"status" : 2
								};

								console.log("sorDeactivateReq Data"
										+ JSON.stringify(sorDeactivateReq));
								ProjSORService
										.deactivateSORDetails(sorDeactivateReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"SOR Details Deactivated successfully",
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Deactivating SOR Details",
																	"Error");
												});

							};

					$scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};
					$scope.show = function(comments) {
						ngDialog.open({
							template : 'views/projectlib/sow/viewpopup.html',
							className:'ngdialog-theme-plain ng-dialogueCustom6',
								controller : [
									'$scope',
									function($scope) {
										$scope.comments=comments;
									} ]
						});
					}
				}).filter(
				'sorFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childSORItemTOs
									&& o.childSORItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childSORItemTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								newObj.push(o);
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter(
				'sorEditFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o, key) {
							if (o.childSORItemTOs != undefined
									&& o.childSORItemTOs.length > 0) {
								o.level = level;
								o.leaf = false;
								if (!o.deleteFlag) {
									newObj.push(o);
									if (o.id == itemId) {
										o.expand = isExpand;
									}
									if (o.expand == true) {
										recursive(o.childSORItemTOs, newObj,
												o.level + 1, itemId, isExpand);
									}
								}
								else{
									obj.splice(obj.indexOf(o),1);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
								} else {
									o.leaf = false;
								}
								if (!o.deleteFlag) {
									newObj.push(o);
								}
								else
									{
									obj.splice(obj.indexOf(o),1);
									}
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				});
