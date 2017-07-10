'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:EPSController
 * @description # EPS Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state("enterprise", {
				url : '/enterprise',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/eps/epstree.html',
						controller : 'EPSProjController'
					}
				}
			})
		})
		.controller(
				'EPSProjController',
				function($scope, $state, $q, ngDialog, EpsService,
						ProjEmpClassService, GenericAlertService,
						UserEPSProjectService) {
					$scope.epsData = [];
					var deleteTreeData = [];
					var editTree = [];
					$scope.getEPSDetails = function() {
						var epsReq = {
							"status" : 1
						};
						EpsService.getEPSDetails(epsReq).then(function(data) {
							$scope.epsData = data.ePSProjectTOs;
						});

					},

					$scope.rowSelect = function(rowData) {
						if (rowData.select) {
							deleteTreeData.push(rowData.projId);
						} else {
							deleteTreeData.pop(rowData.projId);
						}
					}

					var epspopup;
					var addEPSservice = {};
					var deferred = $q.defer();
					$scope.editTreeDetails = function(actionType, itemData) {
						epspopup = addEPSservice.addTreeDetails(actionType,
								itemData);
					}

					addEPSservice.addTreeDetails = function(actionType,
							itemData) {

						epspopup = ngDialog
								.open({
									template : 'views/eps/epstreepopup.html',
									className:'ngdialog-theme-plain ng-dialogueCustom2',
									scope : $scope,
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.pcode = null;
												$scope.action = actionType;
												$scope.editTreeData = [];
												var treeData = [];

												$scope.itemId1 = 1;
												$scope.isExpand1 = true;
												$scope.itemClick1 = function(
														itemId, expand) {
													$scope.itemId1 = itemId;
													$scope.isExpand1 = !expand;
												};
												if (itemData) {
													$scope.pcode = itemData.projCode;
												}

												if (actionType === 'Add') {
													$scope.editTreeData.push({
														"select" : false,
														"status" : 1,
														"deleteFlag" : false,
														"projCode" : '',
														"projName" : '',
														"projType" : '',
														"startDate" : '',
														"finishDate" : '',
														"usrProj" : '',
														"childProjs" : []
													});
													$scope.itemClick1(null, false);
												} else {
													$scope.getEPSProjectsById = function() {
														var epsEditReq = {
															"status" : 1,
															"projId" : itemData.projId
														};
														console
																.log(JSON
																		.stringify(epsEditReq));
														EpsService
																.getEPSProjectsById(
																		epsEditReq)
																.then(
																		function(
																				data) {
																			$scope.editTreeData = data.ePSProjectTOs;

																		});
													}
												}
												$scope.addTreeGroup = function() {
													$scope.editTreeData.push({
														"select" : false,
														"status" : 1,
														"deleteFlag" : false,
														"projCode" : '',
														"projName" : '',
														"projType" : '',
														"startDate" : '',
														"finishDate" : '',
														"usrProj" : '',
														"childProjs" : []
													});
													$scope.itemClick1(null, false);
												}

												$scope.addTreeSubGroup = function(
														tabData) {
													tabData.childProjs
															.push(angular
																	.copy({
																		"select" : false,
																		"parentId" : tabData.projId,
																		"status" : 1,
																		"deleteFlag" : false,
																		"projCode" : '',
																		"projName" : '',
																		"projType" : '',
																		"startDate" : '',
																		"finishDate" : '',
																		"usrProj" : '',
																		"childProjs" : []
																	}));

													$scope.itemClick1(tabData.projId, false);

												}
												$scope.addTreeItem = function(
														tabData) {
													tabData.childProjs
															.push(angular
																	.copy({
																		"select" : false,
																		"parentId" : tabData.projId,
																		"status" : 1,
																		"deleteFlag" : false,
																		"projCode" : '',
																		"projName" : '',
																		"projType" : '',
																		"proj" : true,
																		"startDate" : '',
																		"finishDate" : '',
																		"usrProj" : ''
																	}));
													$scope.itemClick1(tabData.projId, false);
												}

												$scope.deleteTree = function(
														tab) {
													tab.deleteFlag = true;
												}

												$scope.saveProjects = function() {

													var epsSaveReq = {
														"projs" : $scope.editTreeData,
													};
													EpsService
															.saveProjects(
																	epsSaveReq)
															.then(
																	function(
																			data) {
																		console
																				.log(JSON
																						.stringify(data));

																		if (data.status != null
																				&& data.status !== undefined
																				&& data.status === 'Info') {
																			var epsProj = data.epsProjs;
																			var succMsg = GenericAlertService
																					.alertMessageModal(
																							'EPS Details '
																									+ data.message,
																							data.status);
																			succMsg
																					.then(
																							function(
																									data) {
																								ngDialog
																										.close(epspopup);

																								var returnPopObj = {
																									"epsProjs" : epsProj
																								};
																								deferred
																										.resolve(epspopup);
																							},
																							function(
																									error) {
																								GenericAlertService
																										.alertMessage(
																												"Error occured while saving EPS Details",
																												"Error");
																							});
																		}
																	});

												}
											} ]

								});
						return deferred.promise;

						return addEPSservice;
					}

					$scope.deactivateEPSDetails = function() {
						if (deleteTreeData == undefined
								|| deleteTreeData.length <= 0) {
							GenericAlertService
									.alertMessage(
											"Please select atleast one Project to deactivate",
											'Warning');
							return;
						}
						var epsDeactivateReq = {
							"projectIds" : deleteTreeData,
							"status" : 2
						};
						EpsService
								.deactivateEPSDetails(epsDeactivateReq)
								.then(
										function(data) {
											GenericAlertService
													.alertMessage(
															"Project Details Deactivated successfully",
															"Info");
											deleteTreeData = [];
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															' Project Details are failed to deactivate',
															"Error");
										});

					};

					$scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};

					$scope.checkAll = function() {
						angular.forEach($scope.epsData, function(tab) {
							if ($scope.selectedAll) {
								tab.selected = false;
							} else {
								tab.selected = true;
							}
						});
					}
				}).filter(
				'epsFilterTreeItem',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o, key) {
							if (o.childProjs && o.childProjs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.projId === itemId) {
									o.expand = isExpand;
								}
								if (o.expand === true) {
									recursive(o.childProjs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.proj) {
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
				'editFilterTreeItem',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj,
								function(o, key) {
									if (o.childProjs != undefined
											&& o.childProjs.length > 0) {
										o.level = level;
										o.leaf = false;
										if (o.deleteFlag == undefined
												|| !o.deleteFlag) {
											newObj.push(o);
											if (o.projId == itemId) {
												o.expand = isExpand;
											}
											if (o.expand === true) {
												recursive(o.childProjs, newObj,
														o.level + 1, itemId,
														isExpand);
											}
										} else {
											obj.splice(obj.indexOf(o), 1);
											return true;
										}
									} else {
										o.level = level;
										if (o.proj) {
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
