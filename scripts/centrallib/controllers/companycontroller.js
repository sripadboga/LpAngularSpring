'use strict';

/**
 * @ngdoc function
 * @name potApp.controller : CompanyController
 * @description # CompanyController of the potApp
 */
app.config(function($stateProvider) {
					$stateProvider
							.state(
									"company",
									{
										url : '/company',
										parent : 'site',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/centrallib/companylist/companylist.html',
												controller : 'CompanyController'
											}
										}
									})
				})
		.controller(
				'CompanyController',
				function($rootScope, $scope, $q, $state, ngDialog,
						CompanyService, CompanyAddressFactory,
						CompanyContactFactory, CompanyCurrentProjectsFactory,
						GenericAlertService) {
					$rootScope.compId = null;
					var companyId = null;
					var editCompanies = [];
					$scope.companies = [];
					$scope.deleteIds = [];
					$scope.address = [];
					var deferred = $q.defer();
					$scope.contacts = [];
					var editAddress = [];
					var editContacts = [];
					var editProjs = [];
					$scope.companyReq = {
						'cmpCode ' : null,
						'cmpName ' : null,
						'status' : '1'
					};
					$scope.activeFlag = 0;
							$scope.companySearch = function() {
								$scope.selectCompany =[];
								$scope.activeFlag = 0;
								$scope.address = [];
								$scope.currentProjs = [];
								$scope.closedProjs = [];
								$scope.contacts = [];
								CompanyService.getCompanies($scope.companyReq)
										.then(
												function(data) {
													$scope.activeFlag = 0;
													$scope.companies = data.companyTOs;
													if ($scope.companies != null
															&& $scope.companies.length > 0) {
														if ($scope.companies[0].status == 1) {
															$scope.activeFlag = 1;
														} else if ($scope.companies[0].status == 2) {
															$scope.activeFlag = 2;
														}
													}
													else{
														GenericAlertService
														.alertMessage(
																'Companies are not available for given search criteria',
																"Warning");
													}
													
												});
							},
							$scope.contacts = [];
					$scope.reset = function() {
						$scope.companyReq = {
							'cmpCode ' : null,
							'cmpName ' : null,
							'status' : '1'
						}
						$scope.activeFlag = 0;
						$scope.companySearch();
					}, $scope.rowSelect = function(company) {
						if (company.selected) {
							$scope.contacts = [];
							$scope.address = [];
							$scope.currentProjs = [];
							$scope.closedProjs = [];
							editCompanies.push(company);
						} else {
							editCompanies.pop(company);
						}
					}, $scope.selectCompany = function(companyId) {
						$scope.activeFlag = 0;
						if (companyId.selected) {
							$scope.getCmpAddress(companyId);
						} else {
							GenericAlertService.alertMessage(
									'Please select at least one row to edit',
									"Warning");
						}
					}
					    $scope.setSelected = function(row) {
					    	 $scope.selectedRow = row;
					    }
					var companyservice = {};
					var companyPopUp;
					$scope.addCompanies = function(actionType) {
						$scope.contacts = [];
						$scope.address = [];
						$scope.currentProjs = [];
						$scope.closedProjs = [];
						companyPopUp = companyservice.addCompany(actionType);
						companyPopUp
								.then(
										function(data) {
											$scope.companies = data.companyTOs;
											$scope.cmpCatagories = data.companyCatgResp.companyCatagoryTOs;
											$scope.businessData = data.businessActResp.businessActivityTOs;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting Company details",
															'Error');
										});
					}
							companyservice.addCompany = function(actionType) {
								if (actionType == 'Edit'
										&& editCompanies.length === 0) {
									GenericAlertService.alertMessage('Please select at least one row to edit',"Warning");
									return;
								}
								companyPopUp = ngDialog
										.open({
											template : 'views/centrallib/companylist/addcompanypopup.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														var selectedCompany = [];
														$scope.companyList = [];
														$scope.businessData = [];
														$scope.cmpCatagories = [];
														$scope.action = actionType;
														if (actionType === 'Add') {
															$scope.rowSelect =[];
															$scope.companyList
																	.push({
																		'cmpCode' : '',
																		'cmpName' : '',
																		"clientId" :$scope.clientId,
																		'status' : '1',
																		'regNo' : '',
																		'taxFileNo' :'',
																		'selected' : false
																	});
														} else {
															$scope.companyList = angular
																	.copy(editCompanies);
															editCompanies = [];
														}
														var req = {
															"status" : 1
														}
														CompanyService
																.onLoadDataForCompany(
																		req)
																.then(
																		function(
																				data) {
																			$scope.cmpCatagories = data.companyCatgResp.companyCatagoryTOs;
																			$scope.businessData = data.businessActResp.businessActivityTOs;
																		},
																		function(error) {
																			GenericAlertService
																					.alertMessage(
																							'Error occured while fetching onload data',
																							"Error");
																		});
																$scope.addRows = function() {
																	$scope.companyList
																			.push({
																				'cmpCode' : '',
																				'cmpName' : '',
																				"clientId" :$scope.clientId,
																				'status' : '1',
																				'regNo' : '',
																				'taxFileNo' :'',
																				'selected' : false
																			});
																},
																$scope.updateCatgCode = function(
																		data,
																		company) {
																	console
																			.log(data);
																	company.catgId = data.id;
																},
																$scope.updateBussCode = function(data,company) {
																	company.busActId = data.id;
																	company.businessActivityTO.code = data.code;
																	company.businessActivityTO.desc = data.desc;
																},
																$scope.saveCompany = function() {
																		var companyMap=[];
																		angular.forEach($scope.companyList,function(value,key) {
																							if(companyMap[value.cmpCode]!=null){
																								GenericAlertService.alertMessage('Duplicate Company Codes  are not allowed',"Error");
																								forEach.break();
																								}else
																									{
																									companyMap[value.cmpCode]=true;
																									}
																						});
																	var req = {
																		"companyTOs" : $scope.companyList,
																		"clientId" :$scope.clientId
																	}
																	var results = [];
																	CompanyService.saveCompany(req).then(function(data) {
																						results = data.companyTOs;
																						var succMsg = GenericAlertService.alertMessageModal('Company Details '	+ data.message,	data.status);
																						succMsg.then(function(data) {
																									var returnPopObj = {
																										"companyTOs" : results
																									}
																									deferred.resolve(returnPopObj);
																								})
																					},
																					function(
																							error) {
																						GenericAlertService
																								.alertMessage(
																										'Company Details    are failed to save',
																										"Error");
																					});
																	ngDialog
																			.close();
																},
																$scope.popUpRowSelect = function(
																		company) {
																	if (company.selected) {
																		selectedCompany
																				.push(company);
																	} else {
																		selectedCompany
																				.pop(company);
																	}
																},
																$scope.deleteRows = function() {
																	if (selectedCompany.length == 0) {
																		GenericAlertService
																				.alertMessage(
																						'Please select atlist one row to delete',
																						"Warning");
																	}
																	if (selectedCompany.length < $scope.companyList.length) {
																		angular
																				.forEach(
																						selectedCompany,
																						function(
																								value,
																								key) {

																							$scope.companyList
																									.splice(
																											$scope.companyList
																													.indexOf(value),
																											1);

																					
																						});
																		selectedCompany = [];
																		GenericAlertService
																				.alertMessage(
																						'Rows are Deleted successfully',
																						"Info");
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
							},

							$scope.deleteCompanies = function() {
								if (editCompanies.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var delIds = [];
								var nondelIds = [];
								if ($scope.selectedAll) {
									$scope.companies = [];
								} else {
									angular.forEach($scope.companies, function(
											value, key) {
										if (!value.selected) {
											nondelIds.push(value);
										} else {
											if (value.id != null
													&& value.id > 0) {
												delIds.push(value.id);
											}
										}
									});
									var req = {
										"companyIds" : delIds,
										"status" : 2
									};
									CompanyService.deleteCompanies(req).then(
											function(data) {
											}, function(error) {
											});
									GenericAlertService
											.alertMessage(
													'Company Details are Deactivated successfully',
													'Info');
									angular
											.forEach(
													editCompanies,
													function(value, key) {
														$scope.companies
																.splice(
																		$scope.companies
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Company Details are failed to Deactivate',
																		"Error");
													});
									editCompanies = [];
									$scope.delIds = [];
								}
							},
							$scope.activeCompanies = function() {
								if (editCompanies.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Activate",
													'Warning');
									return;
								}
								var delIds = [];
								var nondelIds = [];
								if ($scope.selectedAll) {
									$scope.companies = [];
								} else {
									angular.forEach($scope.companies, function(
											value, key) {
										if (!value.selected) {
											nondelIds.push(value);
										} else {
											if (value.id != null
													&& value.id > 0) {
												delIds.push(value.id);
											}
										}
									});
									var req = {
										"companyIds" : delIds,
										"status" : 1
									};
									CompanyService.deleteCompanies(req).then(
											function(data) {
											}, function(error) {
											});
									GenericAlertService
											.alertMessage(
													'Company Details are Activated successfully',
													'Info');
									angular
											.forEach(
													editCompanies,
													function(value, key) {
														$scope.companies
																.splice(
																		$scope.companies
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Company Details are failed to Activate',
																		"Error");
													});
									editCompanies = [];
									$scope.delIds = [];
								}
							},

							$scope.tabs = [
									{
										title : 'Address',
										url : 'views/centrallib/companylist/address.html'
									},
									{
										title : 'Contacts',
										url : 'views/centrallib/companylist/contacts.html'
									},
									{
										title : 'Closed Projects',
										url : 'views/centrallib/companylist/closedprojects.html'
									},
									{
										title : 'Current Projects',
										url : 'views/centrallib/companylist/currentprojects.html'
									} ];
					$scope.currentTab = 'views/centrallib/companylist/address.html';

					$scope.onClickTab = function(tab) {
						$scope.currentTab = tab.url;
					}
					$scope.isActiveTab = function(tabUrl) {
						return tabUrl == $scope.currentTab;
					},

					$scope.isActiveRow = function(tabUrl) {
						return tabUrl == $scope.currentRow;
					},

					$scope.editAddress = [];
					$scope.address = [];
					$scope.company = [];
					$scope.addressLists = [];
					$scope.contactsList = [];
					$scope.closedProjs = [];
					$scope.currentProjs = [];
					$scope.contacts = [];

							$scope.getCmpAddress = function(companyId) {

								$rootScope.compId = companyId;
								var req = {
									"cmpId" : companyId,
									"status" : $scope.companyReq.status
								}
								CompanyService
										.getCompanyDetails(req)
										.then(
												function(data) {
													$scope.company = data.companyTOs;
													console.log(data);
													angular
															.forEach(
																	$scope.company,
																	function(
																			value) {
																		$scope.address = value.addressList;
																		$scope.contacts = value.contacts;
																		$scope.closedProjs = value.closedProjs;
																		$scope.currentProjs = value.currentProjs;
																	});
												});

							}, $scope.addressRowSelect = function(address) {
								if (address.selected) {
									editAddress.push(address);
								} else {
									editAddress.pop(address);
								}
							}
							$scope.addAddress = function(actionType) {
								companyId = $rootScope.compId;
								if (actionType == 'Edit' && editAddress <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (companyId != undefined
										&& companyId != null) {
									var compAddrPopup = CompanyAddressFactory
											.companyServiceAddressPopUp(
													actionType, editAddress,
													companyId);
									compAddrPopup
											.then(
													function(data) {
														$scope.address = data.addressTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching company address details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select Company ID",
											'Warning');
								}
							},
							$scope.deleteAddress = function() {
								if (editAddress.length <= 0) {
									GenericAlertService.alertMessage(
											"please select records to delete",
											'Error');
									return;
								}
								var delAddrIds = [];
								var nondelAddrIds = [];
								if ($scope.selectedAll) {
									$scope.address = [];
								} else {
									angular.forEach($scope.address, function(
											value, key) {
										if (!value.selected) {
											nondelAddrIds.push(value);
										} else {
											if (value.addressId != null
													&& value.addressId > 0) {
												delAddrIds
														.push(value.addressId);
											}
										}
									});
									var req = {
										"addressIds" : delAddrIds,
										"status" : 2
									};
									CompanyService.deleteAddress(req).then(
											function(data) {
											});
									GenericAlertService
											.alertMessage(
													'Address Details are Deactivated successfully',
													'Info');
									angular
											.forEach(
													editAddress,
													function(value, key) {
														$scope.address
																.splice(
																		$scope.address
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Address Details are failed to Deactivate',
																		"Error");
													});
									editAddress = [];
									$scope.delAddrIds = [];
								}
							}, $scope.contactsRowSelect = function(contact) {
								if (contact.selected) {
									editContacts.push(contact);
								} else {
									editContacts.pop(contact);
								}
							}
							$scope.addContacts = function(actionType) {
								companyId = $rootScope.compId;
								if (actionType == 'Edit' && editContacts <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (companyId != undefined
										&& companyId != null) {
									var compContPopup = CompanyContactFactory
											.companyContactPopUp(actionType,
													editContacts, companyId);
									compContPopup
											.then(
													function(data) {
														$scope.contacts = data.contactsTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching company contact details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select Company ID",
											'Warning');
								}
							},
							/*
							 * $scope.addContacts = function(contactActionType) {
							 * if (contactActionType == 'Edit' &&
							 * editContacts.length === 0) { GenericAlertService
							 * .alertMessage( 'Please select atleast one row to
							 * edit', "Warning"); return; } },
							 */
							$scope.deleteContacts = function() {
								if (editContacts.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								if ($scope.selectedAll) {
									$scope.contacts = [];
								} else {
									angular.forEach(editContacts, function(
											value, key) {
										deleteIds.push(value.contactId);
									});
									var req = {
										"contactIds" : deleteIds,
										"status" : 2
									};
									CompanyService.deleteContacts(req).then(
											function(data) {
											});
									GenericAlertService
											.alertMessage(
													'Contact Details are Deactivated successfully',
													'Info');
									angular
											.forEach(
													editContacts,
													function(value, key) {

														$scope.contacts
																.splice(
																		$scope.contacts
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Contact Details are failed to Deactivate',
																		"Error");
													});
									editContacts = [];
									deleteIds = [];
								}
							}

							$scope.moveToClosedProj = function() {
								var moveToClosedProjs = [];
								angular.forEach(editProjs,
										function(value, key) {
											moveToClosedProjs.push(value);
										});
								var req = {
									"companyProjectsTOs" : moveToClosedProjs,
									"status" : 2
								};

								CompanyService
										.moveToToCmpClosedProjs(req)
										.then(
												function(data) {
													$scope.currentProjs = data.companyProjectsTO;
													GenericAlertService
															.alertMessage(
																	' This project is moved to closed projects',
																	'Info');
													editProjs = [];

												});

							}, $scope.currentProjRowSelect = function(proj) {
								if (proj.selected) {
									editProjs.push(proj);
								} else {
									editProjs.pop(proj);
								}
							}
							$scope.addProjs = function(actionType) {
								companyId = $rootScope.compId;
								if (actionType == 'Edit' && editProjs <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atleast one row to edit',
													"Warning");
									return;
								} else if (companyId != undefined
										&& companyId != null) {
									var compProjectPopup = CompanyCurrentProjectsFactory
											.projectPopUp(actionType,
													editProjs, companyId);
									compProjectPopup
											.then(
													function(data) {
														$scope.currentProjs = data.companyProjectsTO;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error occurred while fetching company projects details",
																		'Error');
													});
								} else {
									GenericAlertService.alertMessage(
											"Please select Company ID",
											'Warning');
								}
							},
							$scope.deleteCompanyCurrentProjs = function() {
								if (editProjs.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								if ($scope.selectedAll) {
									$scope.currentProjs = [];
								} else {
									angular.forEach(editProjs, function(value,
											key) {
										deleteIds.push(value.id);
									});
									var req = {
										"cmpProjIds" : deleteIds,
										"status" : 2
									};
									CompanyService.deleteCompanyCurrentProjs(
											req).then(function(data) {
									});
									GenericAlertService.alertMessage(
													'Contact Details are Deactivated successfully',
													'Info');
									angular
											.forEach(
													editProjs,
													function(value, key) {
														$scope.currentProjs.splice($scope.currentProjs.indexOf(value),1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Contact Details are failed to Deactivate',
																		"Error");
													});
									editProjs = [];
									deleteIds = [];
								}
							}
					return companyservice;
				});