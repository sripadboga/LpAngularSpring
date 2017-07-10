'use strict';

app
		.factory(
				'ProjSORFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjSORService, GenericAlertService) {
					var projSorPopup;
					var service = {};
					service.sorPopupDetails = function(projId) {
						var deferred = $q.defer();
						projSorPopup = ngDialog
								.open({
									template : 'views/projectlib/sow/projsorviewpopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.SORData = [];
														$scope.getSORDetails = function() {
															var sorReq = {
																"projId" : projId,
																"status" : 1
															}
															ProjSORService
																	.getSORDetails(
																			sorReq)
																	.then(
																			function(
																					data) {
																				$scope.SORData = data.projSORItemTOs;
																			},
																			function(
																					error) {
																				GenericAlertService
																						.alertMessage(
																								"Error occured while getting Schedule Of Rates Details",
																								'Error');
																			});

														},
														$scope.selectSORDetails = function(
																sorItemData) {

															var returnPopObj = {
																"selectedSORItem" : sorItemData
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
					return service;
				});