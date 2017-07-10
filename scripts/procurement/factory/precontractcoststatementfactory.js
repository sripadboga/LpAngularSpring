'use strict';

app
		.factory(
				'PreContractCostPopupFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjectSettingsService, GenericAlertService) {
					var projCostStatementServicepopup = [];
					var projCostStatementService = {};
					projCostStatementService.getProjCostDetails = function(
							projId) {
						var deferred = $q.defer();
						projCostStatementServicepopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/projcostcode.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom3',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.itemId = 1;
												$scope.isExpand = true;
												$scope.itemClick = function(
														itemId, expand) {
													$scope.itemId = itemId;
													$scope.isExpand = !expand;
												}

												$scope.projCostStatementData = [];
														$scope.getProjCostStatements = function() {
															var projCostCodeReq = {
																"status" : 1,
																"projId" : projId
															};
															console.log(JSON.stringify(projCostCodeReq));
															ProjectSettingsService
																	.getProjCostStatements(
																			projCostCodeReq)
																	.then(
																			function(
																					data) {
																				$scope.projCostStatementData = data.projCostStmtDtlTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Plant classes",
																								'Error');
																			});
														},
														$scope.projCostStatementPopup = function(
																projCostStmtDtlTO) {
															var returnProjCostStmtObj = {
																"projCostStmtDtlTO" : projCostStmtDtlTO
															};
															deferred
																	.resolve(returnProjCostStmtObj);
															$scope
																	.closeThisDialog();
														}
											} ]
								});
						return deferred.promise;
					};
					return projCostStatementService;

				}).filter(
				'projCostStatementTree',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.projCostStmtChildTOs
									&& o.projCostStmtChildTOs.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.projCostStmtChildTOs, newObj,
											o.level + 1, itemId, isExpand);
								}
							} else {
								o.level = level;
								if (o.item) {
									o.leaf = true;
									newObj.push(o);
								} else {
									obj.splice(obj.indexOf(o), 1);
									o.leaf = false;
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
