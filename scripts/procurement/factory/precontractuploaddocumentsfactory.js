'use strict';

app
		.factory(
				'PrecontractDocUploadFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,$http,
						FileUploader, PreContractInternalService,
						GenericAlertService) {
					var reqApprPopupFactoryPopUp;
					var service = {};
					service.uplodPreContractDocs = function(preContractId) {
						var contractDoocumentPopup = [];
						contractDoocumentPopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/internalApproval/precontractsdocs.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												var selectedDocuments = [];
												$scope.preContractDocsTOs = [];
												$scope.files = [];
														$scope.addPrecontractDocs = function() {
															$scope.preContractDocsTOs
																	.push({
																		"select" : false,
																		"name" : null,
																		"mimeType" : null,
																		"preContractId" : preContractId,
																		"version" : null,
																		"preContractDocContentTOs" : [ ]
																	});
														},
														$scope.uploadFileToUrl = function() {
															var file = $scope.files;
															var fd = new FormData();
															fd
																	.append(
																			'myFile',
																			file,
																			'filename.ext');
															console.log(JSON.stringify(fd));
															$http
																	.post(
																			backendUrl,
																			fd,
																			{
																				transformRequest : angular.identity,
																				headers : {
																					'Content-Type' : undefined
																				}
																			})

																	.success(
																			function() {
																			})

																	.error(
																			function() {
																			});
														},
														$scope.getFileDetails = function(
																e) {
															$scope
																	.$apply(function() {
																		alert(e.files.length);
																		for (var i = 0; i < e.files.length; i++) {
																			$scope.files
																					.push(e.files[i])
																		}

																	});
														},

														$scope.deletePrecontractDocs = function() {
															var tempInternalRequest = [];
															var flag = false;
															angular
																	.forEach(
																			$scope.preContractDocsTOs,
																			function(
																					value,
																					key) {
																				if (!value.select) {
																					tempInternalRequest
																							.push(value);
																				} else {
																					flag = true;
																				}
																			});
															if (!flag) {
																GenericAlertService
																		.alertMessage(
																				"please select records to delete",
																				"Warning");

															}
															$scope.preContractDocsTOs = tempInternalRequest;

														},

														$scope.documentRowSelect = function(
																document) {
															if (document.select) {
																selectedDocuments
																		.push(document);
															} else {
																selectedDocuments
																		.pop(document);
															}

														},
														$scope.savePreContractDocuments = function() {

															var saveDocreq = {
																"preContractDocsTOs" : $scope.preContractDocsTOs

															};
															console
																	.log(JSON
																			.stringify(saveDocreq));
															PreContractInternalService
																	.savePreContratDocuments(
																			saveDocreq)
																	.then(
																			function(
																					data) {
																				console
																						.log(data);
																				GenericAlertService
																						.alertMessage(
																								"Success",
																								"Info");
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"error");
																			});

														}
											} ]
								});

					};
					return service;

				});
