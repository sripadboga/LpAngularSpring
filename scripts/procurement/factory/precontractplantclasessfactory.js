'use strict';

app
		.factory(
				'PreContractProjPlantClassFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjPlantClassService, GenericAlertService) {
					var projPlantClassServicepopup = [];
					var projPlantClassService = {};
					projPlantClassService.getProjPlantClasses = function(projId) {
						var deferred = $q.defer();
						projPlantClassServicepopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractplantpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.projPlantClassData = [];
														$scope.getProjPlantClasses = function() {
															var planClassReq = {
																"status" : 1,
																"projId" : projId
															};
															ProjPlantClassService
																	.getProjPlantClasses(
																			planClassReq)
																	.then(
																			function(
																					data) {
																				$scope.projPlantClassData = data.projPlantClassTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Plant classes",
																								'Error');
																			});
														},
														$scope.projPlantClassPopup = function(
																projPlantClassTO) {
															var returnPopObj = {
																"projPlantClassTO" : projPlantClassTO
															};
															deferred
																	.resolve(returnPopObj);
															$scope
																	.closeThisDialog();
														}
											} ]
								});
						return deferred.promise;
					};
					return projPlantClassService;

				});
