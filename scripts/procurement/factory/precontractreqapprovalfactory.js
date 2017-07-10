'use strict';

app
		.factory(
				'ViewReqApprPopupFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractInternalService, GenericAlertService) {
					var reqApprPopupFactoryPopUp;
					var service = {};
					service.reqApprDetails = function(
							preContractId) {
						var deferred = $q.defer();
						reqApprPopupFactoryPopUp = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/externalApproval/reqapprovals.html',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.preContractReqApprList=[];
												$scope.approverUserMap = [];
												var approvalReq = {
														"contractId" : preContractId,
														"status" : 1
													};
												PreContractInternalService
															.getPreContractReqApprs(approvalReq)
															.then(
																	function(data) {
																		$scope.preContractReqApprList = data.preContractReqApprTOs;
																		$scope.approverUserMap = data.usersMap;
																	},
																	function(error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while getting PreContract approval details",
																						'Error');
																	});
											} ]
								});
						return deferred.promise;
					};
					return service;

				});
