'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state('module', {
				url : '/module',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/module/modules.html',
						controller : 'ModuleController'
					}
				}
			})
		})
		.controller(
				'ModuleController',
				function($scope, $state, ngDialog, ModuleService,
						GenericAlertService) {
					$scope.moduleTreeData = [];
					var selectedModuleData = [];
							$scope.getModules = function() {
								var req = {
									"status" : 1
								};
								ModuleService
										.getModules(req)
										.then(
												function(data) {
													$scope.moduleTreeData = data.moduleTOs;
												});
							},
							$scope.moduleRowSelect = function(item) {
								if (item.selected) {
									selectedModuleData.push(item.moduleId);
								} else {
									selectedModuleData.pop(item.moduleId);
								}
							},
							$scope.deactivateModules = function() {
								if (selectedModuleData == undefined
										|| selectedModuleData.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one moduleto deactivate",
													"Warning");
									return;
								}
								var deactivateModuleReq = {
									"moduleIds" : selectedModuleData,
									"status" : 2
								};
								ModuleService.deactivateModules(
										deactivateModuleReq).then(
										function(data) {
											GenericAlertService
											.alertMessage(
													"Module is Deactivated Successfully",
													"Info");
											selectedModuleData = [];
										},function(error){
											GenericAlertService
											.alertMessage(
													"Module is failed to Deactivate",
													"Error");
										});

							},

							$scope.addModule = function(actionType, moduleId) {
								ngDialog
										.open({
											template : 'views/module/modulepopup.html',
										    className:'ngdialog-theme-plain ng-dialogueCustom',
											scope : $scope,
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														var selectedModules=[];
														var editModuleData = [];
														$scope.moduleName = '';
														$scope.tabModules = [];
														$scope.action = actionType;
														$scope.moduleActions = [];
														var tabActions = [];
														$scope.moduleURLValue = '';
														$scope.moduleDispOrder = '';
														$scope.moduleId = null;
														$scope.moduleParentId = null;
														if (actionType === 'Add') {
															$scope.moduleParentId = moduleId;
															$scope.getActions = function() {
																var req = {
																	"status" : 1
																};
																ModuleService
																		.getActions(
																				req)
																		.then(
																				function(
																						data) {
																					tabActions = angular
																							.copy(data.permissionTOs);
																					$scope.moduleActions = angular
																							.copy(data.permissionTOs);
																				});

															}
														} else {
															$scope.getActions = function() {
																var req = {
																	"status" : 1
																};
																ModuleService
																		.getActions(
																				req)
																		.then(
																				function(
																						data) {
																					tabActions = angular
																							.copy(data.permissionTOs);
																				});

															}
															var tabModuleReq = {
																"moduleId" : moduleId,
																"status" : 1
															};
															console
																	.log("tabModuleReq -  ---"
																			+ JSON
																					.stringify(tabModuleReq));

															ModuleService
																	.getTabPermissionsByModule(
																			tabModuleReq)
																	.then(
																			function(
																					data) {
																				editModuleData = data.moduleTOs;
																				console
																						.log("editModuleData.moduleName -  ---"
																								+ JSON
																										.stringify(editModuleData.moduleName));
																				angular
																						.forEach(
																								editModuleData,
																								function(
																										value,
																										key) {

																									$scope.moduleName = value.moduleName;
																									$scope.moduleId = value.moduleId;
																									$scope.moduleParentId = value.moduleParentId;
																									$scope.tabModules = value.childModules;
																									$scope.moduleActions = value.permissionTOs;
																									$scope.moduleURLValue = value.moduleURLValue;
																									$scope.moduleDispOrder = value.moduleDispOrder;
																								});

																			});
														}

																$scope.addTab = function() {
																	$scope.tabModules
																			.push({
																				"moduleName" : '',
																				"tabValue" : 1,
																				"status" : 1,
																				"selected" : false,
																				"permissionTOs" : angular
																						.copy(tabActions)
																			});
																},
																$scope.popUpRowSelect = function(tabData) {
					            									if (tabData.selected) {
					            										selectedModules.push(tabData);
					            									} else {
					            										selectedModules.pop(tabData);
					            									}
					            								},$scope.deleteTabModules = function() {
					            									if(selectedModules.length==0){
					            										GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					            									}
					            									if(selectedModules.length<$scope.tabModules.length)
					            										{
					            										angular.forEach(selectedModules, function(value,key) {
					            											$scope.tabModules.splice($scope.tabModules.indexOf(value), 1);
					            											GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					            										});
					            										selectedModules=[];
					            										}else
					            											{
					            											GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
					            											}
					            								}
																$scope.saveModule = function(
																		myForm) {
																	var validFlag = false;
																	var moduleActionFlag = false;
																	var tabActionFlag = false;
																	if (myForm.$valid) {
																		validFlag = false;
																	}
																	var moduleData = [];
																	var actionData = [];
																	var tabData = [];
																	var tabActions = [];

																	angular
																			.forEach(
																					tabActions,
																					function(
																							value,
																							key) {
																						if (value.selected) {
																							moduleActionFlag = false;
																						}
																					});

																	angular
																			.forEach(
																					$scope.tabModules,
																					function(
																							value,
																							key) {
																						angular
																								.forEach(
																										value.permissionTOs,
																										function(
																												actionName,
																												key) {
																											if (actionName.selected) {
																												tabActionFlag = false;
																											}
																										});
																					});
																	moduleData
																			.push({
																				"moduleParentId" : $scope.moduleParentId,
																				"moduleId" : $scope.moduleId,
																				"status" : 1,
																				"moduleName" : $scope.moduleName,
																				"moduleDispOrder" : $scope.moduleDispOrder,
																				"moduleURLValue" : $scope.moduleURLValue,
																				"permissionTOs" : $scope.moduleActions,
																				"childModules" : $scope.tabModules
																			});

																	if (validFlag) {
																		return;
																	} else {

																		var saveReq = {
																			"moduleTOs" : moduleData
																		};
																		console
																				.log(JSON
																						.stringify(saveReq));

																		ModuleService
																				.saveModule(
																						saveReq)
																				.then(
																						function(
																								data) {
																							GenericAlertService
																									.alertMessage(
																											'Module Details ' + data.message,data.status);
																						},
																						function(error){
																							GenericAlertService
																							.alertMessage(
																									"Module Details are failed to save",
																									"Info");
																						});
																		ngDialog.close();

																	}
																}
													} ]

										});
							};
					$scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};
				}).filter(
				'moduleFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.childModules && o.childModules.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.moduleId == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.childModules, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								o.leaf = true;
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
