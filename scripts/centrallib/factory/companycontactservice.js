'use strict';
app.factory('CompanyContactFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var companyContactPopUp;
		var service = {};
		service.companyContactPopUp = function(actionType,editContacts,companyId) {
		var deferred = $q.defer();
		companyContactPopUp = 	ngDialog.open({
			template : 'views/centrallib/companylist/addcontactspopup.html',
			closeByDocument : false,
			showClose : true,
			controller : [
					'$scope',
					function($scope) {
						var selectedContacts = [];
						$scope.contactList = [];
						$scope.action = actionType;
						if (actionType === 'Add') {
							$scope.contactList
									.push({
										'companyId' :  companyId,
										'contactName' : '',
										'email' : '',
										'mobile' : '',
										'phone' : '',
										'designation' : '',
										'status' : '1',
										'selected' : false
									});
						} else {
							$scope.contactList = angular
									.copy(editContacts);
							editContacts = [];
						}
								$scope.addRows = function() {
									$scope.contactList
											.push({
												'companyId' :  companyId,
												'contactName' : '',
												'email' : '',
												'mobile' : '',
												'phone' : '',
												'designation' : '',
												'status' : '1',
												'selected' : false
											});
								},
								$scope.saveContacts = function() {
									var req = {
										"contactsTOs" : $scope.contactList,
										'companyId' : companyId,
									};
									CompanyService.saveContacts(req).then(function(data) {
										var results = data.contactsTOs;
										var succMsg = GenericAlertService.alertMessageModal('Contact Details '+ data.message,data.status);
										       succMsg.then(function(popData) {
															ngDialog.close(companyContactPopUp);
															var returnPopObj = {
															"contactsTOs" : results
															};
															deferred.resolve(returnPopObj);
														});
										       ngDialog.close();
								},
								function(error) {
									GenericAlertService.alertMessage('Contact Details  are failed to Save','Error');
								});
			},
								$scope.contactsPopUpRowSelect = function(
										contact) {
									if (contact.selected) {
										selectedContacts
												.push(contact);
									} else {
										selectedContacts
												.pop(contact);
									}
								},
								$scope.deleteContactRows = function() {
									if (selectedContacts.length == 0) {
										GenericAlertService
												.alertMessage(
														'Please select atlist one row to delete',
														"Warning");
									}
									if (selectedContacts.length < $scope.contactList.length) {
										angular
												.forEach(
														selectedContacts,
														function(
																value,
																key) {

															$scope.contactList
																	.splice(
																			$scope.contactList
																					.indexOf(value),
																			1);
										
														});
										selectedContacts = [];
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
