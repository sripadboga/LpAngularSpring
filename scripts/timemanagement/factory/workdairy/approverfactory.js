'use strict';

app
		.factory(
				'ApproverPersonFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,

				UserService, GenericAlertService) {
					var getUsers;
					var service = {};
					service.getApprovers = function() {
						var deferred = $q.defer();
						ngDialog
								.open({
									template : 'views/timemanagement/workdairy/createworkdairy/approverslist.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {

												$scope.approverLists = [];

												$scope.getUserDetails = function() {

													var req = {
														"status" : 1,
													}
													UserService
															.getUsers(req)
															.then(
																	function(
																			data) {

																		$scope.approverLists = data.users;
																	});
												}
												$scope.approverListPopUp = function(
														userTO) {
													var returnUserTO = {
														"userListTO" : userTO
													};
													deferred
															.resolve(returnUserTO);
													$scope.closeThisDialog();

												}
											} ]
								});
						return deferred.promise;
					}
					return service;
				});
