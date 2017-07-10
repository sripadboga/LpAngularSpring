'use strict';

app
		.factory(
				'EmpDesignationPopupService',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						EmpRegisterService,EmpService, GenericAlertService) {
					var designationPopUpService = [];
					var service = {};
					service.empDesignationList = function(searchProject) {
						var deferred = $q.defer();
						designationPopUpService = ngDialog
								.open({
									template : 'views/projresources/projempreg/epstree/tradename.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {
												$scope.empDesignations = [];
												var empDesgReq = {
													"status" : 1,
													"clientId" : searchProject.clientId
												};
												console.log(JSON.stringify(empDesgReq));
												EmpService
														.getEmpClasses(
																empDesgReq)
														.then(
																function(data) {
																	$scope.empDesignations =  data.empClassTOs;
																},
																function(error) {
																	GenericAlertService
																			.alertMessage(
																					"Error occured while getting Designations List",
																					"Error");
																});
												$scope.desigListPopUp = function(
														desgData) {
													var returnPopObj = {
														"designationLabelKeyTO" : desgData
													};
													deferred
															.resolve(returnPopObj);
													$scope.closeThisDialog();
												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});