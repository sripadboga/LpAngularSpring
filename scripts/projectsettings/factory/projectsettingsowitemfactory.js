'use strict';

app
		.factory(
				'ProjectSettingSOWItemFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjectSettingsService, GenericAlertService) {
					var SOWItemService = {};
					var projSOWPopUp = [];
					SOWItemService.getSOWItemDetails = function(projId) {
						var deferred = $q.defer();
						projSOWPopUp = ngDialog
								.open({
									template : 'views/projectsettings/sowitempopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.SOWData = [];
												var selectedSOWItems = [];
												$scope.itemId = 1;
												$scope.isExpand = false;
												$scope.itemClick = function(
														itemId, expand) {
													$scope.itemId = itemId;
													$scope.isExpand = !expand;
												};
												var sowReq = {
													"projId" : projId,
													"status" : 1
												};
												ProjectSettingsService
														.getProjSOWDetails(
																sowReq)
														.then(
																function(data) {
																	$scope.SOWData = data.projSOWItemTOs;
																});
														$scope.popUpRowSelect = function(
																tab) {
															if (tab.select) {
																selectedSOWItems
																		.push(tab);
															} else {
																selectedSOWItems
																		.pop(tab);
															}
														},
														$scope.saveProjSOWItems = function() {
															var saveProgMesureReq = {
																"projSOWItemTOs" : angular
																		.copy(selectedSOWItems)
															};
															console.log("saveProgMesureReq-----"+JSON.stringify(saveProgMesureReq));
															ProjectSettingsService
																	.saveProjSOWItems(
																			saveProgMesureReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Project SOW Item(s) are saved succuessfully',
																								"Info");
																				var returnPopObj = {
																					"projSOWItemTOs" : data.projProgressTOs
																				};
																				selectedSOWItems = [];
																				deferred
																						.resolve(returnPopObj);
																				$scope
																						.closeThisDialog();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Project SOW Item(s) are failed to save',
																								"Error");
																			});
														}
											} ]
								})
						return deferred.promise;
					}
					return SOWItemService;
				});