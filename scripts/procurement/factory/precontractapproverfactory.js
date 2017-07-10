'use strict';

app
		.factory(
				'PreContractApproverFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						CompanyService, PreContractInternalService,
						GenericAlertService) {
					var approverUserPopup = [];
					var service = {};
					service.getUsersByModulePermission = function() {
						var deferred = $q.defer();
						approverUserPopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractapprover.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.approverUserList = [];
												var addService = {};

														$scope.getUsersByModulePermission = function() {
															var workGetReq = {
																"moduleCode" : "PROCURMT",
																"actionCode" : "APPROVE",
															};
															PreContractInternalService
																	.getUsersByModulePermission(workGetReq)
																	.then(
																			function(
																					data) {
																				$scope.approverUserList = data.users;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while gettting workflow status",
																								'Error');
																			});
														},
														$scope.addApproverToPrecontract = function(
																approverUserTO) {
															var returnApproverUserTO = {
																"approverUserTO" : approverUserTO
															};
															deferred
																	.resolve(returnApproverUserTO);
															$scope
																	.closeThisDialog();
														}

											} ]
								});
						return deferred.promise;
					};
					return service;

				});