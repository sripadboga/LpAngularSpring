'use strict';
app
		.config(function($stateProvider) {
			$stateProvider.state("projsow", {
				url : '/projsow',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/projectlib/sow/projsow.html',
						controller : 'ProjSOWController'
					}
				}
			})
		})
		.controller(
				"ProjSOWController",
				function($rootScope, $scope, $q, $state, ngDialog,
						ProjSOWService, ProjSORFactory, ProjCostFactory,
						UserEPSProjectService, GenericAlertService) {
					$scope.deletecodes = [];
					var editSOWData = [];
					$scope.SOWData = [];
					$scope.searchProject = {};

							$scope.getSOWItems = function(projId) {
								var sowReq = {
									"projId" : projId,
									"status" : 1
								};
								if (sowReq.projId == null ||  sowReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjSOWService.getProjSOWDetails(sowReq).then(function(data) {
									$scope.SOWData = data.projSOWItemTOs;
									if ($scope.SOWData<=0) {
										GenericAlertService.alertMessage("SOW Details  are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting EPS Projects",'Error');
									});
				},
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

							$scope.resetSOWData = function() {
								$scope.searchProject.projName = null;
								$scope.searchProject.parentName = null;
								$scope.SOWData = [];
								$scope.searchProject =[];
								$scope.projId = null;
								$scope.editSOWData = [];
							}, $scope.rowSelect = function(sowRowData) {
								if (sowRowData.select) {
									editSOWData.push(sowRowData);
								} else {
									editSOWData.pop(sowRowData);
								}

							}
					var sowPopup;
					var addSOWservice = {};
					var deferred = $q.defer();
							$scope.editSOWDetails = function(itemData, projId) {
								sowPopup = addSOWservice.addSOWDetails(itemData, projId);
								sowPopup.then(function(data){
									$scope.SOWData = data.projSOWItemTOs;
							},function(error){
								GenericAlertService
								.alertMessage(
										"Error occured while saving SOW Details",
										"Error");
							});
							}
							addSOWservice.addSOWDetails = function(itemData, projId){
								sowPopup = ngDialog
										.open({
											template : 'views/projectlib/sow/projsowpopuptab.html',
											scope : $scope,
											className : 'ngdialog-theme-plain ng-dialogueCustom',
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														$scope.projId = projId;
														$scope.editSOWData = [];

														$scope.itemId1 = 1;
														$scope.isExpand1 = true;
														$scope.itemClick1 = function(
																itemId, expand) {
															$scope.itemId1 = itemId;
															$scope.isExpand1 = !expand;
														};

														$scope.getProjSOWItemsById = function() {
															var sowEditReq = {
																"status" : "1",
																"sowId" : itemData.id,
																"projId" : $scope.projId
															};
															ProjSOWService
																	.getProjSOWItemsById(
																			sowEditReq)
																	.then(
																			function(
																					data) {
																				$scope.editSOWData = data.projSOWItemTOs;
																			});
														}
														var code = null;
														$scope.sorDetails = function(
																tab) {
															var projSorPopup = ProjSORFactory
																	.sorPopupDetails($scope.projId);
															projSorPopup
																	.then(
																			function(
																					data) {
																				tab.projSORItemTO.code = data.selectedSORItem.code;
																				tab.sorId = data.selectedSORItem.id;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting SOR details",
																								'Error');
																			});
														}
																$scope.costDetails = function(
																		tab) {

																	var projCostPopup = ProjCostFactory
																			.costPopupDetails($scope.projId);
																	projCostPopup
																			.then(
																					function(
																							data) {
																						tab.projCostItemTO.code = data.selectedCostItem.code;
																						tab.projCostId = data.selectedCostItem.id;
																					},
																					function(
																							error) {
																						GenericAlertService
																								.alertMessage(
																										"Error occured while selecting cost details",
																										'Error');
																					});
																},

																$scope.saveSOWDetails = function() {
																	

																	var sowSaveReq = {
																			"projSOWItemTOs" : $scope.editSOWData,
																			"projId" : projId
																		};
																		ProjSOWService
																		.saveSOWItems(
																				sowSaveReq)
																				.then(
																						function(
																								data) {
																							if (data.status != null
																									&& data.status !== undefined
																									&& data.status === 'Info') {
																								var projSOWTOs = data.projSOWItemTOs;
																								var succMsg = GenericAlertService
																										.alertMessageModal(
																												'Project SOW Details '
																														+ data.message,
																												data.status);
																								succMsg
																										.then(
																												function(
																														data) {
																													var returnPopObj = {
																														"projSOWItemTOs" : projSOWTOs
																													};
																													deferred
																															.resolve(returnPopObj);
																												},
																												function(
																														error) {
																													GenericAlertService
																															.alertMessage(
																																	"Error occured while saving SOE Details",
																																	"Error");
																												});
																								ngDialog.close();
																							}
																						});
																	}
													} ]
										});
								return deferred.promise;

							},

							$scope.deactivateSOWDetails = function() {
								var deleteIds = [];
								var deactivateFlag = false;
								if ($scope.selectAll) {
									$scope.SOWData = [];
								} else {
									angular.forEach(editSOWData, function(
											value, key) {
										if (value.select) {
											deleteIds.push(value.id);
											deactivateFlag = true;
										}
									});
								}
								if (!deactivateFlag) {
									GenericAlertService.alertMessage(
													"Please select atleast one Scope of Work to Deactivate",
													"Warning");
									return;
								}
								var sowDeactivateReq = {
									"projSOWItemIds" : deleteIds,
									"status" : 2
								};

								ProjSOWService.deleteSOWItems(sowDeactivateReq)
										.then(
												function(data) {
													GenericAlertService.alertMessage(
																	"Scope of Work Details Deactivated successfully",
																	"Info");
													angular
															.forEach(
																	editSOWData,
																	function(
																			value,
																			key) {
																		$scope.SOWData
																				.splice(
																						$scope.SOWData
																								.indexOf(value),
																						1);
																	});
													deleteIds = [];
													editSOWData = [];

												},
												function(error) {
													GenericAlert.alertMessage("Error occured while Deactivating SOW Details",
																	"Error");
												});

							};

					$scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};
					
					

					function itemexpandCollpase(item, expand) {
						angular.forEach(item.children, function(o) {
							o.expand = !expand;
							if (o.childSOWItemTOs != null
									&& o.childSOWItemTOs.length > 0) {
								o.expand = false;
								itemexpandCollpase(o, expand);
							}
						});
					}

					/*$scope.checkAll = function() {
						angular.forEach($scope.SOWData, function(tab) {
							if ($scope.selectedAll) {
								tab.selected = false;
							} else {
								tab.selected = true;
							}
						});
					}*/
					
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
				'sowFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childSOWItemTOs
									&& o.childSOWItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childSOWItemTOs, newObj,
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
				'sowPopupFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childSOWItemTOs != undefined
									&& o.childSOWItemTOs.length > 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childSOWItemTOs, newObj,
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
				'sowSorFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childSORItemTOs
									&& o.childSORItemTOs.length != 0) {
								o.level = level;
								o.name="treeClass";
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
								o.name="treeClass";
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
				'sowCostFilterTree',
				function() {

					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.projCostCodeItemTOs
									&& o.projCostCodeItemTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.projCostCodeItemTOs, newObj,
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
				});
