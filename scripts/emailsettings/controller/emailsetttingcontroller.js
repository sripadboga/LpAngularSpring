'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:EmailSettingController
 * @description # EmailSetting Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state("emailSettings", {
				url : '/emailSettings',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/emailsettings/emailSettings.html',
						controller : 'EmailSettingController'
					}
				}
			})
		})
		.controller(
				'EmailSettingController',
				function($scope, ngDialog, $state, $q, EmailSettingService,
						GenericAlertService) {
					$scope.resetUser = {
						"status" : 1
					};
					$scope.tableData = [];
					var deleteIds = [];
							$scope.getEmailSettings = function() {
								var req = {
									"status" : 1
								};
								EmailSettingService
										.getEmailSettings(req)
										.then(
												function(data) {
													$scope.tableData = data.emailSettingTOs;
												});
							},
							$scope.rowselect = function(tab) {
								if (tab.select) {
									deleteIds .push(tab.id);
								} else {
									deleteIds .pop(tab.id);
								}
							},
							$scope.deactivateEmailSettings = function() {
								if (deleteIds == undefined
										|| deleteIds.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atleast one Email Setting to deactivate",
													'Warning');
									return;
								}
								var req = {
									"emailSettingIds" : deleteIds ,
									"status" : 2
								};
								EmailSettingService
										.deactivateEmailSettings(req)
										.then(
												function(data) {
													$scope.tableData = data.emailSettingTOs;
													GenericAlertService
															.alertMessage(
																	'Email Settings are deactivated succuessfully',
																	"Info");
													deleteIds =[];
												},
												function(
														error) {
													GenericAlertService
															.alertMessage(
																	'Email Settings  are failed to deactivate',
																	"Error");
												});
							}
							
							
							var addEmailservice = {};
							var emailSettingPopUp;
							var deferred = $q.defer();
							
							$scope.editEmailDetails =  function(actionType,
									editData) {
								emailSettingPopUp = addEmailservice.addEmailDetails(actionType,
										editData);
							}
							addEmailservice.addEmailDetails =  function(actionType,
									editData) {
								
								emailSettingPopUp = ngDialog
										.open({
											template : 'views/emailsettings/emailsettingspopup.html',
											scope : $scope,
											className : 'ngdialog-theme-plain ng-dialogueCustom7',
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														$scope.action = actionType;
														$scope.emailSetting = {
															host : null,
															port : null,
															fromEmail : null,
															userName : null,
															password : null,
															status : 1
														};
														var req = {
															status : 1
														};
														if ($scope.action === 'Edit') {
															$scope.emailSetting = angular.copy(editData);
														}
														$scope.saveEmailSettings = function() {
															var saveReq = {
																"emailSettingTOs" : [ $scope.emailSetting ]
															};
															EmailSettingService
																	.saveEmailSettings(
																			saveReq)
																	.then(
																			function(
																					data) {
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					var emailTOs = data.emailSettingTOs;
																					var succMsg = GenericAlertService
																					.alertMessageModal(
																							'Email Setting Details '
																									+ data.message,
																							data.status);
																					succMsg
																					.then(
																							function(
																									data) {
																								
																								var returnPopObj = {
																									"emailSettingTOs" : emailTOs
																								};
																								deferred
																										.resolve(returnPopObj);
																							},function(
																									error) {
																								GenericAlertService
																										.alertMessage(
																												"Error occurred while closing popup",
																												'Info');
																							});
																				}
																			},
																			
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Email Settings  are failed to save',
																								"Error");
																			});
																				
															ngDialog.close();
														}
													} ]
										});
							}

				});
