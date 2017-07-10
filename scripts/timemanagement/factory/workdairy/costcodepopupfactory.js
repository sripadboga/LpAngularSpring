'use strict';

app
		.factory(
				'WorkDairyCostCodeFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjCostCodeService, GenericAlertService) {
					var workDairyCostService = {};

							workDairyCostService.getCostCodeDetails = function(
									projId, workDairyCostCodeList) {

								var deferred1 = $q.defer();

								var costReq = {
									"status" : 1,
									"projId" : projId
								};

								ProjCostCodeService
										.getCostDetails(costReq)
										.then(
												function(data) {

													var wokDairyCostPopup = workDairyCostService
															.opeCostCodePopup(
																	data.projCostItemTOs,
																	workDairyCostCodeList);
													wokDairyCostPopup
															.then(
																	function(
																			data) {
																		var returnPopObj = {
																			"projCostItemTOs" : data.projCostItemTOs
																		};
																		deferred1
																				.resolve(returnPopObj);
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting Crew List Details",
																						'Error');
																	})
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while getting working shift Details",
																	"Error");
												});
								return deferred1.promise;

							},
							workDairyCostService.opeCostCodePopup = function(
									projCostItemTOs, workDairyCostCodeList) {
								var costCodepopupFactory = [];
								var deferred = $q.defer();
								costCodepopupFactory = ngDialog
										.open({
											template : 'views/timemanagement/workdairy/createworkdairy/workdairyprojcostcode.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.workDairyCostCodeMap = [];
														$scope.tabData = projCostItemTOs;
														$scope.itemId = 1;
														$scope.isExpand = true;

														var selectedCostItems = [];

														angular
																.forEach(
																		workDairyCostCodeList,
																		function(
																				value,
																				key) {
																			$scope.workDairyCostCodeMap[value.id] = true;
																		});

																$scope.selectWorkDairyCostItem = function(
																		projCostItemTO) {
																	if (projCostItemTO.select) {
																		selectedCostItems
																				.push(projCostItemTO);
																	} else {
																		selectedCostItems
																				.pop(projCostItemTO);
																	}
																},
																$scope.addCostItemsToWorkDairy = function() {
																	var returnPopObj = {
																		"projCostItemTOs" : selectedCostItems
																	};
																	deferred
																			.resolve(returnPopObj);
																	$scope
																			.closeThisDialog();

																},
																$scope.itemClick = function(
																		itemId,
																		expand) {
																	$scope.itemId = itemId;
																	$scope.isExpand = !expand;
																}
													} ]
										});
								return deferred.promise;

							}
					return workDairyCostService;

				}).filter(
				'workDairyProjCostFilterTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o != undefined && o.projCostCodeItemTOs
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
