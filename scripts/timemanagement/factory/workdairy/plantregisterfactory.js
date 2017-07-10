'use strict';

app
		.factory(
				'PlantRegisterPopUpService',
				function(ngDialog, $q, $filter, $timeout, PlantRegisterService,
						GenericAlertService) {
					var plantDtlsPopup;
					var plantRegservice = {};

					plantRegservice.getPlantRegisters = function() {
						var deferred = $q.defer();
						plantDtlsPopup = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/plantlist.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom1',
									controller : [
											'$scope',
											function($scope) {
											
												$scope.plantListDetails = [];
														$scope.getPlantRegisters = function() {
															var req = {
																"status" : 1
															};
															PlantRegisterService
																	.getPlantRegisters(
																			req)
																	.then(
																			function(
																					data) {
																				/*console
																						.log(JSON
																								.stringify(data));*/
																				$scope.plantListDetails = data.plantRegisterDtlTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'An error occurred while fetching Employee details',
																								"Error");
																			});
															$scope.plantregpopup = function(
																	plantRegisterDtlTO) {
																var returnPopObj = {
																	"plantRegisterDtlTO" : plantRegisterDtlTO
																};
																deferred
																		.resolve(returnPopObj);
																$scope
																		.closeThisDialog();
															}
														}
														
							
											} ]
								});
						return deferred.promise;
					};
					return plantRegservice;
				});