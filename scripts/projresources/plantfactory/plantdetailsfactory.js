'use strict';
app
		.factory(
				'PlantDetailsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService, PlantRegisterService) {
					var plantDetailsPopUp;
					var service = {};
					service.plantDetailsPopUp = function(itemData, actionType,
							editPlantData, searchProject) {
						var deferred = $q.defer();
						plantDetailsPopUp = ngDialog
								.open({
									template : 'views/projresources/projplantreg/plantdetails/plantdetailspopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addPlantData = [];
												var selectedPlant = [];
												$scope.plantData = itemData.plantRegisterDtlTOs;
												$scope.plantClassMstrMap = itemData.plantClassMstrMap;
												$scope.procureCatgMap = itemData.procureCatgMap;
												$scope.plantCompanyMap = itemData.plantCompanyMap;
												$scope.assertTypes = itemData.assertTypes;
												if (actionType === 'Add') {
													$scope.addPlantData
															.push({
																"selected" : false,
																"assertId" : null,
																"regNumber" : null,
																"plantClassMstrLKeyTO" : {
																	id : null,
																	code : null,
																	name : null,
																	unitOfMeasure : null
																},
																"desc" : null,
																"manfacture" : null,
																"model" : null,
																"assetType" : null,
																"companyLabelKeyTO" : {
																	id : null,
																	code : null,
																	name : null
																},
																"procureCatgLabelKeyTO" : {
																	id : null,
																	code : null,
																	name : null
																}
															});
												} else {
													$scope.addPlantData = angular
															.copy(editPlantData);
													editPlantData = [];
												}
														
														$scope.addRows = function() {
															$scope.addPlantData
																	.push({
																		"selected" : false,
																		"assertId" : null,
																		"regNumber" : null,
																		"plantClassMstrLKeyTO" : {
																			id : null,
																			code : null,
																			name : null,
																			unitOfMeasure : null
																		},
																		"desc" : null,
																		"manfacture" : null,
																		"model" : null,
																		"assetType" : null,
																		"companyLabelKeyTO" : {
																			id : null,
																			code : null,
																			name : null
																		},
																		"procureCatgLabelKeyTO" : {
																			id : null,
																			code : null,
																			name : null
																		}
																	});
														},
														$scope.plantDetailsPopUpRowSelect = function(
																plant) {
															if (plant.selected) {
																selectedPlant
																		.push(plant);
															} else {
																selectedPlant
																		.pop(plant);
															}
														},
														$scope.deleteRows = function() {
															if (selectedPlant.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedPlant.length < $scope.addPlantData.length) {
																angular
																		.forEach(
																				selectedPlant,
																				function(
																						value,
																						key) {
																					$scope.addPlantData
																							.splice(
																									$scope.addPlantData
																											.indexOf(value),
																									1);
																				});
																
																selectedPlant = [];
																GenericAlertService
																.alertMessage(
																		'Rows are deleted Successfully',
																		"Info");
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
												$scope.save = function() {
													var req = {
														"plantRegisterDtlTOs" : $scope.addPlantData,
													}
													PlantRegisterService
															.savePlantRegisters(
																	req)
															.then(
																	function(
																			data) {
																		GenericAlertService
																				.alertMessage(
																						'Plant Registration '
																								+ data.message,
																						data.status);
																		console.log("Save"+JSON.stringify(selectedPlant));
																		editPlantData = [];
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Plant Registration are Failed to Save ',
																						"Error");
																	});
													ngDialog.close();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
