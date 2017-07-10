'use strict';
app.factory('ProjectCrewPopupService',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjectSettingsService, GenericAlertService) {
					var crewServicePopup = [];
					var crewService = {};
							crewService.crewDetailsList = function(projCrewTOs) {
								var deferred = $q.defer();
								crewServicePopup = ngDialog
										.open({
											template : 'views/projectsettings/crewlist.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {		
														$scope.crews = projCrewTOs;
														$scope.crewlistpopup = function(crewData) {
															var returnPopObj = {
																"projCrewTO" : crewData
															};
															deferred.resolve(returnPopObj);
															$scope.closeThisDialog();
														}
													} ]
										});
								return deferred.promise;
							},
							crewService.getCrewPopup = function (req){
								var deferred = $q.defer();
								var prjcrewListPromise = ProjectSettingsService.getProjCrewLists(req);
								prjcrewListPromise.then(function(data) {
									var projCrewTOs= [];
									projCrewTOs = data.projCrewTOs ;
									var crewSerivcePopup  = crewService.crewDetailsList(projCrewTOs);
									crewSerivcePopup.then(function(data) {
										var returnPopObj = {
												"projCrewTO" : data.projCrewTO
											};
											deferred.resolve(returnPopObj);
									},function(error) {
										GenericAlertService.alertMessage("Error occured while selecting Crew List Details",'Error');
									})
								},function(error) {
								  	GenericAlertService.alertMessage("Error occured while getting Crew List Details","Error");
								});
								return deferred.promise;
							},
							crewService.approverDetailsList = function(projId) {
								var deferred = $q.defer();
								ngDialog
										.open({
											template : 'views/projectsettings/supervisorlist.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.approvers = [];
														var approverReq = {
															"status" : 1,
															"projId" : projId
														};
														ProjectSettingsService
																.getProjUsers(
																		approverReq)
																.then(
																		function(
																				data) {
																			$scope.approvers = data.users;
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occured while getting Supervisor Details",
																							"Error");
																		});
														$scope.approverslistpopup = function(
																approverData) {
															var returnPopObj = {
																"projApproverTO" : approverData
															};
															deferred
																	.resolve(returnPopObj);
															$scope
																	.closeThisDialog();
														}
													} ]
										});
								return deferred.promise;
							},
							crewService.getNotificationDetailsByModuleCode = function(moduleCode,projId) {
								var deferred = $q.defer();
								ngDialog
										.open({
											template : 'views/projectsettings/notifications.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.notifications = [];
														var notificationsReq = {
															"status" : 1,
															"moduleCode" : moduleCode,
															"projId" : projId
														};
														console
																.log(JSON
																		.stringify(notificationsReq));
														ProjectSettingsService
																.getNotifications(
																		notificationsReq)
																.then(
																		function(
																				data) {
																			console.log("notifications"+JSON.stringify(data));
																			$scope.notifications = data.notificationTOs;
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occured while getting Notification Details",
																							"Error");
																		});
														$scope.notifiNumberListPopUp = function(
																notificationData) {
															var returnPopObj = {
																"projNotificationTO" : notificationData
															};
															deferred
																	.resolve(returnPopObj);
															$scope
																	.closeThisDialog();
														}
													} ]
										});
								return deferred.promise;
							},
							crewService.projctDetailList = function(projId) {
								var deferred = $q.defer();
								ngDialog
										.open({
											template : 'views/projectsettings/projectlist.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.projects = [];
														var getProjects = {
															"status" : 1,
															"projId" : projId
														};
														ProjectSettingsService
																.getEPSDetails(
																		getProjects)
																.then(
																		function(
																				data) {
																			$scope.projects = data.ePSProjectTOs;
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occured while getting Project Details",
																							"Error");
																		});
														$scope.projectPopUpList = function(
																projectData) {
															var returnPopObj = {
																"projEPSTO" : projectData
															};
															deferred
																	.resolve(returnPopObj);
															$scope
																	.closeThisDialog();
														}
													} ]
										});
								return deferred.promise;
							}
					return crewService;
				});