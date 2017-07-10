'use strict';

app
		.factory(
				'InvoiceDeatilsFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						PreContractInternalService, GenericAlertService) {
					var invoicePopup;
					var service = {};
					service.invoiceDetails = function(
							projId) {
						var deferred = $q.defer();
						invoicePopup = ngDialog
								.open({
									template : 'views/procurement/purchaseorders/purchaseinvoicedetails.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.preContractList=[];
												var preContractReq = {
														"projId" : projId,
														"status" : 1
													};
												PreContractInternalService
															.getInternalPreContracts(preContractReq)
															.then(
																	function(data) {
																		$scope.preContractList = data.preContractTOs;
																	});
											} ]
								});
						return deferred.promise;
					};
					return service;

				});
