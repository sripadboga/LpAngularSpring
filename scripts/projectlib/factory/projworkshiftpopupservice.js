'use strict';
app
		.factory(
				'ProjWorkShiftPopupService',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjWorkShiftService, GenericAlertService) {
					var projWorkShiftPopUp;
					var service = {};
					service.projWorkShiftPopUp = function(actionType,
							selectedProject, editTableData) {
						var deferred = $q.defer();
						projWorkShiftPopUp = ngDialog
								.open({
									template : 'views/projectlib/workshift/workingshiftspopup.html',
									scope : $rootScope,
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.addTableData = [];
												var selectedWork = [];
												var emptyProjWorkShiftClassifyObj = [];
												var localprojWorkShiftTO = [];
												$scope.action = actionType;
												if (actionType === 'Edit') {
													$scope.addTableData = angular
															.copy(editTableData);
												}
												var req = {
													"status" : 1,
													"projId" : selectedProject.projId
												};
												ProjWorkShiftService
														.projWorkShiftOnLoad(
																req)
														.then(
																function(data) {
																	if (actionType === 'Add') {
																		emptyProjWorkShiftClassifyObj = data.projWorkShiftTO;
																		var localprojWorkShiftTO = angular
																				.copy(emptyProjWorkShiftClassifyObj);
																		$scope.addTableData
																				.push(localprojWorkShiftTO);
																	}
																});
														$scope.addRows = function() {
															var localprojWorkShiftTO = angular
																	.copy(emptyProjWorkShiftClassifyObj);
															$scope.addTableData
																	.push(localprojWorkShiftTO);
														},
														$scope.saveProjWorkShifts = function() {
															var req = {
																"projWorkShiftTOs" : $scope.addTableData,
																"projId" : selectedProject.projId
															};
															ProjWorkShiftService
																	.saveProjWorkShifts(
																			req)
																	.then(
																			function(
																					data) {
																				if (data.status != null
																						&& data.status !== undefined
																						&& data.status === 'Info') {
																					var projectClassTOs = data.projWorkShiftTOs;
																					var succMsg = GenericAlertService
																							.alertMessageModal(
																									'WorkingShift  Details '
																											+ data.message,
																									data.status);
																					succMsg
																							.then(
																									function(
																											popData) {
																										ngDialog
																												.close(projWorkShiftPopUp);
																										var returnPopObj = {
																											"projWorkShiftTOs" : projectClassTOs
																										};
																										deferred
																												.resolve(returnPopObj);
																									},
																									function(
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
																								'WorkingShift Details  are failed to Save',
																								'Error');
																			});
															ngDialog.close();
														},
														$scope.popUpRowSelect = function(
																tab) {
															if (tab.select) {
																selectedWork
																		.push(tab);
															} else {
																selectedWork
																		.pop(tab);
															}
														},
														$scope.deleteRows = function() {
															if (selectedWork.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedWork.length < $scope.addTableData.length) {
																angular
																		.forEach(
																				selectedWork,
																				function(
																						value,
																						key) {
																					$scope.addTableData
																							.splice(
																									$scope.addTableData
																											.indexOf(value),
																									1);
																				
																				});
																selectedStore = [];
																GenericAlertService
																.alertMessage(
																		'Rows are deleted Successfully',
																		"Info");
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}

											} ]
								});
						return deferred.promise;
					};
					return service;

				});
