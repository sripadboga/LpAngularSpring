'use strict';

app
		.factory(
				'PreContractMaterialClassFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjMaterialClassService, GenericAlertService) {
					var projMaterialClassServicepopup = [];
					var service = {};
					service.getProjMaterialClasses = function(projId) {
						var deferred = $q.defer();
						projMaterialClassServicepopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractmaterialpopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.projMaterialClassData = [];
														$scope.getProjMaterialClasses = function() {
															var materialClassReq = {
																"status" : 1,
																"projId" : projId
															};
															ProjMaterialClassService
																	.getProjMaterialClasses(
																			materialClassReq)
																	.then(
																			function(
																					data) {
																				$scope.projMaterialClassData = data.projMaterialClassTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Material classes",
																								'Error');
																			});
														},
														$scope.projMaterialClassPopup = function(
																projMaterialClassTO) {
															var returnPopObj = {
																"projMaterialclassTO" : projMaterialClassTO
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
					return service;

				});