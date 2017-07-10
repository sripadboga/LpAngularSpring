'use strict';
app
		.factory(
				'ProjectLeaveTypePopUpService',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjLeaveTypeService, GenericAlertService,
						ProjCostCodeService) {
					var projLeaveTypePopUp;
					var service = {};
					 var selectedLeave=[];
					service.projLeaveTypePopUp = function(actionType,
							selectedProject, editLeaveClass) {
						var deferred = $q.defer();
						projLeaveTypePopUp = ngDialog
								.open({
									template : 'views/projectlib/leavetype/projleavetypepopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.leaveCodeData = [];
												$scope.catgData = [];
												$scope.costcode = [];
												$scope.defaultcostcode = {};
												$scope.categoryData = [];
												$scope.addprojetLeave = [];
												$scope.emptyProjLeaveTypeObj = {};
												$scope.action = actionType;
												if (actionType === 'Edit') {
													$scope.addprojetLeave = angular
															.copy(editLeaveClass);
												}
												var onLoadReq = {
													"status" : 1,
													"projId" : selectedProject.projId

												};
												ProjLeaveTypeService
														.projLeaveTypeifOnLoad(
																onLoadReq)
														.then(
																function(data) {
																	$scope.leaveCodeData = data.projLeaveCodeResp.leaveTypeTOs;
																	$scope.UpdateLeaveCode = function(
																			data,
																			tab) {
																		tab.leaveId = data.id;
																	}
																	$scope.catgData = data.projEmpTypeResp.projEmpCatgTOs;
																	$scope.updateCatgCode = function(
																			data,
																			tab) {
																		tab.projEmpCatgId = data.id;
																	}

																	$scope.categoryData = data.projLeavePaidResp.projLeavePaidCatgTOs;
																	$scope.updateCatgegoryCode = function(
																			data,
																			tab) {
																		tab.projLeavePayId = data.id;
																	}

																	$scope.costcode = data.projCostItemResp.projCostItemTOs;
																	if (actionType === 'Add') {
																		$scope.emptyProjLeaveTypeObj = data.projLeaveTypeTO;
																		var localprojLeaveTypeTO = angular
																				.copy($scope.emptyProjLeaveTypeObj);
																		$scope.addprojetLeave
																				.push(localprojLeaveTypeTO);
																	}
																});

												$scope.addLeaveClass = function() {
													var localprojLeaveTypeTO = angular
															.copy($scope.emptyProjLeaveTypeObj);
													$scope.addprojetLeave
															.push(localprojLeaveTypeTO);
												}
												$scope.costCode = null;
												var costService = {};
												$scope.getCostCode = function(
														tab) {
													var projCostPopup = costService
															.getCostCodeDetails();
													projCostPopup
															.then(
																	function(
																			data) {
																		tab.projCostItemTO.code = data.costCodeItem.code;
																		tab.costCodeId = data.costCodeItem.id;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting Cost Code details",
																						'Error');
																	});
												}
												costService.getCostCodeDetails = function() {
													var deferred = $q.defer();
													ngDialog
															.open({
																template : 'views/projectlib/leavetype/projcostcode.html',
																closeByDocument : false,
																showClose : true,
																controller : [
																		'$scope',
																		function(
																				$scope) {
																			$scope.defaultcostcode = {};
																			$scope.itemId = 1;
																			$scope.isExpand = true;
																			$scope.itemClick = function(
																					itemId,
																					expand) {
																				$scope.itemId = itemId;
																				$scope.isExpand = !expand;
																			};
																					$scope.getCostDetails = function() {
																						var costReq = {
																							"status" : 1,
																							"projId" : selectedProject.projId
																						};
																						ProjCostCodeService
																								.getCostDetails(
																										costReq)
																								.then(
																										function(
																												data) {
																											$scope.tableData = data.projCostItemTOs;
																											if (costReq.projId == null
																													&& costReq.status == 1) {
																												GenericAlertService
																														.alertMessage(
																																"Error occured while getting Cost Code Details",
																																'Error');
																											}
																										},
																										function(
																												error) {
																											GenericAlertService
																													.alertMessage(
																															"Error occured while getting Cost Code Details",
																															'Error');
																										});
																					},
																					$scope.costcodepopup = function(
																							costData) {

																						var returnPopObj = {
																							"costCodeItem" : costData
																						};
																						deferred
																								.resolve(returnPopObj);
																						$scope
																								.closeThisDialog();
																					}
																		} ]
															});
													return deferred.promise;
												}
														$scope.saveLeaveClass = function() {
															var leaveProjSaveReq = {
																"projLeaveTypeTos" : $scope.addprojetLeave,
																"projId" : selectedProject.projId
															};
															ProjLeaveTypeService
																	.saveProjLeaveTypes(
																			leaveProjSaveReq)
																	.then(
																			function(
																					data) {
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					var projectClassTOs = data.projLeaveTypeTOs;
																					var succMsg = GenericAlertService
																							.alertMessageModal(
																									'LeaveType Details '
																											+ data.message,
																									data.status);
																					succMsg
																							.then(
																									function(
																											data1) {
																										
																										var returnPopObj = {
																											"projLeaveTypeTOs" : projectClassTOs
																										};
																										
																										deferred
																												.resolve(returnPopObj);
																									},
																									function(
																											error) {
																										GenericAlertService
																												.alertMessage(
																														"Error occurred while closing popup",
																														'Info');
																									});
																				}
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'LeaveType Details  are failed to Save','Error');
																			});
															ngDialog.close();
														},$scope.popUpRowSelect = function(tab) {
															if (tab.select) {
																selectedLeave.push(tab);
															} else {
																selectedLeave.pop(tab);
															}
														},
														$scope.deleteRows = function() {
															if(selectedLeave.length==0){
															GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
														}
														if(selectedLeave.length<$scope.addprojetLeave.length)
														{
														angular.forEach(selectedLeave, function(value,key) {
															$scope.addprojetLeave.splice($scope.addprojetLeave.indexOf(value), 1);
														
														});
														selectedLeave=[];
														GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
														}else
														{
															GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
															}
														}
											} ]
								});
						return deferred.promise;
					};
					return service;
				}).filter(
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
				});
