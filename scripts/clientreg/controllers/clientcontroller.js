'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ClientController
 * @description # Client Controller of the potApp
 */
app.config(function($stateProvider) {
			$stateProvider.state("clientreg", {
				url : '/clientReg',
				parent:'site',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/clientreg/clientview.html',
						controller : 'ClientController'
					}
				}
			})
		}).controller('ClientController',function($scope, $state, $q, ngDialog, reCAPTCHA, ClientService,GenericAlertService) {
					$scope.clients = [];
					var deferred = $q.defer();
							$scope.getClients = function() {
								var req = {
										"status": "1"
								};
								ClientService.getClients(req).then(function(data) {
											$scope.clients = data.clientRegTOs;
										},function(error){
											GenericAlertService.alertMessage("Error occured while fetching client details", 'Error');
										});
							}
							var clientpopup;
							var addClientservice = {};
							$scope.clientDetails = function(actionType) {
								clientpopup = addClientservice.addClients (actionType);
								clientpopup.then(function(data) {
											$scope.clients = data.clientRegTOs;
										},
										function(error) {
											GenericAlertService.alertMessage("Error occured while fetching client details", 'Error');
										});
							}
							addClientservice.addClients = function() {
								clientpopup = ngDialog.open({
											template : 'views/clientreg/clientregpopup.html',
										    className:'ngdialog-theme-plain ng-dialogueCustom-t',
										    scope: $scope,
										    showClose: true,
										    closeByDocument: false,
											controller : ['$scope',function($scope) {
														$scope.captcha = '';
														reCAPTCHA.setPublicKey('6LfyK-0SAAAAAAl6V9jBGQgPxemtrpIZ-SPDPd-n');
														$scope.userTO = {};
														$scope.addClient = {
																"userTO":{
																	"firstName" : null,
																	"lastName" : null,
																	"dispName" : null,
																	"userName" : null,
																	"password" : null,
																	"status":1
																},
															"code" : null,
															"name" : null,
															"businessType" : null,
															"email" : null,
															"fax" : null,
															"mobile" : null,
															"phone" : null,
															"remarks" : null,
															"maxRegUsers" : null,
															"maxActiveUsers" : null,
															"maxEPSLevel" : null,
															"maxLoginAttempts" : null,
															"mailTemplate" : null,
															"status":1
														},
														$scope.saveClient = function() {
															var req = {
																	"clientRegTO" : $scope.addClient
															}
															if($scope.addClient.maxRegUsers < $scope.addClient.maxActiveUsers){
																GenericAlertService.alertMessage('MaxRegUsers Must  be More than maxActiveUsers',"Error");
																return;
																	}else{
													ClientService.saveClient(req).then(function(data) {
														var results =data.clientRegTOs;
																	var succMsg = GenericAlertService.alertMessageModal('Client Details '+ data.message,data.status);
																	succMsg.then(function(data) {
																						var returnPopObj = {
																							"clientRegTOs" : results
																						};
																						deferred.resolve(returnPopObj);
																					},
																					function(error) {
																						GenericAlertService.alertMessage("Error occured while saving Client Details","Error");
																					});
																	ngDialog.close();
																
															});
													}
														}
													} ]
										});
								 return deferred.promise;
							},$scope.show = function(remarks) {
								ngDialog.open({
									template : 'views/clientreg/viewpopup.html',
									className:'ngdialog-theme-plain ng-dialogueCustom6',
										controller : [
											'$scope',
											function($scope) {
												$scope.remarks=remarks;
											} ]
								});
							}
							return addClientservice;
				});
