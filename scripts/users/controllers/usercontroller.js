'use strict';

/**
 * @ngdoc function
 * @name potApp.controller:ModuleController
 * @description # Module Controller of the potApp
 */
app
		.config(function($stateProvider) {
			$stateProvider.state("users", {
				url : '/users',
				parent : 'site',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/users/users.html',
						controller : 'UserController'
					}
				}
			})
		})
		.controller(
				'UserController',
				function($scope, ngDialog, $q, $state, UserService,
						RoleService, GenericAlertService) {
					$scope.tabopen = 'home';
					$scope.userId = null;
					var editUsers = [];
					$scope.user = [];
					$scope.users = [];
					$scope.userProjects = [];
					var deferred = $q.defer();

					$scope.ngDialog = ngDialog, $scope.tableData = [];
					$scope.deleteIds = [];
					$scope.userReq = {
						"userName" : null,
						"empCode" : null,
						"dispName" : null,
						"status" : "1"
					}
					$scope.searchUsers = function() {
						UserService.getUsers($scope.userReq).then(function(data) {
									$scope.users = data.users
									if ($scope.users != null
											&& $scope.users.length > 0) {
									}
									else{
										GenericAlertService.alertMessage("Users are not available for given search criteria",'Warning');
									}
								},function(error) {
									GenericAlertService
									.alertMessage(
											"Error occured while getting User Details",
											'Error');
						});
					}, $scope.originUser = angular.copy($scope.resetUser);
							$scope.reset = function() {
								$scope.resetUser = angular
										.copy($scope.originUser);

							},
							$scope.resetUser = function() {
								$scope.userReq = {
									"userName" : null,
									"empCode" : null,
									"dispName" : null,
									"status" : "1"
								},
								$scope.searchUsers();
							},
							
							$scope.deleteUser = function() {
								if (editUsers.length <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select at least one user to deactivate",
													'Warning');
									return;
								}
								var userIds = [];
								var deleteIds = [];
								var nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.users = [];
								} else {
									angular.forEach(editUsers, function(
											value, key) {
										if (value.userId) {
											userIds.push(value.userId);
										}
									});
								}
								var req = {
									"userIds" : userIds,
									"status" : 2
								};
								UserService.deleteUser(req).then(
										function(data) {
										});
								GenericAlertService
										.alertMessage(
												'User Details are  Deactivated succuessfully',
												'Info');
								angular.forEach(editUsers,function(value, key) {
													$scope.users.splice($scope.users.indexOf(value),1);
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'User Details are failed to Deactivate',
																	"Error");
												});
								if (editUsers.length <= 0) {
									$scope.selectedAll = false;
								}
								editUsers = [];
								$scope.userIds = [];

							},
							$scope.rowSelect = function(user) {
								if (user.select) {
									editUsers.push(user);
								} else {
									editUsers.pop(user);
								}
							}
							
							var addservice={};
							var adduserpopup=[];
							$scope.addUsers = function(actionType) {
								adduserpopup = addservice.addUserDetails(actionType,editUsers);
								adduserpopup.then(function(data) {
											$scope.users = data.users;
											editUsers=[];
										});
							}
							addservice.addUserDetails = function(actionType,editUsersList) {
								var deferred = $q
								.defer();
								if (actionType == 'Edit'
										&& editUsersList <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								}
								ngDialog
										.open({
											template : 'views/users/adduserpopup.html',
											scope : $scope,
											className : 'ngdialog-theme-plain ng-dialogueCustom',
											showClose : true,
											closeByDocument : false,
											controller : [
													'$scope',
													function($scope) {
														$scope.action = actionType;
														$scope.addUsers = [];
														$scope.roles = [];
														var selectedUser=[];
														var req = {
															status : 1
														};
														RoleService
																.getRoles(req)
																.then(
																		function(
																				data) {
																			$scope.roles = data.roleTOs;
																		});
														$scope.updateRoles = function(
																data, user) {
															user.roleId = data.id;
														}
														if (actionType === 'Add') {
															$scope.addUsers
																	.push({
																		"userId" : null,
																		"select" : false,
																		"status" : 1,
																		"userName" : '',
																		"password" : '',
																		"empCode" : '',
																		"empDesg" : '',
																		"dispName" : '',
																		"firstName" : '',
																		"lastName" : '',
																		"email" : '',
																		"phone" : '',
																		"mobile" : '',
																		"remarks" : '',
																		"userRoles" : []
																	});
														} else {
															$scope.addUsers = angular
																	.copy(editUsersList);
															editUsersList = [];
														}
														$scope.popUpRowSelect = function(tab) {
															if (tab.select) {
																selectedUser.push(tab);
															} else {
																selectedUser.pop(tab);
															}
														},
														$scope.deleteRows = function() {
															if(selectedUser.length==0){
																GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
															}
															if(selectedUser.length<$scope.addUsers.length)
															{
															angular.forEach(selectedUser, function(value,key) {
																$scope.addUsers.splice($scope.addUsers.indexOf(value), 1);
																
															});
															selectedUser=[];
															GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
															}else
															{
																GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
																}
														},
														$scope.name = null;
														var servicevar = {};
														var popVar = [];
														$scope.rolesdisplay = function(
																user) {
															popVar = servicevar
																	.getRoles();
															var selectedRoles = [];
															var roleNameDisplay = '';
															popVar
																	.then(
																			function(
																					data) {
																				selectedRoles = data.userRoles;
																				user.userRoles=[];
																				angular
																						.forEach(
																								selectedRoles,
																								function(
																										value,
																										key) {
																									user.userRoles
																											.push(value);
																									roleNameDisplay = roleNameDisplay
																											+ value.roleName
																											+ ",";

																								});
																				user.roleDisplay=roleNameDisplay;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while selecting Roles details",
																								'Error');
																			});

														}

																servicevar.getRoles = function() {
																	var deferred = $q
																			.defer();
																	ngDialog
																			.open({
																				template : 'views/users/rolepopup.html',
																				scope : $scope,
																				className : 'ngdialog-theme-plain ng-dialogueCustom7',
																				showClose : true,
																				closeByDocument : false,
																				controller : [
																						'$scope',
																						function(
																								$scope) {
																							$scope.multiRoles = [];
																							$scope.roleLlist=angular.copy($scope.roles);
																							$scope.rolePopup = function() {
																								$scope.multiRoles = [];
																								angular
																										.forEach(
																												$scope.roleLlist,
																												function(
																														value) {
																													if (value.select) {
																														$scope.multiRoles
																																.push(value);
																													}
																												});
																								var returnPopObj = {
																									"userRoles" : $scope.multiRoles
																								};
																								$scope
																										.closeThisDialog();
																								deferred
																										.resolve(returnPopObj);
																							}
																						} ]

																			});
																	return deferred.promise;

																},
																$scope.addRows = function() {
																	$scope.addUsers
																			.push({
																				"userId" : null,
																				"select" : false,
																				"status" : 1,
																				"userName" : '',
																				"password" : '',
																				"empCode" : '',
																				"empDesg" : '',
																				"dispName" : '',
																				"firstName" : '',
																				"lastName" : '',
																				"email" : '',
																				"phone" : '',
																				"mobile" : '',
																				"remarks" : '',
																				"userRoles" : []
																			});

																},
																$scope.saveUser = function() {									
																	var req = {
																		"userTOs" : $scope.addUsers,
																	}
																	var results =[];
																	UserService.saveUser(req).then(function(data) {
							                                        	   results =data.users  ;
																		   var succMsg = GenericAlertService.alertMessageModal('User Details '+ data.message,data.status);
																		   succMsg.then(function(data1) {			
																				 var returnPopObj = {
														                                 "users":  results                         
														                             }
																				  deferred.resolve(returnPopObj); 
																		   })
																		},function (error){
																				GenericAlertService.alertMessage('User Details  are failed to save',"Error");
																			});
							                                           ngDialog.close();
															}
													} ]
										});
								return deferred.promise;
							},
							$scope.getUserProjects = function(user) {
								$scope.userProjects = [];
								var req = {
									"userId" : user.userId,
									"status" : 1
								};
								UserService
										.getUserProjects(req)
										.then(
												function(data) {
													$scope.userProjects = data.userProjDetailsTOs;
												});

							},
							$scope.assignProjects = function(userProjects) {
								var req = {
									"userProjectTOs" : userProjects
								};
								if(userProjects.length<=0){
									GenericAlertService
									.alertMessage(
											'Please select User Name  to assign projects',
											"Warning");
								}
								else{
								UserService.saveUserProjects(req).then(
												function(data) {
													GenericAlertService
															.alertMessage(
																	'Projects Assigned Successfully',
																	"Info");
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	'Projects Assigned Failed',
																	"Error");
												});
							}
							}, $scope.tabActivate = function(tabName) {
								$scope.tabopen = tabName;
							};
				});
