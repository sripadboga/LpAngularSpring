'use strict';
app
		.factory(
				'CostCodeFactory',
				function(ngDialog, $q, $filter, $timeout,CostCodepopupFactory, $rootScope,
						GenericAlertService) {

					var costCodeFactoryList;
					var service = {};
					service.costCodeFactoryList = function(projId) {
						
						var deferred = $q.defer();
						costCodeFactoryList = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/costcodelist.html',

									closeByDocument : false,
									showClose : true,

									controller : [ '$scope', function($scope) {
								
										$scope.valueReq= {
												"status" : 1,
												"costId" : null
											};
											$scope.addCostCodes = function() {

													var costCodeList = CostCodepopupFactory
														.costCodepopupFactoryList(projId);
												costCodeList
														.then(
																function(data) {
																	//console.log(JSON.stringyfy(data));
																	$scope.valueReq.costId = data.projCostItemTO.id;
																},
																function(error) {
																	GenericAlertService
																			.alertMessage(
																					"Error occurred while fetching costcode details",
																					'Error');
																});
											}
										
									} ]

								})
								return deferred.promise;
					}
					return service;
				})