'use strict';

app
		.factory(
				'ProjNoteBookFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,ProjectSettingsService,
					 GenericAlertService) {
					var projNoteBookPopup;
					var service = {};
					service.noteBookPopupDetails = function(actionType, projId,
							editNoteBook) {
						var deferred = $q.defer();
						projNoteBookPopup = ngDialog
								.open({

									template : 'views/projectsettings/notebookpopup.html',
									className:'ngdialog-theme-plain ng-dialogueCustom5',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												var selectedProject = [];
												$scope.noteBookList = [];
												var selectedNotebooks=[];
												if (actionType === 'Add') {
													$scope.noteBookList
															.push({
																'projId' : $scope.projId,
																'selected' : false,
																'topic' : null,
																'description' : null,
																'status' : 1
															});
												} else {
													$scope.noteBookList = angular
															.copy(editNoteBook);
													editNoteBook = [];
												}
												var noteBookService = {};
												$scope.projNoteBookPopUp = function(
														tab) {
													var projNotebookPopup = noteBookService
															.getProjNoteBook();
													projNotebookPopup
															.then(
																	function(
																			data) {
																		$scope.projNoteBookDetails = data.projNoteBookTOs;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while selecting project material class Details",
																						'Error');
																	});
												}
												

														$scope.addRows = function() {

															$scope.noteBookList
																	.push({
																		'projId' : $scope.projId,
																		'selected' : false,
																		'topic' : null,
																		'description' : null,
																		'status' : 1

																	});
														},
														$scope.saveNoteBook = function() {
															var req = {
																"projNoteBookTOs" : $scope.noteBookList,
																"projId" : $scope.projId
															}
															console
																	.log(JSON
																			.stringify(req));
															ProjectSettingsService
																	.saveProjNoteBook(
																			req)
																	.then(
																			function(
																					data) {

																				var succMsg = GenericAlertService
																						.alertMessageModal(
																								'Notebook Details are saved Successfully',
																								'Info');
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'Notebook Details  are failed to save',
																								"Error");
																			});
															ngDialog.close();
														},

														$scope.notebooksPopUpRowSelect = function(
																notebooks) {
															if (notebooks.selected) {
																selectedNotebooks
																		.push(notebooks);
															} else {
																selectedNotebooks
																		.pop(notebooks);
															}
														},
														$scope.deleteProjRows = function() {
															if (selectedNotebooks.length == 0) {
																GenericAlertService
																		.alertMessage('Please select atleast one row to delete',"Warning");
															}
															if (selectedNotebooks.length < $scope.noteBookList.length) {
																angular.forEach(selectedNotebooks,function(value,key) {
																					$scope.noteBookList.splice($scope.noteBookList.indexOf(value),1);
																					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
																				});
																selectedNotebooks = [];
															} else {
																GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
															}
														}
											} ]

								});
						return deferred.promise;
					}
					return service;
				});