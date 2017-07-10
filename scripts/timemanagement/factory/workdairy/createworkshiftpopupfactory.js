'use strict';

app
		.factory(
				'CreateWorkShiftPopupFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjWorkShiftService, GenericAlertService) {
					var workshiftPopup = [];
					var workService = {};
					workService.workShiftDetailsList = function(projId) {
								var deferred = $q.defer();
								workshiftPopup = ngDialog
										.open({
											template : 'views/timemanagement/workdairy/createworkdairy/workingshifts.html',
											closeByDocument : false,
											showClose : true,
											controller : [
													'$scope',
													function($scope) {
														$scope.shifts = [];
														var shiftReq = {
															"status" : 1,
															"projId" : projId
														};
														ProjWorkShiftService
																.getProjWorkShifts(
																		shiftReq)
																.then(
																		function(
																				data) {
																			console.log(JSON.stringify(data));
																			$scope.shifts = data.projWorkShiftTOs;
																		},
																		function(
																				error) {
																			GenericAlertService
																					.alertMessage(
																							"Error occured while getting working shift Details",
																							"Error");
																		});
														$scope.workShiftpopup = function(
																projWorkShiftTO) {
															var returnPopObj = {
																"projWorkShiftTO" : projWorkShiftTO
															};
															deferred
																	.resolve(returnPopObj);
															$scope
																	.closeThisDialog();
														}
													} ]
										});
								return deferred.promise;
							}
					return workService;
				
				});