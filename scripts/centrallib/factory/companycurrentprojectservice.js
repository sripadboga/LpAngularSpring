'use strict';
app.factory('CompanyCurrentProjectsFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,CompanyService,GenericAlertService ) {
		var projectPopUp;
		var service = {};
		service.projectPopUp = function(actionType,editProjs,companyId) {
		var deferred = $q.defer();
		projectPopUp = 	ngDialog.open({
			template : 'views/centrallib/companylist/currentprojpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : [
					'$scope',
					function($scope) {
						var selectedProject = [];
						$scope.projectList = [];
						$scope.currentProjs = [];
						$scope.action = actionType;
						if (actionType === 'Add') {
							$scope.projectList
									.push({
										'cmpId' : companyId,
										'projId' : '',
										'projCode' : '',
										'projName' : '',
										'contractValue' : '',
										'startDate' : '',
										'finishDate' : '',
										'performance' : '',
										'status' : '1',
										'selected' : false
									});
						} else {
							$scope.projectList = angular
									.copy(editProjs);
							editProjs = [];
						}
						$scope.addRows = function() {
						$scope.projectList
						.push({
							'cmpId' : companyId,
							'projId' : '',
							'projCode' : '',
							'projName' : '',
							'contractValue' : '',
							'startDate' : '',
							'finishDate' : '',
							'performance' : '',
							'status' : '1',
							'selected' : false
						});
						}
						$scope.projdetails = function projdetails(
								index,
								selectId) {
							ngDialog
									.open({
										template : 'views/centrallib/companylist/projdetails.html',
										closeByDocument : false,
										showClose : true,
										controller : [
												'$scope',
												function(
														$scope) {
													var selectedProject = [];
													$scope.projCode = '';
													$scope.projName = '';
													$scope.projId = '';
													$scope.indexVal = null;
													$scope.currentProjsDetails = [];
													$scope.startDate = new Date();
													$scope.finishDate = new Date();
													$scope.getCurrentProjs = function() {
														var req = {
															"status" : 1
														}
														CompanyService
																.getProjectsByClient(req).then(
																		function(
																				data) {
																			$scope.currentProjsDetails = data.epsProjs;
																			console
																					.log(data);
																		});
													}
													$scope.projDetailsPopUp = function(
															projData) {
														console
																.log(projData);
														$scope.projCode = projData.projCode;
														$scope.projName = projData.projName;
														$scope.projId = projData.parentId;
														$scope.indexVal = index;
														$scope
																.closeThisDialog();
													}
												} ]
									}).closePromise
									.then(function(
											value) {
										$scope.projectList[value.$dialog
												.scope().indexVal].projCode = value.$dialog
												.scope().projCode;
										$scope.projectList[value.$dialog
												.scope().indexVal].projName = value.$dialog
												.scope().projName;
										$scope.projectList[value.$dialog
												.scope().indexVal].projId = value.$dialog
												.scope().projId;
									});
						}
								
								$scope.savePojects = function() {
									var req = {
										"companyProjectsTOs" : $scope.projectList,
										'companyId' :  companyId,
									}
									CompanyService
											.saveCompanyCurrentProjs(
													req)
											.then(
													function(
															data) {
											
														var results = data.companyProjectsTO;
														var succMsg = GenericAlertService.alertMessageModal('Project Details '+ data.message,data.status);
														       succMsg.then(function(popData) {
																			ngDialog.close(projectPopUp);
																			var returnPopObj = {
																				"companyProjectsTO" : results
																			};
																			deferred.resolve(returnPopObj);
																		});
														       ngDialog.close();
												},
												function(error) {
													GenericAlertService.alertMessage('Project Details  are failed to Save','Error');
												});
							},
								$scope.projectPopUpRowSelect = function(proj) {
									if (proj.selected) {
										selectedProject.push(proj);
									} else {
										selectedProject
												.pop(proj);
									}
								},
								$scope.deleteProjRows = function() {
									if (selectedProject.length == 0) {
										GenericAlertService
												.alertMessage(
														'Please select atlist one row to delete',
														"Warning");
									}
									if (selectedProject.length < $scope.projectList.length) {
										angular
												.forEach(
														selectedProject,
														function(
																value,
																key) {

															$scope.projectList
																	.splice(
																			$scope.projectList
																					.indexOf(value),
																			1);
										
														});
										selectedProject = [];
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
