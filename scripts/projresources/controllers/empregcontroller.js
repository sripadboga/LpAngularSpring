'use strict';
app 
		.config(
				function($stateProvider) {
					$stateProvider
							.state(
									"employeeregistor",
									{
										url : '/employeeregistor',
										data : {
											roles : []
										},
										views : {
											'content@' : {
												templateUrl : 'views/projresources/projempreg/empregtabs/empreg.html',
												controller : 'EmpRegController'
											}
										}
									})
				})
		.controller(
				"EmpRegController",
				function($rootScope, $scope, $q, $state, ngDialog,
						EmpDetailsFactory, EmpRequestApprovalFactory,
						EmpApprovalTransferFactory, EmpNewRequestFactory,
						EmpStatusFactory, ProjEmpClassService,
						NextOfKinFactory, EmployeeContactFactory,
						LeaveAndAttendenceFactory, MedicalHistoryFactory,
						ProvidentFoundFactory, BankAccountFactory,
						PayDeductionTaxFactory, NonRegularPayFactory,
						regularPayFactory, ChargeOutRatesFactory,
						EmpEnrollmentFactory, EmpServiceHistoryFactory,
						GenericAlertService, UserEPSProjectService, $location,
						EmpRegisterService) {

					// Line Numbers
					// Emp Registers = 141 - 287
					// Emp Promotions = 470 - 570
					// Emp Services History =

					$scope.searchProject = {};

					$scope.empDetails = [];
					var editEmpDetails = [];

					$scope.empPromotions = [];
					var editEmpPromotion = [];

					$scope.empChargeRates = [];
					var editEmpChargeRates = [];

					$scope.empRegularPayDetails = [];
					var editEmpRegularPay = [];

					$scope.empMedicalHistory = [];
					var editEmpMedicalHistory = [];

					$scope.empNonRegularPayDetails = [];
					var editEmpNonRegularPay = [];

					$scope.empPayDeductionTax = [];
					var editEmpPayDeductionTax = [];

					$scope.empBankAccountDetails = [];
					var editEmpBankAccountDetails = [];

					$scope.empRequestTransfer = [];
					var editEmpRequestTransfer = [];

					$scope.empProvidentFund = [];
					var editEmpProvidentFund = [];

					$scope.empServiceHistory = [];
					var editEmpServiceHistory = [];

					$scope.empAttendanceData = [];
					var editEmpAttendence = [];

					$scope.empContactDetails = [];
					var editEmpContactDetails = [];
					
					var empMapData = [];
					
					$scope.empNOK = [];
					var editEmpNOK = [];

					$scope.empStatus = [];
					var editEmpStatus = [];

					$scope.empApprovalTransfer = [];
					var editEmpApprovalTransfer = [];

					$scope.empReqApproval = [];
					var editEmpRequestApproval = [];
					$scope.empDetails = [];

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
								$scope.empDetails = [];
							},
							$scope.employeeSearch = function() {
								var empReq = {
									"status" : 1,
								};
								EmpRegisterService
										.getEmpregisters(empReq)
										.then(
												function(data) {
													$scope.empDetails = data.empRegisterDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error Occured While Getting Employess",
																	'Error');
												});
								EmpRegisterService
								.empRegisterOnLoad(empReq)
								.then(
										function(data) {
											empMapData = data;
											$scope.empCompanyMap = data.empCompanyMap;
											$scope.emppocureMentCatgMap = data.emppocureMentCatgMap;
											$scope.empClassMap = data.empempClassMap;
											$scope.genderList = data.genders;
											$scope.empLocalityList = data.localites;
											$scope.employeeTypeList = data.empTypes;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error Occured While Getting Employess",
															'Error');
										});
							},
						
							$scope.empDeltailsRowSelect = function(employee) {
								if (employee.selected) {
									editEmpDetails.push(employee);
								} else {
									editEmpDetails.pop(employee);
								}
							}
							$scope.addEmp = function(actionType) {
								if (actionType == 'Edit' && editEmpDetails <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit",
													'Warning');
									return;
								}

								var empdetailsPopup = EmpDetailsFactory
										.empDetailsFactoryPopUp(empMapData,
												editEmpDetails, actionType,$scope.searchProject);
								empdetailsPopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching employee details",
																	'Error');
												});

							},
							$scope.deactivateEmpRegisters = function() {
								if (editEmpDetails.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empDetails = [];
								} else {
									angular.forEach(editEmpDetails, function(
											value, key) {
										deleteIds.push(value.id);
									});
									var req = {
										"empRegIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deactivateEmpRegisters(
											req).then(function(data) {
									});
									angular
											.forEach(
													editEmpDetails,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Details are  Deactivated successfully',
																		'Info');
														$scope.empDetails
																.splice(
																		$scope.empDetails
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Details are failed to Deactivate',
																		"Error");
													});
									editEmpDetails = [];
									$scope.deleteIds = [];
								}
							},

							$scope.empDetailsTabs = [
									{
										title : 'Employee Details',
										url : 'views/projresources/projempreg/empdetails/empdetails.html',
										innerTabs : [
												{
													title : 'Enrollment(s)/Promotion(s)',
													url : 'views/projresources/projempreg/emppromotion/enrollmentpromotion.html'
												},
												{
													title : 'Employee Service History',
													url : 'views/projresources/projempreg/empservicehistory/empservicehistory.html'
												},
												{
													title : 'Charge Out Rates',
													url : 'views/projresources/projempreg/chargerate/chargeoutrates.html'
												},
												{
													title : 'Regular Payable Rates',
													url : 'views/projresources/projempreg/empregularpay/regularpay.html'
												},
												{
													title : 'Non-Regular Payable Rates',
													url : 'views/projresources/projempreg/empnonregularpay/nonregularpay.html'
												},
												{
													title : 'Pay Deductions,Tax & Exemption',
													url : 'views/projresources/projempreg/paydeduction/applicablepaydeduction_tax.html'
												},
												{
													title : 'Bank Account Details',
													url : 'views/projresources/projempreg/bankaccountdetails/bankaccountdetails.html'
												},
												{
													title : 'Super annuation / provident fund',
													url : 'views/projresources/projempreg/empprovident/empprovident.html'
												},
												{
													title : 'Medical History',
													url : 'views/projresources/projempreg/medicalhistory/medicalrecords.html'
												},
												{
													title : 'Leave and Attendance',
													url : 'views/projresources/projempreg/leave&attendence/leave_attendancerecords.html'
												},
												{
													title : 'Employee Contact Details',
													url : 'views/projresources/projempreg/contactdetails/empcontactdetails.html'
												},
												{
													title : 'NOK (Next of Kin)  Details',
													url : 'views/projresources/projempreg/nok/nok.html'
												},
												{
													title : 'Request for Transfer',
													url : 'views/projresources/projempreg/empregtabs/reqfortransfertabs.html',
													requestForTransferTabs : [
															{
																title : 'New Request',
																url : 'views/projresources/projempreg/newrequest/empnewrequest.html'

															},
															{
																title : 'Pending Approval',
																url : 'views/projresources/projempreg/newreqapproval/newreqapproval.html'
															},
															{
																title : 'Approved',
																url : 'views/projresources/projempreg/newreqapproved.html'
															} ]
												},
												{
													title : 'Approval for Transfer',
													url : 'views/projresources/projempreg/empregtabs/approvalfortransfertabs.html',
													approvalForTransferTabs : [
															{
																title : 'Pending Approval List',
																url : 'views/projresources/projempreg/approvaltransfer/approvaltransfer.html'

															},

															{
																title : 'Approved List',
																url : 'views/projresources/projempreg/approvedfortransfer.html'
															} ]
												} ]

									},
									{
										title : 'Current Status',
										url : 'views/projresources/projempreg/empstatus/currentstatus.html'
									} ];

					$scope.showabout = 1;
					$scope.go = function(employee) {
						$scope.empId = employee.id;
						$scope.showabout = 2;
						$scope.onClickInnerTab($scope.empDetailsTabs[0].innerTabs[0]);
					};
					$scope.Back = function() {
						$scope.showabout = 1;
					};

					$scope.currentInnerTab = $scope.empDetailsTabs[0].innerTabs[0].url;
							$scope.onClickInnerTab = function(innerTabs) {
								if ($scope.empDetailsTabs[0].innerTabs[0].url === innerTabs.url) {
									$scope.getEmpEnrollments();
								}
								if ($scope.empDetailsTabs[0].innerTabs[1].url === innerTabs.url) {
									$scope.getEmpServiceHistory();
								}
								if ($scope.empDetailsTabs[0].innerTabs[2].url === innerTabs.url) {
									$scope.getEmpChargeOutRates();
								}
								if ($scope.empDetailsTabs[0].innerTabs[3].url === innerTabs.url) {
									$scope.getEmpRegularPayDetails();
								}
								if ($scope.empDetailsTabs[0].innerTabs[4].url === innerTabs.url) {
									$scope.getEmpNonRegularPayDetails();
								}
								if ($scope.empDetailsTabs[0].innerTabs[5].url === innerTabs.url) {
									$scope.getEmpTaxDetails();
								}
								if ($scope.empDetailsTabs[0].innerTabs[6].url === innerTabs.url) {
									$scope.getEmpbankAccountDetails();
								}
								if ($scope.empDetailsTabs[0].innerTabs[7].url === innerTabs.url) {
									$scope.getEmpPFData();
								}
								if ($scope.empDetailsTabs[0].innerTabs[8].url === innerTabs.url) {
									$scope.getEmpMedicalData();
								}
								if ($scope.empDetailsTabs[0].innerTabs[9].url === innerTabs.url) {
									$scope.getEmpMedicalData();
								}
								if ($scope.empDetailsTabs[0].innerTabs[10].url === innerTabs.url) {
									$scope.getEmpContactDetails();
								}
								if ($scope.empDetailsTabs[0].innerTabs[11].url === innerTabs.url) {
									$scope.getEmpNOKDetails();
								}
								$scope.currentInnerTab = innerTabs.url;
							},
							$scope.isActiveInnerTab = function(innerTabsUrl) {
								return innerTabsUrl == $scope.currentInnerTab;
							},
					/* =========Request for Transfer tabs======= */
					$scope.currentReqApprovalTab = 'views/projresources/projempreg/newrequest/empnewrequest.html';
							$scope.onClickReqApprovalTab = function(
									requestForTransferTabs) {
								$scope.currentReqApprovalTab = requestForTransferTabs.url;
							},
							$scope.isActiveReqApprovalTab = function(
									requestForTransferTabsUrl) {
								return requestForTransferTabsUrl == $scope.currentReqApprovalTab;
							}
					/* =========Approval for Transfer tabs======= */
					$scope.currentApprovalTransferTab = 'views/projresources/projempreg/approvaltransfer/approvaltransfer.html';
							$scope.onClickApprovalTransferTab = function(
									approvalForTransferTabs) {
								$scope.currentApprovalTransferTab = approvalForTransferTabs.url;
							},
							$scope.isActiveApprovalTransferTab = function(
									approvalForTransferTabsUrl) {
								return approvalForTransferTabsUrl == $scope.currentApprovalTransferTab;
							}
					$scope.moreFlag = 0;
							$scope.clickMore = function(moreFlag1) {
								if ($scope.moreFlag > 0) {
									$scope.moreFlag = moreFlag1 - 1;
								}
								$scope
										.onClickInnerTab($scope.empDetailsTabs[0].innerTabs[0]);
							},
							$scope.clickMore1 = function(moreFlag1) {
								if ($scope.moreFlag < 1) {
									$scope.moreFlag = moreFlag1 + 1;
								} else {
									$scope.moreFlag = moreFlag1 - 1;
								}
								$scope
										.onClickInnerTab($scope.empDetailsTabs[0].innerTabs[6]);
							},
							$scope.clickMore2 = function(moreFlag1) {
								if ($scope.moreFlag < 2) {
									$scope.moreFlag = moreFlag1 + 1;
								}
								$scope
										.onClickInnerTab($scope.empDetailsTabs[0].innerTabs[12]);
							},

							// ENROLMENT / PROMOTION DATA

							$scope.getEmpEnrollments = function() {
								var getEmpEnrollmentsReq = {
									"status" : 1,
									"empId" : $scope.empId,
								};
								console.log(JSON
										.stringify(getEmpEnrollmentsReq));
								EmpRegisterService
										.getEmpEnrollments(getEmpEnrollmentsReq)
										.then(
												function(data) {
													console
															.log("projEmpEnrollemnts"
																	+ JSON
																			.stringify(data.projEmpRegisterTOs));
													$scope.empPromotions = data.projEmpRegisterTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error Occured While Getting Employee Enrollement Details",
																	'Error');
												});
							},
							$scope.empPromotionRowSelect = function(promotion) {
								if (promotion.selected) {
									editEmpPromotion.push(promotion);
								} else {
									editEmpPromotion.pop(promotion);
								}
							},

							$scope.addPromotions = function(actionType) {
								if (actionType == 'Edit'
										&& editEmpPromotion <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select altlist one row to edit",
													'Warning');
									return;
								}
								var empEnrolePopup = EmpEnrollmentFactory
										.empEnrollmentPopUp(actionType,
												editEmpPromotion);
								empEnrolePopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching Enrollment details",
																	'Error');
												});
							},
							$scope.deactivatePromotions = function() {
								if (editEmpPromotion.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empPromotions = [];
								} else {
									angular.forEach(editEmpPromotion, function(
											value, key) {
										deleteIds.push(value.id);
									});
									var deactivateEmpEnrollementReq = {
										"empIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deactivatePromotions(
											deactivateEmpEnrollementReq).then(
											function(data) {
											});
									angular
											.forEach(
													editEmpPromotion,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Enrollment and Promotions Details are   Deactivated successfully',
																		'Info');
														$scope.empPromotions
																.splice(
																		$scope.empPromotions
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Enrollment and Promotions Details are failed to Deactivate',
																		"Error");
													});
									editEmpPromotion = [];
									$scope.deleteIds = [];
								}
							},

							// Service History

							$scope.getEmpServiceHistory = function() {
								var getEmpServiceHistoryReq = {
									"status" : 1,
									"empId" : $scope.empId,
								};
								console.log(JSON
										.stringify(getEmpServiceHistoryReq));
								EmpRegisterService
										.getEmpServiceHistory(
												getEmpServiceHistoryReq)
										.then(
												function(data) {
													console
															.log("getEmpServiceHistory"
																	+ JSON
																			.stringify(data));
													$scope.empServiceHistory = data.projEmpRegisterTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error Occured While Getting Employee Servoice History Details",
																	'Error');
												});
							},
							$scope.empServiceHistoryRowSelect = function(
									servicehistory) {
								if (servicehistory.selected) {
									editEmpServiceHistory.push(servicehistory);
								} else {
									editEmpServiceHistory.pop(servicehistory);
								}
							},
							$scope.addEmpServiceHistory = function(actionType) {
								if (actionType == 'Edit'
										&& editEmpServiceHistory <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit",
													'Warning');
									return;
								}

								var serviceHistoryPopup = EmpServiceHistoryFactory
										.empServiceHistoryPopUp(actionType,
												editEmpServiceHistory);
								serviceHistoryPopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp service history  details",
																	'Error');
												});
							},
							$scope.deactivateEmpServiceHistory = function() {
								if (editEmpServiceHistory.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empServiceHistory = [];
								} else {
									angular.forEach(editEmpServiceHistory,
											function(value, key) {
												deleteIds.push(value.id);
											});
									var deactivateEmpServiceReq = {
										"empIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deactivatePromotions(
											deactivateEmpServiceReq).then(
											function(data) {
											});
									angular
											.forEach(
													editEmpServiceHistory,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Enrollment / Promotion Details are   Deactivated successfully',
																		'Info');
														$scope.empServiceHistory
																.splice(
																		$scope.empServiceHistory
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Enrollment / Promotion Details are failed to Deactivate',
																		"Error");
													});
									editEmpServiceHistory = [];
									$scope.deleteIds = [];
								}
							},
							
							//================CHARGE OUT RATE===================
							
							$scope.getEmpChargeOutRates = function(){
								var getEmpChargeOutRatesReq = {
										"status" : 1,
										"empId" : $scope.empId,
									};
									console.log(JSON
											.stringify(getEmpChargeOutRatesReq));
									EmpRegisterService
											.getEmpChargeOutRates(
													getEmpChargeOutRatesReq)
											.then(
													function(data) {
														console
																.log("getEmpChargeOutRates"
																		+ JSON
																				.stringify(data));
														$scope.empChargeRates = data.projEmpRegisterTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error Occured While Getting Employee Charge Out Rate Details",
																		'Error');
													});
							},
							
					$scope.empChargeOutRowSelect = function(charge) {
						if (charge.selected) {
							editEmpChargeRates.push(charge);
						} else {
							editEmpChargeRates.pop(charge);
						}
					},

					$scope.deactivateChargeOutrates = function() {
						if (editEmpChargeRates.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.empChargeRates = [];
						} else {
							angular.forEach(editEmpChargeRates, function(value,
									key) {
								deleteIds.push(value.id);
							});
							var deactivateEmpChargeReq = {
								"empIds" : deleteIds,
								"status" : 2
							};
							EmpRegisterService.deactivateEmpChargeOutRates(deactivateEmpChargeReq).then(
									function(data) {
									});
							angular
									.forEach(
											editEmpChargeRates,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Employee Charge Out Rates are Deactivated successfully',
																'Info');
												$scope.empChargeRates
														.splice(
																$scope.empChargeRates
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Employee Charge Out Rates are failed to Deactivate',
																"Error");
											});
							editEmpChargeRates = [];
							$scope.deleteIds = [];
						}
					}

					$scope.addChargeOutrate = function(actionType) {
						if (actionType == 'Edit' && editEmpChargeRates <= 0) {
							GenericAlertService.alertMessage(
									"please select atlist one row to edit",
									'Warning');
							return;
						}
						var chargeOuopup = ChargeOutRatesFactory
								.chargeOutRatesPopUp(actionType,
										editEmpChargeRates);
						chargeOuopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp chargeout rate details",
															'Error');
										});
					},
					
			//============Regular Pay and allowable payable allowances====================
					
					$scope.getEmpRegularPayDetails = function(){
						var getEmpRegularPayReq = {
								"status" : 1,
								"empId" : $scope.empId,
							};
							console.log(JSON
									.stringify(getEmpRegularPayReq));
							EmpRegisterService
									.getEmpRegPayAllowances(
											getEmpRegularPayReq)
									.then(
											function(data) {
												console
														.log("getEmpRegPayAllowances"
																+ JSON
																		.stringify(data));
												$scope.empRegularPayDetails = data.projEmpRegisterTOs;
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error Occured While Getting Employee Regular Payment Details",
																'Error');
											});
					},
					
					$scope.allowanceRowSelect = function(regpay) {
						if (regpay.selected) {
							editEmpRegularPay.push(regpay);
						} else {
							editEmpRegularPay.pop(regpay);
						}
					}
					$scope.deleteRegularPay = function() {
						if (editEmpRegularPay.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.empRegularPayDetails = [];
						} else {
							angular.forEach(editEmpRegularPay, function(value,
									key) {
								deleteIds.push(value.id);
							});
							var req = {
								"empIds" : deleteIds,
								"status" : 2
							};
							EmpRegisterService.deleteRegularPay(req).then(
									function(data) {
									});
							angular
									.forEach(
											editEmpRegularPay,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Employee RegularPay and Allowance Details  Deactivated successfully',
																'Info');
												$scope.empRegularPayDetails
														.splice(
																$scope.empRegularPayDetails
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Employee RegularPay and Allowance Details failed to Deactivate',
																"Error");
											});
							editEmpRegularPay = [];
							$scope.deleteIds = [];
						}
					}
					$scope.addRegularPay = function(actionType) {
						if (actionType == 'Edit' && editEmpRegularPay <= 0) {
							GenericAlertService.alertMessage(
									"Please  select atlist one row to edit",
									'Warning');
							return;
						}
						var regularpopup = regularPayFactory.regularPayPopUp(
								actionType, editEmpRegularPay);
						regularpopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp regularpay and allowance details",
															'Error');
										});
					},
					
					//=========Non Regular Pay and allowable payable allowances===========
					
					$scope.getEmpNonRegularPayDetails = function(){
						var getEmpNonRegularPayReq = {
								"status" : 1,
								"empId" : $scope.empId,
							};
							console.log(JSON
									.stringify(getEmpNonRegularPayReq));
							EmpRegisterService
									.getEmpNonRegPayments(
											getEmpNonRegularPayReq)
									.then(
											function(data) {
												console
														.log("getEmpNonRegularPayReq"
																+ JSON
																		.stringify(data));
												$scope.empNonRegularPayDetails = data.projEmpRegisterTOs;
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error Occured While Getting Employee Non Regualr Payment Details",
																'Error');
											});
					},
					$scope.NonRegularAllowanceRowSelect = function(nonregpay) {
						if (nonregpay.selected) {
							editEmpNonRegularPay.push(nonregpay);
						} else {
							editEmpNonRegularPay.pop(nonregpay);
						}
					},
					$scope.deactivateNonRegularPay = function() {
						if (editEmpNonRegularPay.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.empNonRegularPayDetails = [];
						} else {
							angular.forEach(editEmpNonRegularPay, function(
									value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"empIds" : deleteIds,
								"status" : 2
							};
							EmpRegisterService.deleteNonRegularPay(req).then(
									function(data) {
									});
							angular
									.forEach(
											editEmpNonRegularPay,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Employee Non RegularPay and Allowance Details  Deactivated successfully',
																'Info');
												$scope.empNonRegularPayDetails
														.splice(
																$scope.empNonRegularPayDetails
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Employee Non RegularPay and Allowance Details failed to Deactivate',
																"Error");
											});
							editEmpNonRegularPay = [];
							$scope.deleteIds = [];
						}
					},
					$scope.addNonRegularPay = function(actionType) {
						if (actionType == 'Edit' && editEmpNonRegularPay <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}
						var nonregularpopup = NonRegularPayFactory
								.nonRegFactoryPopUp(actionType,
										editEmpNonRegularPay);
						nonregularpopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp non-regularpay and allowance details",
															'Error');
										});
					},
					
					//============Applicable Pay deduction Tax=================
					
					$scope.getEmpTaxDetails = function(){
						var getEmpTaxReq = {
								"status" : 1,
								"empId" : $scope.empId,
							};
							console.log(JSON
									.stringify(getEmpTaxReq));
							EmpRegisterService
									.getEmpTax(
											getEmpTaxReq)
									.then(
											function(data) {
												console
														.log("getEmpTax"
																+ JSON
																		.stringify(data));
												$scope.empPayDeductionTax = data.projEmpRegisterTOs;
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																"Error Occured While Getting Employee Non Regualr Payment Details",
																'Error');
											});
					},
					$scope.payDeductionRowSelect = function(deduction) {
						if (deduction.selected) {
							editEmpPayDeductionTax.push(deduction);
						} else {
							editEmpPayDeductionTax.pop(deduction);
						}
					},
					$scope.deletePayDeduction = function() {
						if (editEmpPayDeductionTax.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.empPayDeductionTax = [];
						} else {
							angular.forEach(editEmpPayDeductionTax, function(
									value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"empIds" : deleteIds,
								"status" : 2
							};
							EmpRegisterService.deletePayDeduction(req).then(
									function(data) {
									});
							angular
									.forEach(
											editEmpPayDeductionTax,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Employee PayDeduction Tax Details  Deactivated successfully',
																'Info');
												$scope.empPayDeductionTax
														.splice(
																$scope.empPayDeductionTax
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Employee PayDeduction Tax Details failed to Deactivate',
																"Error");
											});
							editEmpPayDeductionTax = [];
							$scope.deleteIds = [];
						}
					},

					$scope.addPayDeduction = function(actionType) {
						if (actionType == 'Edit' && editEmpPayDeductionTax <= 0) {
							GenericAlertService.alertMessage(
									"Please select atlist one row to edit",
									'Warning');
							return;
						}
						var paydeductiontaxPopup = PayDeductionTaxFactory
								.paydeductiontaxPopUp(actionType,
										editEmpPayDeductionTax);
						paydeductiontaxPopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp pay deduction tax details",
															'Error');
										});
					},
						//=================Bank Account Details===========================
							
							$scope.getEmpbankAccountDetails = function() {
								var getBankAccountReq = {
									"status" : 1,
									"empId" : $scope.empId,
								};
								EmpRegisterService
										.getEmpBankAccountDetails(
												getBankAccountReq)
										.then(
												function(data) {
													$scope.empBankAccountDetails = data.empBankAccountDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error Occured While Getting Employee Bank Account Details",
																	'Error');
												});
								
							}, $scope.backAccountRowSelect = function(account) {
								if (account.selected) {
									editEmpBankAccountDetails.push(account);
								} else {
									editEmpBankAccountDetails.pop(account);
								}
							}
							$scope.deactivateBankAccountDtls = function() {
								if (editEmpBankAccountDetails.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empBankAccountDetails = [];
								} else {
									angular.forEach(editEmpBankAccountDetails,
											function(value, key) {
												deleteIds.push(value.id);
											});
									var req = {
										"empBankAccountIds" : deleteIds,
										"status" : 2
									};
									console.log(JSON.stringify(req));
									EmpRegisterService
											.deactivateBankAccDetails(req)
											.then(function(data) {
											});
									angular
											.forEach(
													editEmpBankAccountDetails,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Bank Account Details  Deactivated successfully',
																		'Info');
														$scope.empBankAccountDetails
																.splice(
																		$scope.empBankAccountDetails
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee  Bank Account  Details failed to Deactivate',
																		"Error");
													});
									editEmpBankAccountDetails = [];
									$scope.deleteIds = [];
								}
							},

							$scope.addBankAccDetails = function(actionType) {
								if (actionType == 'Edit'
										&& editEmpBankAccountDetails <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit",
													'Warning');
									return;
								}

								var bankAccountPopup = BankAccountFactory
										.bankAccountFactoryPopUp(actionType,
												editEmpBankAccountDetails,
												$scope.empId);
								bankAccountPopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp bank account  details",
																	'Error');
												});
							},
							
							//==========Employee Provident Fund============
							
							$scope.getEmpPFData = function(){
								var getEmpPFReq = {
										"status" : 1,
										"empId" : $scope.empId,
									};
									console.log(JSON.stringify(getEmpPFReq));
									EmpRegisterService
											.getEmpPFDetails(
													getEmpPFReq)
											.then(
													function(data) {
														$scope.empProvidentFund = data.empBankAccountDtlTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error Occured While Getting Employee Provident Fund Details",
																		'Error');
													});
							},
							
							$scope.providentFoundRowSelect = function(providentfund) {
								if (providentfund.selected) {
									editEmpProvidentFund.push(providentfund);
								} else {
									editEmpProvidentFund.pop(providentfund);
								}
							}
							$scope.deletePayDeductionFund = function() {
								if (editEmpProvidentFund.length <= 0) {
									GenericAlertService.alertMessage(
											"please select records to Deactivate",
											'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empProvidentFund = [];
								} else {
									angular.forEach(editEmpProvidentFund, function(
											value, key) {
										deleteIds.push(value.id);
									});
									var req = {
										"empIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deletePayDeductionFund(req)
											.then(function(data) {
											});
									angular
											.forEach(
													editEmpProvidentFund,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Provident Fund Details  Deactivated successfully',
																		'Info');
														$scope.empProvidentFund
																.splice(
																		$scope.empProvidentFund
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee  Provident Fund  Details failed to Deactivate',
																		"Error");
													});
									editEmpProvidentFund = [];
									$scope.deleteIds = [];
								}
							}
							$scope.addFund = function(actionType) {
								if (actionType == 'Edit' && editEmpProvidentFund <= 0) {
									GenericAlertService.alertMessage(
											"Please select atlist one row to edit",
											'Warning');
									return;
								}
								var provideantfoundPopup = ProvidentFoundFactory
										.providentFoundFactoryPopUp(actionType,
												editEmpProvidentFund);
								provideantfoundPopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp provident fund  details",
																	'Error');
												});
							},

							//============Medical Records===============

							$scope.getEmpMedicalData = function(){
								var getEmpMedicalReq = {
										"status" : 1,
										"empId" : $scope.empId,
									};
									console.log(JSON.stringify(getEmpMedicalReq));
									EmpRegisterService
											.getEmpMedicalHistory(
													getEmpMedicalReq)
											.then(
													function(data) {
														$scope.empMedicalHistory = data.empBankAccountDtlTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error Occured While Getting Employee Provident Fund Details",
																		'Error');
													});
							},
							
							$scope.medicalRecordsRowSelect = function(medicalrecords) {
								if (medicalrecords.selected) {
									editEmpMedicalHistory.push(medicalrecords);
								} else {
									editEmpMedicalHistory.pop(medicalrecords);
								}
							},
							$scope.deleteMedicalRecord = function() {
								if (editEmpMedicalHistory.length <= 0) {
									GenericAlertService.alertMessage(
											"please select records to Deactivate",
											'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empMedicalHistory = [];
								} else {
									angular.forEach(editEmpMedicalHistory, function(
											value, key) {
										deleteIds.push(value.id);
									});
									var req = {
										"empIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deleteMedicalRecord(req).then(
											function(data) {
											});
									angular
											.forEach(
													editEmpMedicalHistory,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Medical History Details are Deactivated successfully',
																		'Info');
														$scope.empMedicalHistory
																.splice(
																		$scope.empMedicalHistory
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Medical History  Details are failed to Deactivate',
																		"Error");
													});
									editEmpMedicalHistory = [];
									$scope.deleteIds = [];
								}
							},
							$scope.addMedicalRecord = function(actionType) {
								if (actionType == 'Edit' && editEmpMedicalHistory <= 0) {
									GenericAlertService.alertMessage(
											"please select atlist one row to edit",
											'Warning');
									return;
								}
								var medicalrecordspopup = MedicalHistoryFactory
										.medicalHistoryPopUp(actionType,
												editEmpMedicalHistory);
								medicalrecordspopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp medical history details",
																	'Error');
												});
							},

							//==============Leave and Attendance==============
						
							$scope.getEmpAttendanceData = function(){
								var getEmpAttendanceReq = {
										"status" : 1,
										"empId" : $scope.empId,
									};
									console.log(JSON.stringify(getEmpAttendanceReq));
									EmpRegisterService
											.getEmpAttendanceDtls(
													getEmpAttendanceReq)
											.then(
													function(data) {
														$scope.empAttendanceData = data.empBankAccountDtlTOs;
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		"Error Occured While Getting Employee Provident Fund Details",
																		'Error');
													});
							},
							
							$scope.empAttendanceRowSelect = function(attendance) {
								if (attendance.selected) {
									editEmpAttendence.push(attendance);
								} else {
									editEmpAttendence.pop(attendance);
								}
							},
							$scope.deactivateAttendanceRecord = function() {
								if (editEmpAttendence.length <= 0) {
									GenericAlertService.alertMessage(
											"please select records to Deactivate",
											'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empAttendanceData = [];
								} else {
									angular.forEach(editEmpAttendence, function(
											value, key) {
										deleteIds.push(value.id);
									});
									var deactivateReq = {
										"empIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deactivateEmpAttendanceDetails(deactivateReq).then(
											function(data) {
											});
									angular
											.forEach(
													editEmpAttendence,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Attendance Details are Deactivated successfully',
																		'Info');
														$scope.empAttendanceData
																.splice(
																		$scope.empAttendanceData
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Attendance Details are failed to Deactivate',
																		"Error");
													});
									editEmpAttendence = [];
									$scope.deleteIds = [];
								}
							},
							$scope.addEmpAttendance = function(actionType) {
								if (actionType == 'Edit' && editEmpAttendence <= 0) {
									GenericAlertService.alertMessage(
											"Please select atlist one row to edit",
											'Warning');
									return;
								}

								var leaveAttendencePopUp = LeaveAndAttendenceFactory
										.leaveAttendenceFactoryPopUp(actionType,
												editEmpAttendence);
								leaveAttendencePopUp
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp attendence details",
																	'Error');
												});
							},
							
							// Employee Contact Details
							
							$scope.getEmpContactDetails = function() {
								var getEmpContactReq = {
									"status" : 1,
									"empId" : $scope.empId,
								};
								console.log(JSON.stringify(getEmpContactReq));
								EmpRegisterService
										.getEmpContactDetails(getEmpContactReq)
										.then(
												function(data) {
													console
															.log("empContactDetails"
																	+ JSON
																			.stringify(data));
													$scope.empContactDetails = data.empContactDtlTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error Occured While Getting Employee Contact Details",
																	'Error');
												});
							},
							$scope.empContactRowSelect = function(contact) {
								if (contact.selected) {
									editEmpContactDetails.push(contact);
								} else {
									editEmpContactDetails.pop(contact);
								}
							},
							$scope.addEmpContactDetails = function(actionType) {
								if (actionType == 'Edit'
										&& editEmpContactDetails <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit ",
													'Warning');
									return;
								}
								var empcontactpopup = EmployeeContactFactory
										.empContactFactoryPopUp(actionType,
												editEmpContactDetails,
												$scope.empId);
								empcontactpopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp contact details",
																	'Error');
												});
							},
							$scope.deactivateEmpContactDetails = function() {
								if (editEmpContactDetails.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empContactDetails = [];
								} else {
									angular.forEach(editEmpContactDetails,
											function(value, key) {
												deleteIds.push(value.id);
											});
									var req = {
										"empRegIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deactivateEmpContacts(
											req).then(function(data) {
									});
									angular
											.forEach(
													editEmpContactDetails,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Contact Details are  Deactivated successfully',
																		'Info');
														$scope.empDetails
																.splice(
																		$scope.empContactDetails
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Contact Details are failed to Deactivate',
																		"Error");
													});
									editEmpContactDetails = [];
									$scope.deleteIds = [];
								}
							},

							/* =====================NOK====================== */
							$scope.getEmpNOKDetails = function() {
								var getEmpNOKReq = {
									"status" : 1,
									"empId" : $scope.empId,
								};
								console.log(JSON.stringify(getEmpNOKReq));
								EmpRegisterService
										.getEmpNOKDetails(getEmpNOKReq)
										.then(
												function(data) {
													console
															.log("getEmpNOKDetails"
																	+ JSON
																			.stringify(data));
													$scope.empNOK = data.empNokTOs;
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error Occured While Getting Employee Contact Details",
																	'Error');
												});
							},

							$scope.nokRowSelect = function(nok) {
								if (nok.selected) {
									editEmpNOK.push(nok);
								} else {
									editEmpNOK.pop(nok);
								}
							}
							$scope.addEmpNOKDetails = function(actionType) {
								if (actionType == 'Edit' && editEmpNOK <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit ",
													'Warning');
									return;
								}
								var nokpopup = NextOfKinFactory
										.nextOfKinFactoryPopUp(actionType,
												editEmpNOK,$scope.empId);
								nokpopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching emp contact  details",
																	'Error');
												});
							},
							$scope.deactivateEmpNOKDetails = function() {
								if (editEmpNOK.length <= 0) {
									GenericAlertService
											.alertMessage(
													"please select records to Deactivate",
													'Warning');
									return;
								}
								var deleteIds = [];
								$scope.nondeleteIds = [];
								if ($scope.selectedAll) {
									$scope.empNOK = [];
								} else {
									angular.forEach(editEmpNOK, function(value,
											key) {
										deleteIds.push(value.id);
									});
									var req = {
										"empRegIds" : deleteIds,
										"status" : 2
									};
									EmpRegisterService.deactivateEmpNOKs(req)
											.then(function(data) {
											});
									angular
											.forEach(
													editEmpNOK,
													function(value, key) {
														GenericAlertService
																.alertMessage(
																		'Employee Next Of Kin Details are  Deactivated successfully',
																		'Info');
														$scope.empNOK
																.splice(
																		$scope.empNOK
																				.indexOf(value),
																		1);
													},
													function(error) {
														GenericAlertService
																.alertMessage(
																		'Employee Next Of Kin Details are failed to Deactivate',
																		"Error");
													});
									editEmpNOK = [];
									$scope.deleteIds = [];
								}
							},

							/* =================== */
							$scope.treeEPS = function treeEPS(index,
									selectTreeName) {
								ngDialog
										.open({
											template : 'views/projresources/projempreg/epstree/epstree.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.treeEPS = '';
														$scope.indexVal = null;
														$scope.designationNames = [
																{
																	"id" : 1,
																	"name" : "empDesignation",
																	"code" : "ed1"
																},
																{
																	"id" : 2,
																	"name" : "empDesignation",
																	"code" : "ed2"
																} ];
														$scope.epspopup = function(
																tradeData) {
															$scope.item = tradeData.name;
															alert("index----"
																	+ index);
															$scope.indexVal = index;
															$scope
																	.closeThisDialog();
														}
													} ]

										}).closePromise
										.then(function(value) {
											$scope.treeData[value.$dialog
													.scope().indexVal].item = value.$dialog
													.scope().treeEPS;
										});
							}

					var ParentCompanyData = [ {
						pComId : "ABC",
						pComName : "ABC India Pvt ltd",
					}, {
						pComId : "PQR",
						pComName : "PQR India Pvt ltd"
					}, {
						pComId : "XYZ",
						pComName : "XYZ India Pvt ltd"
					} ];
					$scope.currentEmpDetailsTab = 'views/projresources/projempreg/empdetails/empdetails.html';
					$scope.onClickEmpDetailsTab = function(masterTabs) {
						$scope.currentEmpDetailsTab = masterTabs.url;
					}, $scope.isActiveEmpDetailsTab = function(masterTabsUrl) {
						return masterTabsUrl == $scope.currentEmpDetailsTab;
					}

					// =====================Current
					// Status======================================

					$scope.empStatus = [ {
						"selected" : false,
						"epsId" : '1-1',
						"epsName" : 'A-1',
						"pId" : 'p-1',
						"pName" : 'project1',
						"status" : '',
						"actualMobDate" : '',
						"expectedDeMobDate" : '',
						"actualDeMobDate" : '',
						"record" : ''
					}, {
						"selected" : false,
						"epsId" : '1-1',
						"epsName" : 'A-1',
						"pId" : 'p-1',
						"pName" : 'project1',
						"status" : '',
						"actualMobDate" : '',
						"expectedDeMobDate" : '',
						"actualDeMobDate" : '',
						"record" : ''
					} ];
					$scope.statusRowSelect = function(status) {
						if (status.selected) {
							editEmpStatus.push(status);
						} else {
							editEmpStatus.pop(status);
						}
					}
					$scope.deleteStatus = function() {
						var deleteIds = [];
						if ($scope.selectedAll) {
							$scope.empStatus = [];
						} else {
							angular.forEach(editEmpStatus,
									function(value, key) {
										deleteIds.push(value);
									});
						}
						angular.forEach(editEmpStatus, function(value, key) {
							$scope.empStatus.splice($scope.empStatus
									.indexOf(value), 1);
						});
						deleteIds = [];
						editEmpStatus = [];
					};

							$scope.addStatus = function(actionType) {
								if (actionType == 'Edit' && editEmpStatus <= 0) {
									GenericAlertService
											.alertMessage(
													"Please select atlist one row to edit ",
													'Warning');
									return;
								}
								var empstatusPopup = EmpStatusFactory
										.empStatusFactoryPopUp(actionType,
												editEmpStatus);
								empstatusPopup
										.then(
												function(data) {
												},
												function(error) {
													GenericAlertService
															.alertMessage(
																	"Error occurred while fetching employee status details",
																	'Error');
												});
							},

					
			
					/*
					 * ========================== Employee New Request
					 * =========================================
					 */
					$scope.empRequestTransfer = [ {
						"selected" : false,
						"eId" : '',
						"fName" : "ABC",
						"lName" : "DEF",
						"gender" : '',
						"pName" : '',
						"designation" : '',
						"pCompId" : '',
						"pCompName" : '',
						"cpId" : '',
						"cpName" : '',
						"fpId" : '',
						"fpName" : '',
						"originaleIdName" : '',
						"approverPIDName" : '',
						"dor" : '',
						"notfId" : '',
						"expectedDate" : '',
						"requiredDate" : '',
						"approverDecision" : '',
						"proposedDate" : ''
					}, {
						"selected" : false,
						"eId" : '',
						"fName" : "Pqr",
						"lName" : "xyz",
						"gender" : '',
						"pName" : '',
						"designation" : '',
						"pCompId" : '',
						"pCompName" : '',
						"cpId" : '',
						"cpName" : '',
						"fpId" : '',
						"fpName" : '',
						"originaleIdName" : '',
						"approverPIDName" : '',
						"dor" : '',
						"notfId" : '',
						"expectedDate" : '',
						"requiredDate" : '',
						"approverDecision" : '',
						"proposedDate" : ''
					} ];

					$scope.empRequestRowSelect = function(request) {
						if (request.selected) {
							editEmpRequestTransfer.push(request);
						} else {
							editEmpRequestTransfer.pop(request);
						}
					}
					$scope.deleteRequestForTransfer = function() {
						if (editEmpRequestTransfer.length <= 0) {
							GenericAlertService.alertMessage(
									"please select records to Deactivate",
									'Warning');
							return;
						}
						var deleteIds = [];
						$scope.nondeleteIds = [];
						if ($scope.selectedAll) {
							$scope.empRequestTransfer = [];
						} else {
							angular.forEach(editEmpRequestTransfer, function(
									value, key) {
								deleteIds.push(value.id);
							});
							var req = {
								"empIds" : deleteIds,
								"status" : 2
							};
							EmpRegisterService.deleteRequestForTransfer(req)
									.then(function(data) {
									});
							angular
									.forEach(
											editEmpRequestTransfer,
											function(value, key) {
												GenericAlertService
														.alertMessage(
																'Employee New Request Details  Deactivated successfully',
																'Info');
												$scope.empRequestTransfer
														.splice(
																$scope.empRequestTransfer
																		.indexOf(value),
																1);
											},
											function(error) {
												GenericAlertService
														.alertMessage(
																'Employee New Request   Details failed to Deactivate',
																"Error");
											});
							editEmpRequestTransfer = [];
							$scope.deleteIds = [];
						}
					}
					$scope.addRequestForTransfer = function(actionType) {
						if (actionType == 'Edit' && editEmpRequestTransfer <= 0) {
							GenericAlertService.alertMessage(
									'Please select atlist one row to edit ',
									"Warning");
							return;
						}
						var newrequestpopup = EmpNewRequestFactory
								.empNewRequestFactoryPopUp(actionType,
										editEmpRequestTransfer);
						newrequestpopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp new request  details",
															'Error');
										});
					}
					/* ===========Approval for Transfer=================== */
					$scope.empApprovalTransfer = [ {
						"selected" : false,
						"eId" : "10",
						"fName" : "XYZ",
						"lName" : '',
						"gender" : '',
						"designation" : '',
						"pCompId" : '',
						"pCompName" : '',
						"cpId" : '',
						"cpName" : '',
						"fpId" : '',
						"fpName" : '',
						"originaleIdName" : '',
						"approverPIDName" : '',
						"dor" : '',
						"notfId" : '',
						"expectedDate" : '',
						"requiredDate" : '',
						"proposedDate" : '',
						"approverDecision" : '',

					} ];

					$scope.approvalTransferRowSelect = function(approval) {
						if (approval.selected) {
							editEmpApprovalTransfer.push(approval);
						} else {
							editEmpApprovalTransfer.pop(approval);
						}
					}
					$scope.editApproverTransfer = function(actionType) {
						if (actionType == 'Edit'
								&& editEmpApprovalTransfer <= 0) {
							GenericAlertService.alertMessage(
									'Please select atlist one row to edit  ',
									"Warning");
							return;
						}
						var approvaltransferpopup = EmpApprovalTransferFactory
								.approvalTransferFactoryPopUp(actionType,
										editEmpApprovalTransfer);
						approvaltransferpopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp  request approval for transfer  details",
															'Error');
										});
					}
					/* =========== new Request Approval =================== */
					$scope.empReqApproval = [ {
						"selected" : false,
						"eId" : "10",
						"fName" : "XYZ",
						"lName" : '',
						"gender" : '',
						"designation" : '',
						"pCompId" : '',
						"pCompName" : '',
						"cpId" : '',
						"cpName" : '',
						"fpId" : '',
						"fpName" : '',
						"originaleIdName" : '',
						"approverPIDName" : '',
						"dor" : '',
						"notfId" : '',
						"expectedDate" : '',
						"requiredDate" : '',
						"proposedDate" : '',
						"approverDecision" : '',

					} ];

					$scope.requestApprovalRowSelect = function(approval) {
						if (approval.selected) {
							editEmpRequestApproval.push(approval);
						} else {
							editEmpRequestApproval.pop(approval);
						}
					}
					$scope.addRequestApprover = function(actionType) {
						if (actionType == 'Edit' && editEmpRequestApproval <= 0) {
							GenericAlertService.alertMessage(
									'Please select atlist one row to edit  ',
									"Warning");
							return;
						}
						var newrequestapprovalpopup = EmpRequestApprovalFactory
								.requestApprovalFactoryPopUp(actionType,
										editEmpRequestApproval);
						newrequestapprovalpopup
								.then(
										function(data) {
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occurred while fetching emp  request approval for transfer  details",
															'Error');
										});
					}
					/* =========== Approved Request =================== */

					$scope.empApprovedRequest = [ {
						"selected" : false,
						"eId" : "10",
						"fName" : "XYZ",
						"lName" : '',
						"gender" : '',
						"designation" : '',
						"pCompId" : '',
						"pCompName" : '',
						"cpId" : '',
						"cpName" : '',
						"fpId" : '',
						"fpName" : '',
						"originaleIdName" : '',
						"approverPIDName" : '',
						"dor" : '',
						"notfId" : '',
						"expectedDate" : '',
						"requiredDate" : '',
						"proposedDate" : '',
						"approverDecision" : '',

					} ];
					/* =========== Approved for Transfer=================== */
					$scope.empApprovedTransfer = [ {
						"selected" : false,
						"eId" : "10",
						"fName" : "XYZ",
						"lName" : '',
						"gender" : '',
						"designation" : '',
						"pCompId" : '',
						"pCompName" : '',
						"cpId" : '',
						"cpName" : '',
						"fpId" : '',
						"fpName" : '',
						"originaleIdName" : '',
						"approverPIDName" : '',
						"dor" : '',
						"notfId" : '',
						"expectedDate" : '',
						"requiredDate" : '',
						"proposedDate" : '',
						"approverDecision" : '',

					} ];

							/* ==============Tree================= */
							$scope.rowSelectN = function(tree) {
								console.log(tree.selected);
								if (tree.selected) {
									editTree.push(tree);
								} else {
									editTree.pop(tree);
								}
								console.log(JSON.stringify(editTree));
							},
							$scope.trees = function(actionType) {
								if (actionType == 'Edit' && editTree <= 0) {
									GenericAlertService
											.alertMessage(
													'Please select atlist one row to edit ',
													"Warning");
									return;
								}
								ngDialog
										.open({
											template : 'views/projresources/projempreg/epstreepopup.html',
											controller : [
													'$scope',
													function($scope) {
														$scope.action = actionType;
														$scope.trees = [];
														if (actionType === 'Add') {
															$scope.trees
																	.push({
																		"id" : '',
																		"name" : '',
																		"selected" : false
																	});
														} else {
															$scope.trees = editTree;
														}

																$scope.addRows = function() {

																	$scope.trees
																			.push({
																				"id" : '',
																				"name" : '',
																				"selected" : false
																			});
																},
																$scope.saveTree = function() {
																	var req = {}
																	EmpRegisterService
																			.saveEmpregisters(
																					req)
																			.then(
																					function(
																							data) {
																						GenericAlertService
																								.alertMessage(
																										'Employee  Details  '
																												+ data.message,
																										data.status);
																					},
																					function(
																							error) {
																						GenericAlertService
																								.alertMessage(
																										'Employee Details Failed to Save ',
																										"Error");
																					});
																	ngDialog
																			.close();
																},
																$scope.deleteRows = function() {
																	var tempItem = [];
																	angular
																			.forEach(
																					$scope.trees,
																					function(
																							value,
																							key) {
																						if (!value.selected) {
																							tempItem
																									.push(value);
																						}
																					});
																	$scope.trees = tempItem;
																}
													} ]
										});
							}, $scope.deleteTree = function() {
								$scope.deleteIds = [];
								angular.forEach($scope.tree, function(value,
										key) {
									if (!value.selected) {
										$scope.deleteIds.push(value);
									}
								});
								$scope.tree = $scope.deleteIds;
							}, $scope.itemId = 1;
					$scope.isExpand = true;
					$scope.itemClick = function(itemId, expand) {
						$scope.itemId = itemId;
						$scope.isExpand = !expand;
					};
					function itemexpandCollpase(item, expand) {
						angular.forEach(item.children, function(o) {
							o.expand = !expand;
							if (o.children != null && o.children.length > 0) {
								o.expand = false;
								itemexpandCollpase(o, expand);
							}
						});
					}
				}).filter(
				'filterTreeItem',
				function() {
					function recursive(obj, newObj, level, itemId, isExpand) {
						angular.forEach(obj, function(o) {
							if (o.children && o.children.length != 0) {
								o.level = level;
								o.leaf = false;
								newObj.push(o);
								if (o.id == itemId) {
									o.expand = isExpand;
								}
								if (o.expand == true) {
									recursive(o.children, newObj, o.level + 1,
											itemId, isExpand);
								}
							} else {
								o.level = level;
								o.leaf = true;
								newObj.push(o);
								return false;
							}
						});
					}

					return function(obj, itemId, isExpand) {
						var newObj = [];
						recursive(obj, newObj, 0, itemId, isExpand);
						return newObj;
					}
				}).filter('slice', function() {
			return function(arr, start, end) {
				return (arr || []).slice(start, end);
			}
		});
