'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"projcostcode",
									{
										url : '/projcostcode',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projectlib/costcode/projcostcode.html',
												controller : 'ProjCostController'
											}
										}
									})
				})
		.controller(
				"ProjCostController",
				function($rootScope, $scope, $state, ngDialog,$q,
						ProjCostCodeService, ProjEmpClassService,
						GenericAlertService, UserEPSProjectService) {
					var deactivateData = [];
					var deferred = $q.defer();
					$scope.tableData = [];
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
							$scope.getCostDetails = function(projId) {
								var costReq = {
									"status" : 1,
									"projId" : $scope.searchProject.projId
								};
								if (costReq.projId == null ||  costReq.status == undefined) {
									GenericAlertService.alertMessage("Please select project and status", 'Warning');
									return;
								}
								ProjCostCodeService.getCostDetails(costReq).then(function(data) {
									$scope.tableData = data.projCostItemTOs;
									if ($scope.tableData<=0) {
										GenericAlertService.alertMessage("CostCodes are not aviable for given search criteria",'Warning');
									}
									},
									function(error) {
										GenericAlertService.alertMessage("Error occured while getting CostCodes",'Error');
									});
				},
								
								$scope.resetProjCostData = function() {
								$scope.tableData = [];
								$scope.searchProject = {};
							},
					$scope.rowSelect = function(rowData) {
						if (rowData.select) {
							deactivateData.push(rowData.id);
						} else {
							deactivateData.pop(rowData.id);
						}
					}
							var projCostCodePopUp;
							var projCostEditPopUpService = {};
							$scope.addCost = function(actionType, itemData,
									projId) {
								projCostCodePopUp = projCostEditPopUpService.addCostData(actionType,
										itemData, projId);
								projCostCodePopUp.then(function(data){
									$scope.tableData = data.projCostItemTOs;
							},function(error){
								GenericAlertService
								.alertMessage(
										"Error occured while saving Cost Details",
										"Error");
							});
								
							}
							projCostEditPopUpService.addCostData = function(actionType,
											itemData, projId) {
										if ($scope.searchProject.projId !== undefined
												&& $scope.searchProject.projId != null) {

											projCostCodePopUp=ngDialog

										.open({
											template : 'views/projectlib/costcode/projcosteditpopup.html',
											closeByDocument : false,
											scope : $scope,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.pCode = null;
														$scope.action = actionType;
														$scope.editCostData = [];
														$scope.costCodeData = [];
														$scope.projCostId=null;
														var costData=[];
														$scope.itemId1 = 1;
														$scope.isExpand1 = false;
														$scope.itemClick1 = function(
																itemId, expand) {
															$scope.itemId1 = itemId;
															$scope.isExpand1 = !expand;
														};
														if (itemData) {
															$scope.pCode = itemData.name;
															$scope.projCostId=itemData.id;
														}
														$scope.getProjCostItemsOnLoad = function() {
															var costReq = {
																	"status" : "1",
																	"projCostId" : $scope.projCostId,
																	"projId" : projId
															};
															console.log("costReq"+JSON.stringify(costReq));
															ProjCostCodeService
																			.projCostItemsOnLoad(
																					costReq)
																			.then(
																					function(
																							data) {
																						$scope.costCodeData = data.costCodeTOs;
																						if($scope.projCostId!=null){
																							$scope.editCostData = data.projCostItemTOs;
																						}
																						costData = data.projCostItemTOs;
																					});
																},
																$scope.updateCostCode = function(
																		data,
																		tab) {
																	tab.costId = data.id;
																}
														if (actionType === "Add") {
															$scope.editCostData
																	.push({
																		"select" : false,
																		"projId" : projId,
																		"parentId" : null,
																		"status" : 1,
																		"deleteFlag":false,
																		"item" : false,
																		"code" : '',
																		"name" : '',
																		"projCostCodeItemTOs" : []
																	});
															$scope.itemClick1(null, false);
														} else
															{
																$scope.editCostData = angular.copy(costData);
																costData=[];
															}
														$scope.addCostGroup = function(
																projId) {
															$scope.editCostData
																	.push({
																		"select" : false,
																		"projId" : projId,
																		"parentId" : null,
																		"deleteFlag":false,
																		"status" : 1,
																		"item" : false,
																		"code" : '',
																		"name" : '',
																		"projCostCodeItemTOs" : []
																	});
															$scope.itemClick1(null, false);
														}
														$scope.addCostSubGroup = function(
																tabData,
																projId,
																indexValue) {
															tabData.projCostCodeItemTOs
																	.push(angular
																			.copy({
																				"select" : false,
																				"projId" : projId,
																				"parentId" : tabData.id,
																				"parentIndex" : indexValue,
																				"status" : 1,
																				"deleteFlag":false,
																				"item" : false,
																				"code" : '',
																				"name" : '',
																				"projCostCodeItemTOs" : []
																			}));
															$scope.itemClick1(tabData.id, false);
														}
														$scope.addCostItem = function(
																tabData,
																projId,
																indexValue) {
															tabData.projCostCodeItemTOs
																	.push({
																		"select" : false,
																		"projId" : projId,
																		"parentId" : tabData.id,
																		"parentIndex" : indexValue,
																		"status" : 1,
																		"code" : '',
																		"name" : '',
																		"item" : true,
																		"costId" : '',
																		"startDate" : '',
																		"finishDate" : '',
																		"comments" : ''
																	});
															$scope.itemClick1(tabData.id, false);
														}
																$scope.deleteCostGroup = function(tab) {
																	console.log(JSON.stringify($scope.editCostData));
																	tab.deleteFlag = true;
																}
																$scope.saveProjCostItems = function() {									
																	var req = {
																		"projCostItemTOs" : $scope.editCostData,
																		"projId" : projId
																	}
																	ProjCostCodeService.saveProjCostItems(req).then(function(data) {
																		var  results =data.projCostItemTOs;
																		console.log("DATA"+JSON.stringify(data));
																		   var succMsg = GenericAlertService.alertMessageModal('CostCode  Details '+ data.message,data.status);
																		   succMsg.then(function(data) {			
																				 var returnPopObj = {
														                                 "projCostItemTOs":  results                         
														                             }
																				  deferred.resolve(returnPopObj); 
																		   })
																		},function (error){
																				GenericAlertService.alertMessage('CostCode  Details  are failed to save',"Error");
																			});
ngDialog.close();
															}
				} ]

	});
											return deferred.promise;
}else {
GenericAlertService.alertMessage(
		"Please select Project Id", 'Warning');
}

},
							$scope.deactivateCostDetails = function() {
								if (deactivateData == undefined
										|| deactivateData.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one Cost Item to Deactivate",
													"Warning");
									return;
								}
								var costDeactivateReq = {
									"projCostItemIds" : deactivateData,
									"status" : 2
								};
								console.log(JSON.stringify(costDeactivateReq));
								ProjCostCodeService
										.deactivateCostDetails(
												costDeactivateReq)
										.then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	"Cost Details Deactivated successfully",
																	"Info");
													deactivateData = [];
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while Deactivating Cost Details",
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
							template : 'views/projectlib/costcode/viewpopup.html',
							className:'ngdialog-theme-plain ng-dialogueCustom6',
								controller : [
									'$scope',
									function($scope) {
										$scope.comments=comments;
									} ]
						});
					}
				})
		.filter(
				'projCostFilterTree',
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
					
					
					
				})
		.filter(
				'projEditCostFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular
								.forEach(
										obj,
										function(o) {
											if (o.projCostCodeItemTOs
													&& o.projCostCodeItemTOs.length != 0) {
												o.level = level;
												o.leaf = false;
												if (o.deleteFlag==undefined || !o.deleteFlag) {
													newObj.push(o);
													if (o.id == itemId) {
														o.expand = isExpand;
													}
													if (o.expand == true) {
														recursive(o.projCostCodeItemTOs, newObj,
																o.level + 1, itemId, isExpand);
													}
												} else{
													obj.splice(obj
															.indexOf(o), 1);
													return true;
												}
											} else {
												o.level = level;
												if (o.item) {
													o.leaf = true;
												} else {
													o.leaf = false;
												}
												if (o.deleteFlag==undefined || !o.deleteFlag) {
													newObj.push(o);
												} 
												else{
													obj.splice(obj
															.indexOf(o), 1);
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
					return projCostCodePopUp;
				});