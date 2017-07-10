'use strict';
app
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"emptransfer",
									{
										url : '/emptransfer',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projresources/projempreg/emptransfer/emptransfer.html',
												controller : 'EmpTransferController'
											}
										}
									})
				})
		.controller(
				"EmpTransferController",
				function($rootScope, $scope, $state, ngDialog,
						UserEPSProjectService, EmpTransferCreateReqFactory, 
						GenericAlertService, EmpTransferFactory, EmpTransferService) {

					$scope.searchProject = {};
					$scope.empTransferDetails = {};

							$scope.getUserProjects = function() {
								var userProjectSelection = UserEPSProjectService
										.epsProjectPopup();
								userProjectSelection
										.then(
												function(userEPSProjData) {
													$scope.searchProject = userEPSProjData.selectedProject;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting EPS Project name",
																	'Error');
												});
							},
							$scope.resetSearchData = function() {
								$scope.searchProject = {};
								$scope.empTransferDetails = {};
							},
							$scope.getEmpDetails = function(projId) {
								if(projId == undefined || projId == null){
									GenericAlertService
									.alertMessage(
											"Please Select Project ID First",
											'Warning');
								}else{
								var empDetailsPopUp = EmpTransferFactory.getEmpTransferDetailsPopup(projId);
								empDetailsPopUp.then(function(empDetails){
										$scope.searchEmployee = empDetails.selectedEmployee;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occured while selecting Employee name",
																	'Error');
												});
									}
							},
							$scope.createEmpRequest = function(actionType){
									if (actionType == 'Edit' && editEmpDetails <= 0) {
										GenericAlertService
												.alertMessage(
														"Please select atlist one row to edit",
														'Warning');
										return;
									}

									var empReqPopUp = EmpTransferCreateReqFactory
											.empCreateReqPopUp(actionType);
									empReqPopUp
											.then(
													function(data) {
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching employee details",
																		'Error');
													});
								}
				});