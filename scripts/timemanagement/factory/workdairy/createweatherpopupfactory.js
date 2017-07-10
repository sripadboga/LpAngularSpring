'use strict';

app
		.factory(
				'CreateWeatherPopupFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						WeatherService, GenericAlertService) {
					var weatherPopup = [];
					var weatherService = {};
					weatherService.weatherDetailsList = function(projId) {
								var deferred = $q.defer();
								weatherPopup = ngDialog
										.open({
											template : 'views/timemanagement/workdairy/createworkdairy/weatherclass.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.weathers = [];
														var weatherReq = {
															"status" : 1,
															"clientId" : $rootScope.clientId
														};
														WeatherService
																.getWeathers(
																		weatherReq)
																.then(
																		function(
																				data) {
																			//console.log(JSON.stringify(data));
																			$scope.weathers = data.weatherTOs;
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occured while getting weather Details",
																							"Error");
																		});
														$scope.weathertpopup = function(
																weatherTO) {
															var returnPopObj = {
																"weatherTO" : weatherTO
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
					return weatherService;
				
				});