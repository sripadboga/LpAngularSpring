'use strict';

app
		.factory(
				'ProjectSettingCostItemFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjectSettingsService, GenericAlertService) {
					var costCodeItemService = {};
					var costStmtPopUp = [];
					costCodeItemService.getCostItemDetails = function(projId) {
						var deferred = $q.defer();
						costStmtPopUp = ngDialog
								.open({
									template : 'views/projectsettings/costitempopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.popUpData = [];
												var selectedCostItems = [];
												$scope.itemId = 1;
												$scope.isExpand = false;
												$scope.itemClick = function(
														itemId, expand) {
													$scope.itemId = itemId;
													$scope.isExpand = !expand;
												};
												var costReq = {
													"status" : 1,
													"projId" : $rootScope.projId
												};
												ProjectSettingsService
														.getCostDetails(costReq)
														.then(
																function(data) {
																	$scope.popUpData = data.projCostItemTOs;
																});
														$scope.popUpRowSelect = function(
																tab) {
															if (tab.select) {
																selectedCostItems
																		.push(tab);
															} else {
																selectedCostItems
																		.pop(tab);
															}
														},
														$scope.saveProjCostCodes = function() {
															var saveCostStmtReq = {
																"projCostItemTOs" : angular.copy(selectedCostItems)
															};
															console
																	.log(JSON
																			.stringify(saveCostStmtReq));
															ProjectSettingsService
																	.saveProjCostCodes(
																			saveCostStmtReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Project Cost Code(s) are saved succuessfully',
																								"Info");
																				var returnPopObj = {
																					"projCostStmtDtlTOs" : data.projCostStmtDtlTOs
																				};
																				selectedCostItems=[];
																				deferred
																						.resolve(returnPopObj);
																				 $scope.closeThisDialog();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Project Cost Code(s) are failed to save',
																								"Error");
																			});
														}
											} ]
								});
						return deferred.promise;
					}
					return costCodeItemService;
				});