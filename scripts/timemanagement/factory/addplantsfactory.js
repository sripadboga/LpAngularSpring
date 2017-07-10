'use strict';

app
		.factory(
				'PlantRegisterPopUpService',
				function(ngDialog, $q, $filter, $timeout, PlantAttendanceService,
						GenericAlertService) {
					var plantDtlsPopup;
					var service = {};

					service.getPlantRegistersDtls = function() {
						var deferred = $q.defer();
						plantDtlsPopup = ngDialog
								.open({
									template : 'views/timemanagement/attendance/plantdetails.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom1',
									controller : [
											'$scope',
											function($scope) {
												$scope.plantDtls = [];
												var selectedPlantData = [];
														$scope.getPlantRegistersDtls = function() {
															var req = {
																"status" : 1
															};
															PlantAttendanceService
																	.getPlantRegisters(
																			req)
																	.then(
																			function(
																					data) {
																				console
																						.log(JSON
																								.stringify(data));
																				$scope.plantDtls = data.userProjDetailsTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'An error occurred while fetching Employee details',
																								"Error");
																			});
														},
														
														$scope.popUpRowSelect = function(
																plant) {
															if (plant.select) {
																selectedPlantData
																		.push(plant);
															} else {
																selectedPlantData
																		.pop(plant);
															}
														},
														$scope.savePlantDtls = function() {
															var savePlantDtlsReq = {
																"projEmpDtlTOs" : selectedEmpData
															};
															console
																	.log(JSON
																			.stringify(saveEmpDtlsReq));
															PlantAttendanceService
																	.savePlantDetails(
																			savePlantDtlsReq)
																	.then(
																			function(
																					data) {
																				GenericAlertService
																						.alertMessage(
																								'Plant List(s) are saved succuessfully',
																								"Info");
																				var returnPopObj = {
																					"projPlantDtlTOs" : data.projPlantDtlTOs
																				};
																				selectedPlantData = [];
																				deferred
																						.resolve(returnPopObj);
																				$scope
																						.closeThisDialog();
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Employee List(s) are failed to save',
																								"Error");
																			});
														}
											} ]
								});
						return deferred.promise;
					};
					return service;
				});