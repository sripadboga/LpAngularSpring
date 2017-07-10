'use strict';
app
		.factory(
				'PlantFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService,PlantRegisterPopUpService,CreateWorkDiaryService) {
					var plantFactoryPopup;
					var service = {};
					service.plantFactoryPopup = function(actionType, editPlants) {
						var deferred = $q.defer();
						plantFactoryPopup = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/plantpopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addPlants = [];
												var selectedPlant = [];

												$scope.action = actionType;

												if (actionType === 'Add') {
													$scope.addPlants
															.push({
																"select" : false,
																
																"plantRegLableKeyTO" : {
																	"RegName" : null,
																	"regclsName" : null,
																	"regNum" : null,
																	"plantdes" : null,
																	"make" : null,
																	"model" : null,
																	"mobilisation" : null,
																	"plntPurchaseCat" : null
																},
																
																"code12" : '',
																"total1" : '',
																
																"code22" : '',
																"total2" : '',
																"totalAndIdle" : '',
																"approvalStatus" : ''
															});
												} else {
													$scope.addPlants = angular
															.copy(editPlants);
													editPlants = [];
												}
												$scope.addPlantRegDetails = function() {

													var plantPopup = [];
													plantPopup = PlantRegisterPopUpService
															.getPlantRegisters();
													plantPopup
															.then(
																	function(
																			data) {
																		//console.log(JSON.stringify(data.empRegisterDtlTO.name));
																		
																		plantRegLableKeyTO.RegName = data.empRegisterDtlTO.RegName;
																		plantRegLableKeyTO.regclsName = data.PlantRegisterDtlTO.regclsName;
																		plantRegLableKeyTO.regNum = data.plantRegisterDtlTO.regNum;
																		plantRegLableKeyTO.plantdes = data.empRegisterDtlTO.plantdes;
																		plantRegLableKeyTO.make = data.PlantRegisterDtlTO.make;
																		plantRegLableKeyTO.model = data.plantRegisterDtlTO.model;
																		plantRegLableKeyTO.mobilisation = data.plantRegisterDtlTO.mobilisation;
																		plantRegLableKeyTO.plntPurchaseCat = data.plantRegisterDtlTO.plntPurchaseCat;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while gettting  Employee Data",
																						'Error');
																	});
												}
													
															$scope.addPlantDetails = function() {
															$scope.addPlants
																	.push({
																		"select" : false,
																		"plantRegLableKeyTO" : {
																			"RegName" : null,
																			"regclsName" : null,
																			"regNum" : null,
																			"plantdes" : null,
																			"make" : null,
																			"model" : null,
																			"mobilisation" : null,
																			"plntPurchaseCat" : null
																		},
																	
																		"code12" : '',
																		"total1" : '',
																	
																		"code22" : '',
																		"total2" : '',
																		"totalAndIdle" : '',
																		"approvalStatus" : ''

																	});
														},
															$scope.plantPopupRowSelect = function(
															plant) {
															if (plant.select) {
																selectedPlant
																		.push(plant);
															} else {
																selectedPlant
																		.pop(plant);
															}
														},
														$scope.deletePlantRows = function() {
															if (selectedPlant.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPlant.length < $scope.addPlants.length) {
																angular
																		.forEach(
																				selectedPlant,
																				function(
																						value,
																						key) {
																					$scope.addPlants
																							.splice(
																									$scope.addPlants
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedPlant = [];
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
														$scope.savePlantDetails = function() {
															var req = {
																	"workDairyPlantDtlTOs" : $scope.workDairyPlantDtlTOs
																	
															}
															//console.log(JSON.stringify(req));
															CreateWorkDiaryService
																	.savePlants(req)
																	.then(
																			function(
																					data) {
																				
																				$scope.workDairyPlantDtlTOs = data.workDairyPlantDtlTOs
																				
																				GenericAlertService.alertMessage("Success","Info");
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'PlantUtilisation Details are Failed to Save ',
																								"Warning");
																			});
															
														}
												
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
