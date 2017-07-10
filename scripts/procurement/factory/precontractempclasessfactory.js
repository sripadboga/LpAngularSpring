'use strict';

app
		.factory(
				'PreContractProjEmpClassFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjEmpClassService, GenericAlertService) {
					var projEmpClassServicepopup = [];
					var projEmpClassService = {};
					projEmpClassService.getProjEmpClasses = function(projId) {
						var deferred = $q.defer();
						projEmpClassServicepopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractemppopup.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.projEmpClassData = [];
														$scope.getProjEmpClasses = function() {
															var empClassReq = {
																"status" : 1,
																"projId" : projId
															};
															ProjEmpClassService
																	.getProjEmpClasses(
																			empClassReq)
																	.then(
																			function(
																					data) {
																				$scope.projEmpClassData = data.projEmpClassTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Project Employee classes",
																								'Error');
																			});
														},
														$scope.projEmpClassPopup = function(
																projEmpTO) {

															var returnPopObj = {
																"projEmpclassTO" : projEmpTO
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
					return projEmpClassService;

				});
