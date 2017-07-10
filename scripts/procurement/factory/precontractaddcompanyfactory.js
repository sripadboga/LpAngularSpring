'use strict';

app
		.factory(
				'PreContractAddCompanyFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						CompanyService, PreContractExternalService,
						GenericAlertService) {
					var projAddCompanypopup = [];
					var service = {};
					service.getCompanies = function(preContractTO, companyData,
							preContractCompanyMap) {
						var deferred = $q.defer();
						projAddCompanypopup = ngDialog
								.open({
									template : 'views/procurement/pre-contracts/externalApproval/addcompany.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												var addCompanypopup = [];
												$scope.precontractCmpData = companyData;
												$scope.preContractCompanyMap = preContractCompanyMap;
												var addService = {};

														$scope.saveCompanies = function(
																apprstatus) {
															var cmpSaveReq = {
																"preContractCmpTOs" : $scope.precontractCmpData,
																"preContractId" : preContractTO.id,
																"apprstatus" : apprstatus
															};
															PreContractExternalService
																	.savePreContratCompanies(
																			cmpSaveReq)
																	.then(

																			function(
																					data) {
																				$scope.precontractCmpData = data.preContractCmpTOs;
																				var preContractCompanies = {
																					"preContractCmpTOs" : $scope.precontractCmpData
																				};
																				deferred
																						.resolve(preContractCompanies);
																				$scope
																						.closeThisDialog();
																				GenericAlertService
																						.alertMessage(
																								"Precontract companies are added Successfully",
																								"Info");
																			},

																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Internal Approval Failed To save",
																								"Error");
																			});
														},
														$scope.addCompanyRows = function() {
															var addCompanyServiceData = $scope
																	.getCompanies();
															addCompanyServiceData
																	.then(function(
																			data) {
																		var addCompanypopup = $scope
																				.addCompaniesToPrecontract(
																						$scope.precontractCmpData,
																						data.addcompanyData);
																		addCompanypopup
																				.then(
																						function(
																								data) {

																							angular
																									.forEach(
																											data.companyTOs,
																											function(
																													value,
																													key) {
																												value.select = false;
																												$scope.precontractCmpData
																														.push({
																															companyId : value.id,
																															status : 1
																														});
																											});

																						},
																						function(
																								error) {
																							GenericAlertService
																									.alertMessage(
																											"Error occured while adding companies to precontract",
																											'Error');
																						});

																	});

														},

														$scope.getCompanies = function() {
															var companyList = [];
															var exitingCompaniesMap = [];
															var addcompanyData = [];
															var getcompanyDefer = $q
																	.defer();
															var cmpReq = {
																"status" : 1,
															};

															CompanyService
																	.getCompanies(
																			cmpReq)
																	.then(
																			function(
																					data) {
																				companyList = angular
																						.copy(data.companyTOs);
																				angular
																						.forEach(
																								$scope.precontractCmpData,
																								function(
																										value,
																										key) {
																									if (value.companyId != null
																											&& value.companyId > 0) {
																										exitingCompaniesMap[value.companyId] = true;
																									}
																								});
																				angular
																						.forEach(
																								companyList,
																								function(
																										value,
																										key) {
																									if (!exitingCompaniesMap[value.id]) {
																										addcompanyData
																												.push(value);
																									}
																								});

																				var returnCompanies = {
																					"addcompanyData" : angular
																							.copy(addcompanyData),
																				};
																				getcompanyDefer
																						.resolve(returnCompanies);
																			});

															return getcompanyDefer.promise;

														},
														$scope.addCompaniesToPrecontract = function(
																precontractCmpData,
																addcompanyData) {
															var deferred = $q
																	.defer();
															addCompanypopup = ngDialog
																	.open({
																		template : 'views/procurement/pre-contracts/externalApproval/precontractaddcompanypopup.html',
																		closeByDocument : false,
																		showClose : true,
																		controller : [
																				'$scope',
																				function(
																						$scope) {
																					$scope.addcompanyData = addcompanyData;
																					var selectedCompanies = [];

																							$scope.addCompanyRowSelect = function(
																									company) {
																								if (company.select) {
																									selectedCompanies
																											.push(company);
																								} else {
																									selectedCompanies
																											.pop(company);
																								}
																							},
																							$scope.addCompaniesToPrecontract = function() {
																								var returnCompanies = {
																									"companyTOs" : angular
																											.copy(selectedCompanies)
																								};
																								selectedCompanies = [];
																								deferred
																										.resolve(returnCompanies);
																								$scope
																										.closeThisDialog();
																							}
																				} ]
																	});
															return deferred.promise;

														}

											} ]
								});
						return deferred.promise;
					};
					return service;

				});