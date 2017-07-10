'use strict';
app
		.factory(
				'PlantDocketDetailsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, PlantPoService) {
					var plantDocketDetailsPopUp;
					var service = {};
					service.plantDocketDetailsPopUp = function(searchProject) {
						var deferred = $q.defer();
						plantDocketDetailsPopUp = ngDialog
								.open({
									template : 'views/projresources/projplantpo/docketdetails.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {

												$scope.plantDocketDetails = [];
												$scope.stockMap = [];
												//$scope.stockMap = data.stockMap;
												$scope.getDocketDetails = function() {
													var req = {
														"status" : 1,
														"projId" : searchProject.projId
													}
													PlantPoService
															.getPlantDocketDtls(
																	req)
															.then(
																	function(
																			data) {
																		//$scope.stockMap = data.stockMap;
																		$scope.plantDocketDetails = data.plantDocketDtlTOs;
																	});
													PlantPoService
													.getOnLoadPlantDocketDtls(
															req)
													.then(
															function(
																	data) {
																$scope.stockMap = data.stockMap;
																//$scope.plantDocketDetails = data.plantDocketDtlTOs;
															});
													
												}
												/*$scope.plantPurchaseOrderPopUp = function(
														purchaseOrderTO) {
													var returnPurchaseOrderTO = {
														"purchaseOrderTO" : purchaseOrderTO
													};
													deferred
															.resolve(returnPurchaseOrderTO);
													$scope.closeThisDialog();

												}*/
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
