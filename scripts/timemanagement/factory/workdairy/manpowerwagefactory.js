'use strict';

app
		.factory(
				'ManpowerWageFactorFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						WageService, GenericAlertService) {
					var wagePopup = [];
					var wageFactorService = {};
					wageFactorService.wageFactorDetailsList = function(projId) {
								var deferred = $q.defer();
								wagePopup = ngDialog
										.open({
											template : 'views/timemanagement/workdairy/createworkdairy/wageFactor.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.wages = [];
														
														var wageReq = {
															"status" : 1,
															"clientId" : $rootScope.clientId
														};
														
														WageService
																.getEmpWages(
																		wageReq)
																.then(
																		function(
																			 	data) {
																			console.log(JSON.stringify(data));
																			$scope.wages = data.employeeWageRateTOs;
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occured while getting weather Details",
																							"Error");
																		});
														$scope.wageFactorpopup = function(
																employeeWageRateTO) {
															var returnPopObj = {
																"employeeWageRateTO" : employeeWageRateTO
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
					return wageFactorService;
				
				});