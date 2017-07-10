'use strict';
app
		.config(function($stateProvider) {
			$stateProvider.state("projsoe", {
				url : '/projsoe',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/projectlib/soe/projsoe.html',
						controller : 'ProjSOEController'
					}
				}
			})
		})
		.controller(
				"ProjSOEController",
				function($rootScope, $scope, $q, $state, ngDialog,
						ProjSOEService, ProjEmpClassService,
						GenericAlertService, UserEPSProjectService) {
					var deleteSOEData = [];
					$scope.SOEData = [];
					$scope.searchProject = {};
					var deferred = $q.defer();

							$scope.getUserProjects = function() {
								var userProjectSelection = UserEPSProjectService.epsProjectPopup();
								userProjectSelection.then(
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

							$scope.getSOEDetails = function(projId) {
								var soeReq = {
									"status" : 1,
									"projId" : projId,
								};
								if (soeReq.projId == null ||  soeReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjSOEService.getSOEDetails(soeReq).then(function(data) {
									$scope.SOEData = data.projSOEItemTOs;
									if ($scope.SOEData<=0) {
										GenericAlertService.alertMessage("SOE Details are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
									});
				},
								
								$scope.resetSOEData = function() {
								$scope.SOEData = [];
								$scope.searchProject = {};
							},

							$scope.rowSelect = function(rowData) {
								if (rowData.select) {
									deleteSOEData.push(rowData.id);
								} else {
									deleteSOEData.pop(rowData.id);
								}
							}

					var soepopup;
					var addSOEservice = {};
					$scope.editSOEDetails = function(actionType, itemData,projId) {
						soepopup = addSOEservice.addSOEDetails(actionType,itemData, projId);
						soepopup.then(function(data){
							$scope.SOEData = data.projSOEItemTOs;
					},function(error){
						GenericAlertService.alertMessage("Error occured while saving SOE Details",
								"Error");
					});
					}

					addSOEservice.addSOEDetails = function(actionType,
							itemData, projId) {
						if ($scope.searchProject.projId !== undefined
								&& $scope.searchProject.projId != null) {
							soepopup = ngDialog
									.open({
										template : 'views/projectlib/soe/projsoeeditpopup.html',
										scope : $scope,
										closeByDocument : false,
										showClose : true,
										controller : [
												'$scope',
												function($scope) {
													$scope.pcode = null;
													$scope.action = actionType;
													$scope.editSOEData = [];
													$scope.measurements = [];
													$scope.projSoeId = null;
													var soeData = [];
													$scope.itemId1 = 1;
													$scope.isExpand1 = true;
													$scope.itemClick1 = function(
															itemId, expand) {
														$scope.itemId1 = itemId;
														$scope.isExpand1 = !expand;
													};
													if (itemData) {
														$scope.pcode = itemData.name;
														$scope.projSoeId = itemData.id;
													}
															$scope.projSoeifOnLoad = function() {
																var measurementReq = {
																	"status" : "1",
																	"soeId" : $scope.projSoeId,
																	"projId" : projId
																};
																ProjSOEService
																		.projSoeifOnLoad(
																				measurementReq)
																		.then(
																				function(
																						data) {
																					$scope.measurements = data.measureUnitResp.measureUnitTOs;
																					if ($scope.projSoeId != null) {
																						$scope.editSOEData = data.projSOEItemTOs;
																					}
																					soeData = data.projSOEItemTOs;
																				});

															},
															$scope.updateMeasureId = function(
																	tab, data) {
																tab.measureId = data.id;
															}

													if (actionType === 'Add') {
														$scope.editSOEData
																.push({
																	"select" : false,
																	"projId" : projId,
																	"parentId" : null,
																	"item" : false,
																	"deleteFlag" : false,
																	"status" : 1,
																	"code" : '',
																	"name" : '',
																	"comments" : '',
																	"childSOEItemTOs" : []
																});
														$scope.itemClick1(null, false);
													} else {
														$scope.editSOEData = angular
																.copy(soeData);
														soeData = [];
													}
													$scope.addSOEGroup = function(projId) {
														$scope.editSOEData.push({
																	"select" : false,
																	"projId" : projId,
																	"parentId" : null,
																	"item" : false,
																	"deleteFlag" : false,
																	"status" : 1,
																	"code" : null,
																	"name" : null,
																	"comments" : '',
																	"childSOEItemTOs" : []
																});
														$scope.itemClick1(null, false);
													}

													$scope.addSOESubGroup = function(
															tabData, projId) {
														tabData.childSOEItemTOs.push(angular
																		.copy({
																			"select" : false,
																			"projId" : projId,
																			"parentId" : tabData.id,
																			"item" : false,
																			"deleteFlag" : false,
																			"status" : 1,
																			"code" : null,
																			"name" : null,
																			"comments" : '',
																			"childSOEItemTOs" : []
																		}));
														$scope.itemClick1(tabData.id, false);

													}
													$scope.addSOEItem = function(
															tabData, projId) {
														tabData.childSOEItemTOs
																.push(angular
																		.copy({
																			"select" : false,
																			"projId" : projId,
																			"parentId" : tabData.id,
																			"status" : 1,
																			"code" : null,
																			"name" : null,
																			"item" : true,
																			"deleteFlag" : false,
																			"measureUnitTO" : '',
																			"measureId" : null,
																			"quantity" : '',
																			"comments" : ''
																		}));
														$scope.itemClick1(tabData.id, false);
													}
													$scope.deleteSOE = function(
															tab) {
														tab.deleteFlag = true;
													}

													$scope.saveSOEDetails = function() {
														var soeSaveReq = {
															"projSOEItemTOs" : $scope.editSOEData,
															"projId" : projId
														};
														ProjSOEService.saveSOEDetails(soeSaveReq).then(function(data) {
																			if (data.status != null && data.status !== undefined && data.status === 'Info') {
																				var projSOETOs = data.projSOEItemTOs;
																				var succMsg = GenericAlertService.alertMessageModal('Project SOE Details '+ data.message,data.status);
																				succMsg.then(function(data) {
																									var returnPopObj = {
																										"projSOEItemTOs" : projSOETOs
																									};
																									deferred.resolve(returnPopObj);
																								},
																								function(error) {
																									GenericAlertService.alertMessage("Error occured while saving SOE Details","Error");
																								});
																				ngDialog.close();
																			}
																		});
													}
												} ]

									});
							return deferred.promise;
						} else {
							GenericAlertService.alertMessage(
									"Please select Project Id", 'Warning');
						}
						return addSOEservice;
					}

					$scope.deactivateSOEDetails = function() {
						if (deleteSOEData == undefined
								|| deleteSOEData.length <= 0) {
							GenericAlertService
									.alertMessage(
											"Please select atleast one Schedule Of Estimate to deactivate",
											'Warning');
							return;
						}
						var soeDeactivateReq = {
							"projSOEItemIds" : deleteSOEData,
							"status" : 2
						};
						ProjSOEService
								.deactivateSOEDetails(soeDeactivateReq)
								.then(
										function(data) {
											GenericAlertService
													.alertMessage(
															"Schedule Of Estimate Details Deactivated successfully",
															"Info");
											deleteSOEData = [];
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															' Schedule Of Estimate Details are failed to deactivate',
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
				'soeFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o, key) {
							if (o.childSOEItemTOs
									&& o.childSOEItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childSOEItemTOs, newObj,
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
				'soeEditFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj,
								function(o, key) {
									if (o.childSOEItemTOs != undefined
											&& o.childSOEItemTOs.length > 0) {
										o.level = level;
										o.leaf = false;
										if (o.deleteFlag == undefined
												|| !o.deleteFlag) {
											newObj.push(o);
											if (o.id == itemId) {
												o.expand = isExpand;
											}

											if(o.expand===true){
												recursive(o.childSOEItemTOs, newObj, o.level + 1,
														itemId, isExpand);
												}
										} else {
											obj.splice(obj.indexOf(o), 1);
											return true;
										}
									} else {
										o.level = level;
										if (o.item) {
											o.leaf = true;
										} else {
											o.leaf = false;
										}

										if (o.deleteFlag == undefined
												|| !o.deleteFlag) {
											newObj.push(o);
										} else {
											obj.splice(obj.indexOf(o), 1);
											return true;
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
