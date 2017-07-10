'use strict';

app
		.factory(
				'EmpRegisterPopUpService',
				function(ngDialog, $q, $filter, $timeout, EmpRegisterService,
						GenericAlertService) {
					var empDtlsPopup;
					var service = {};

					service.getEmpRegisters = function() {
						var deferred = $q.defer();
						empDtlsPopup = ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/employeelist.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom1',
									controller : [
											'$scope',
											function($scope) {
												$scope.searchEmpId = function(empId) {
													
													$scope.filterEmpId = angular
															.copy($scope.empId);
													$scope.searchResult = true;
												},
												$scope.empDtls = [];
														$scope.getEmpRegisters = function() {
															var req = {
																"status" : 1
															};
															EmpRegisterService
																	.getEmpregisters(
																			req)
																	.then(
																			function(
																					data) {
																				/*console
																						.log(JSON
																								.stringify(data));*/
																				$scope.empDtls = data.empRegisterDtlTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								'An error occurred while fetching Employee details',
																								"Error");
																			});
															$scope.empregpopup = function(
																	empRegisterDtlTO) {
																var returnPopObj = {
																	"empRegisterDtlTO" : empRegisterDtlTO
																};
																deferred
																		.resolve(returnPopObj);
																$scope
																		.closeThisDialog();
															}
														}
														
							
											} ]
								});
						return deferred.promise;
					};
					return service;
				});