
'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state("weather", {
		url : '/weather',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/centrallib/weatherclass/weatherclass.html',
				controller : 'WeatherController'
			}
		}
	})
}).controller("WeatherController",function($rootScope, $q, $scope, $state, ngDialog,WeatherService,GenericAlertService) {
			$scope.weather = {};
			$scope.weatherClassification = [];
			$scope.deletecodes = [];
			var editweatherClassification =[];
			var deferred = $q.defer();
			$scope.weatherReq={
					"weatherCode":null,
					"weatherName":null,
					"status":"1"
			}
			$scope.weatherSearch = function() {
				WeatherService
							.getWeathers($scope.weatherReq)
							.then(
									function(data) {
										$scope.activeFlag = 0;
										$scope.weatherClassification = data.weatherTOs;
										if ($scope.weatherClassification != null
												&& $scope.weatherClassification.length > 0) {
											if ($scope.weatherClassification[0].status == 1) {
												$scope.activeFlag = 1;
											} else if ($scope.weatherClassification[0].status == 2) {
												$scope.activeFlag = 2;
											}
										}
										else{
											GenericAlertService
											.alertMessage(
													'Weather Classifications   are not available for given search criteria',
													"Warning");
										}
									});
				},
				
			$scope.reset=function(){
					$scope.weatherReq={
							"weatherCode":null,
							"weatherName":null,
							"status":"1"
					}
					$scope.activeFlag = 0;
					$scope.weatherSearch();
			},
				$scope.rowSelect = function(weather){
					if (weather.selected){
						editweatherClassification.push(weather);
					}else {
						editweatherClassification.pop(weather);
					}
				}
			var service = {};
			var weatherPopUp;
			$scope.weatherCls = function(actionType) {
				weatherPopUp = service.addWeatherClass (actionType);
				weatherPopUp
				.then(
						function(
								data) {
							$scope.weatherClassification = data.weatherTOs;
						},
						function(
								error) {
							GenericAlertService
									.alertMessage(
											"Error occured while selecting Weather  details",
											'Error');
						});
			}
				service.addWeatherClass= function(actionType) {
					if(actionType=='Edit' && editweatherClassification<=0){
						GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
						return ;
					}
					weatherPopUp=ngDialog.open({
						template : 'views/centrallib/weatherclass/weatherpopup.html',
						className: 'ngdialog-theme-plain ng-dialogueCustom5',
						scope : $scope,
						showClose : true,
						closeByDocument : false,
						controller : ['$scope',function($scope){
							$scope.action = actionType;
							var selectedWeather=[];
							$scope.weatherCls =[];
							if (actionType === 'Add'){							
								$scope.weatherCls.push({
									"code" : '',
									"name" : '',
									"status" : 1,
									"selected" : false
								});
							}
							else {									
								$scope.weatherCls=angular.copy(editweatherClassification)
								editweatherClassification=[];
							}
							$scope.addRows = function() {
								$scope.weatherCls.push({
									"code" : '',
									"name" : '',
									"status" : 1,
									"selected" : false
								});
							},
							$scope.saveWeathers = function() {				
								var weatherClassMap=[];
								angular.forEach($scope.weatherCls,function(value,key) {
													if(weatherClassMap[value.code]!=null){
														GenericAlertService.alertMessage('Duplicate Weather Classification  Codes  are not allowed',"Error");
														forEach.break();
														}else
															{
															weatherClassMap[value.code]=true;
															}
												});
								var req = {
									"weatherTOs" : $scope.weatherCls
								}
								
								WeatherService.saveWeathers(req).then(function(data) {
                                	 var  results =data.weatherTOs ;
									   var succMsg = GenericAlertService.alertMessageModal('WeatherClassification Details '+ data.message,data.status);
									   succMsg.then(function(data1) {			
											 var returnPopObj = {
					                                 "weatherTOs":  results                         
					                             }
											  deferred.resolve(returnPopObj); 
											 ngDialog.close();
									   })
									},function (error){
											GenericAlertService.alertMessage('WeatherClassification Details  are failed to save',"Error");
										});
								
						},
						$scope.popUpRowSelect = function(weather) {
							if (weather.selected) {
								selectedWeather.push(weather);
							} else {
								selectedWeather.pop(weather);
							}
						},$scope.deleteRows = function() {
							if(selectedWeather.length==0){
								GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
							}
							if(selectedWeather.length<$scope.weatherCls.length)
								{
								angular.forEach(selectedWeather, function(value,key) {
									$scope.weatherCls.splice($scope.weatherCls.indexOf(value), 1);
							
							
								});
								selectedWeather=[];
								GenericAlertService.alertMessage('Rows are deleted successfully',"Info");
								}else
									{
									GenericAlertService.alertMessage('Please leave atlist one row',"Warning");
									}
						}
						}]
					});
					 return deferred.promise;
				}
				 $scope.activeWeathers = function() {
						if (editweatherClassification.length <= 0) {
							GenericAlertService.alertMessage("Please select records to Activate",'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.weatherClassification = [];
						} else {
							angular.forEach(editweatherClassification, function(value,key) {
								if (value.id) {
									deleteIds.push(value.id);
								}
							});
							var req = {
								"weatherIds" : deleteIds,
								"status":1
							};
							
							WeatherService.deleteWeathers(req).then(function(data) {
									});
							angular.forEach(editweatherClassification, function(value,key) {
								GenericAlertService.alertMessage('WeatherClassification Details  are Activated succuessfully','Info');
								$scope.weatherClassification.splice($scope.weatherClassification.indexOf(value),1);
							},
							function(error) {
								GenericAlertService.alertMessage(' WeatherClassification Details  are failed to Activate',"Error");
							});
							editweatherClassification = [];
							$scope.deleteIds = [];
							
						}
					}
					 $scope.deleteWeathers = function() {
						if (editweatherClassification.length <= 0) {
							GenericAlertService.alertMessage("Please select records to Deactivate",'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.weatherClassification = [];
						} else {
							angular.forEach(editweatherClassification, function(value,key) {
								if (value.id) {
									deleteIds.push(value.id);
								}
							});
							var req = {
								"weatherIds" : deleteIds,
								"status":2
							};
							
							WeatherService.deleteWeathers(req).then(function(data) {
									});
							angular.forEach(editweatherClassification, function(value,key) {
								GenericAlertService.alertMessage('WeatherClassification Details  are Deactivated succuessfully','Info');
								$scope.weatherClassification.splice($scope.weatherClassification.indexOf(value),1);
							},
							function(error) {
								GenericAlertService.alertMessage(' WeatherClassification Details  are failed to Deactivate',"Error");
							});
							editweatherClassification = [];
							$scope.deleteIds = [];
							
						}
					}
					return service;
		});
