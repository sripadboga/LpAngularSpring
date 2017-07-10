'use strict';
app
		.factory(
				'PlantPurchaseOrderFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, PlantPoService) {
					var plantPurchaseOrderPopUp;
					var service = {};
					service.plantPurchaseOrderPopUp = function(projId) {
						var deferred = $q.defer();
						plantPurchaseOrderPopUp = ngDialog
								.open({

									template : 'views/projresources/projplantpo/purchaseorderlist.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom1',
									controller : [
											'$scope',
											function($scope) {

												$scope.plantPurchaseOrderDetails = [];

												$scope.getPlantPoDetails = function() {
													var req = {
														"status" : 1,
														"projId" : projId.projId
													}
													console.log(JSON
															.stringify(req));
													PlantPoService
															.getPlantProjectDtlsOnLoad(
																	req)
															.then(
																	function(
																			data) {
																		$scope.plantPurchaseOrderDetails = data.plantProjPurchaseType;
																	});
												}
												$scope.plantPurchaseOrderPopUp = function(
														purchaseOrderTO) {
													var returnPurchaseOrderTO = {
														"purchaseOrderTO" : purchaseOrderTO
													};
													deferred
															.resolve(returnPurchaseOrderTO);
													$scope.closeThisDialog();

												}
											} ]

								});
						return deferred.promise;
					}
					return service;
				});
