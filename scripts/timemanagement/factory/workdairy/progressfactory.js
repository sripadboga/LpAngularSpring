'use strict';
app
		.factory(
				'ProgressFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						GenericAlertService) {
					var progressFactoryPopup;
					var service = {};
					service.progressFactoryPopup = function(actionType,
							editProgress) {
						var deferred = $q.defer();
						progressFactoryPopup = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/progresspopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.action = actionType;
												$scope.addProgresses = [];
												var selectedProgress = [];

												$scope.action = actionType;

												if (actionType === 'Add') {
													$scope.addProgresses
															.push({
																"select" :false,
																"sowItemId" : '',
																"sorItemId" : '',
																"soeItemId" : '',
																"costCodeId" : '',
																"workDescrp" : '',
																"unitOfMeasure" : '',
																"code1" : '',
																"code2" : '',
																"total" : '',
																"approvalStatus" : ''
															});
												} else {
													$scope.addProgresses = angular
															.copy(editProgress);
													editProgress = [];
												}

												$scope.progressDetails = function() {

													ngDialog
															.open({
																template : 'views/timemanagement/workdairy/createworkdairy/progresslist.html',

																closeByDocument : false,
																showClose : true,

																controller : [
																		'$scope',
																		function(
																				$scope) {
																			$scope.progressListDetails = '';
																			$scope.indexVal = null;
																			$scope.progressListDetails = [ {
																				"sowItemId" : ' ',
																				"sowGName" : ' ',
																				"sowSubGName" : ' ',
																				"sorItemId" : ' ',
																				"soeItemId" : ' ',
																				"desc" : ' ',
																				"costCodeId" : ' ',
																				"unitOfMeasure" : ' '
																			} ];
																		} ]

															}).closePromise
															.then(function(
																	value) {
																$scope.matDetails[value.$dialog
																		.scope().indexVal].defaultprogress = value.$dialog
																		.scope().progressList;
															});
												}
														$scope.addRows = function() {
															$scope.addProgresses
																	.push({
																		"select" :false,
																		"sowItemId" : '',
																		"sorItemId" : '',
																		"soeItemId" : '',
																		"costCodeId" : '',
																		"workDescrp" : '',
																		"unitOfMeasure" : '',
																		"code1" : '',
																		"code2" : '',
																		"total" : '',
																		"approvalStatus" : ''
																	});
														},
														$scope.progressPopupRowSelect = function(
																progress) {
															if (progress.select) {
																selectedProgress
																		.push(progress);
															} else {
																selectedProgress
																		.pop(progress);
															}
														},
														$scope.deleteRows = function() {
															if (selectedProgress.length == 0) {
																GenericAlertService
																		.alertMessage(
																				'Please select atleast one row to delete',
																				"Warning");
															}
															if (selectedProgress.length < $scope.addProgresses.length) {
																angular
																		.forEach(
																				selectedProgress,
																				function(
																						value,
																						key) {
																					$scope.addProgresses
																							.splice(
																									$scope.addProgresses
																											.indexOf(value),
																									1);
																					GenericAlertService
																							.alertMessage(
																									'Rows are deleted Successfully',
																									"Info");
																				});
																selectedProgress = [];
															} else {
																GenericAlertService
																		.alertMessage(
																				'Please leave atleast one row',
																				"Warning");
															}
														}
												$scope.saveProgress = function() {
													var req = {}
													ProgressService
															.saveProgress(req)
															.then(
																	function(
																			data) {
																		GenericAlertService
																				.alertMessage(
																						'Progress Details '
																								+ data.message,
																						data.status);
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						'Progress Details are Failed to Save ',
																						"Info");
																	});
													ngDialog.close();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
