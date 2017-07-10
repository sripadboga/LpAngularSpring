'use strict';
app.factory('CompanyAddressFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var companyAddressPopUp;
		var service = {};
		service.companyServiceAddressPopUp = function(actionType,editAddress,companyId) {
		var deferred = $q.defer();
		companyAddressPopUp = 	ngDialog.open({
			template : 'views/centrallib/companylist/addaddresspopup.html',
			closeByDocument : false,
			showClose : true,
			controller : [
					'$scope',
					function($scope) {
						var selectedAddress = [];
						$scope.addressList = [];
						$scope.action = actionType;
						if (actionType === 'Add') {
							$scope.addressList
									.push({
										'companyId' : companyId,
										'address' : '',
										'city' : '',
										'state' : '',
										'pincode' : '',
										'status' : '1',
										'selected' : false
									});
						} else {
							$scope.addressList = angular
									.copy(editAddress);
							editAddress = [];
						}
								$scope.addRows = function() {
									$scope.addressList
											.push({
												'companyId' :  companyId,
												'address' : '',
												'city' : '',
												'state' : '',
												'pincode' : '',
												'status' : '1',
												'selected' : false
											});
								},
								$scope.saveAddress = function() {
									var req = {
										"addressTOs" : $scope.addressList,
										'companyId' : companyId,
									}
									CompanyService.saveAddress(req).then(function(data) {
												var results = data.addressTOs;
												var succMsg = GenericAlertService.alertMessageModal('Address Details '+ data.message,data.status);
												       succMsg.then(function(popData) {
																	ngDialog.close(companyAddressPopUp);
																	var returnPopObj = {
																		"addressTOs" : results
																	};
																	deferred.resolve(returnPopObj);
																});
												       ngDialog.close();
										},
										function(error) {
											GenericAlertService.alertMessage('Address Details  are failed to Save','Error');
										});
					},
								$scope.addressPopUpRowSelect = function(
										address) {
									if (address.selected) {
										selectedAddress
												.push(address);
									} else {
										selectedAddress
												.pop(address);
									}
								},
								$scope.deleteAddressRows = function() {
									if (selectedAddress.length == 0) {
										GenericAlertService
												.alertMessage(
														'Please select atlist one row to delete',
														"Warning");
									}
									if (selectedAddress.length < $scope.addressList.length) {
										angular
												.forEach(
														selectedAddress,
														function(
																value,
																key) {

															$scope.addressList
																	.splice(
																			$scope.addressList
																					.indexOf(value),
																			1);
										
														});
										selectedAddress = [];
										GenericAlertService.alertMessage('Rows are Deleted successfully',"Info");
									} else {
										GenericAlertService
												.alertMessage(
														'Please leave atlist one row',
														"Warning");
									}
								}
					} ]
		});
						return deferred.promise;
					}
					return service;
				});
