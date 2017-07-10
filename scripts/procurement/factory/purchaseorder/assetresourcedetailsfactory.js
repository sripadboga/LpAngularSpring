'use strict';

app
		.factory(
				'AssetResourceDeatilsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractInternalService, GenericAlertService) {
					var resourcePopup;
					var service = {};
					service.resourceDetails = function(
							projId) {
						var deferred = $q.defer();
						resourcePopup = ngDialog
								.open({
									template : 'views/procurement/purchaseorders/purchaseresourcedetails.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.resourceDetailsList=[];
												var preContractReq = {
														"projId" : projId,
														"status" : 1
													};
												PreContractInternalService
															.getInternalPreContracts(preContractReq)
															.then(
																	function(data) {
																		$scope.resourceDetailsList = data.preContractTOs;
																	});
											} ]
								});
						return deferred.promise;
					};
					return service;

				});
