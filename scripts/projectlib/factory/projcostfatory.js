'use strict';

app
		.factory(
				'ProjCostFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,
						ProjCostCodeService,
						GenericAlertService) {
					var costservice = {};
					var projCostPopup;
					costservice.costPopupDetails = function(projId) {
						var deferred = $q.defer();
						projCostPopup = ngDialog
								.open({
									template : 'views/projectlib/sow/projcostviewpopup.html',
									className : 'ngdialog-theme-plain ng-dialogueCustom',
									showClose : true,
									closeByDocument : false,
									controller : [
											'$scope',
											function($scope) {
												$scope.costData = [];
												$scope.getCostDetails = function() {
													var costReq = {
														"projId" : projId,
														"status" : 1
													}
													ProjCostCodeService
															.getCostDetails(
																	costReq)
															.then(
																	function(
																			data) {
																		$scope.costData = data.projCostItemTOs;
																	},
																	function(
																			error) {
																		GenericAlertService
																				.alertMessage(
																						"Error occured while getting CostCode",
																						'Error');
																	});

												}
												$scope.selectCostDetails = function(
														costItemData) {

													var returnCostPopObj = {
														"selectedCostItem" : costItemData
													};
													//ngDialog.close();
												deferred
															.resolve(returnCostPopObj);
												$scope
												.closeThisDialog();
												}
											} ]
								});
						return deferred.promise;
					};
					return costservice;
				});