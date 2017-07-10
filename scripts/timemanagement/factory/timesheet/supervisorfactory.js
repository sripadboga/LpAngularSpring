'use strict';

app
		.factory(
				'SuperVisorTimeSheetFactory',
				function(ngDialog, $q, $filter, $timeout, $rootScope,

				UserService, GenericAlertService) {
					var getUsers;
					var service = {};
					service.getSuperVisors = function() {
						var deferred = $q.defer();
            ngDialog
              .open({
									template : 'views/timemanagement/timesheet/approvetimesheet/supervisorlist.html',
									closeByDocument : false,
									showClose : true,
									controller : [
											'$scope',
											function($scope) {

												$scope.supervisorLists = [];

												$scope.getUserDetails = function() {

													var req = {
														"status" : 1,
														"clientId" : 101
													}
													UserService
															.getUsers(req)
															.then(
																	function(
																			data) {

																		$scope.supervisorLists = data.users;
																	});
												}
												$scope.supervisorListPopUp = function(
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
