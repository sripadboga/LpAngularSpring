'use strict';
app.config(function($stateProvider) {
	$stateProvider.state("payperiodcycle", {
		url : '/payperiodcycle',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/finance/taxcodetypes/payrollcycle.html',
				controller : 'PayRollCycleController'
			}
		}
	})
}).controller(
		"PayRollCycleController",
		function($scope, $q, $state, ngDialog, PayRollFactory,PayRollService,TaxCountryFactory,
				GenericAlertService) {
			var service = {};

			var editPayRoll = [];
			$scope.payRollList = [];

			$scope.getCountryDetails = function() {
				var popupDetails = TaxCountryFactory
						.getCountryDetails();
				$scope.countryProvisionObj = {};
				popupDetails
						.then(
								function(data) {
									$scope.countryProvisionObj.code = data.selectedCountry.name;
									$scope.countryProvisionObj.countryId = data.selectedCountry.id;
									$scope.provisions = data.selectedCountry.provisionTOs;
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occurred while selecting  Details",
													'Info');
								})
			},
			
			$scope.payRollReq = {
				"type" : '',
				"catg" : '',
				"payRollCycle" : '',
				"notes" : '',
				"status" : "1"
			}
			$scope.regularPaySearch = {};
			$scope.regularPaySearch = function() {
				PayRollService.getPayRoll($scope.payRollReq)
						.then(function(data) {
							$scope.payRollList = data.payRollTOs;
						});
			}, $scope.reset = function() {
				$scope.payRollList = [];
				$scope.payRollReq = {
						"type" : '',
						"catg" : '',
						"payRollCycle" : '',
						"notes" : '',
						"status" : "1"
				}

			}

			$scope.payRollRowSelect = function(payRoll) {
				if (payRoll.selected) {
					editPayRoll.push(payRoll);
				} else {
					editPayRoll.pop(payRoll);
				}
			}

			$scope.addPayRoll = function(actionType) {
				if (actionType == 'Edit' && editPayRoll <= 0) {
					GenericAlertService.alertMessage(
							"Please select alteast one row to modify",
							'Warning');
					return;
				} else {
					var popupDetails = PayRollFactory.payRollPopupDetails(
							actionType, editPayRoll);
					popupDetails.then(function(data) {
						$scope.payRollList = data.payRollTOs;
						editPayRoll = [];
					}, function(error) {
						GenericAlertService.alertMessage(
								"Error occurred while selecting  Details",
								'Info');
					})
				}
			}
			$scope.deletePayRoll = function() {
				if (editPayRoll.length <= 0) {
					GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
					return;
				}
				var deleteIds = [];
				$scope.nondeleteIds = [];
				if ($scope.selectedAll) {
					$scope.payRollList = [];
				} else {
					angular.forEach(editPayRoll,function(value, key) {
										if (value.id) {
											deleteIds.push(value.id);
										}
									});
					var req = {
						"PayRollIds" : deleteIds,
						"status" : 2
					};
					PayRollService.deletePayRoll(req).then(function(data) {
						GenericAlertService.alertMessage('Pay Roll Details are  Deactivated successfully','Info');
							});
				
					angular.forEach(editPayRoll,function(value, key) {
										$scope.payRollList.splice(
														$scope.payRollList.indexOf(value),1);
									},
									function(error) {
										GenericAlertService.alertMessage('Pay Roll Details are failed to Deactivate',"Error");
									});
					editPayRoll = [];
					$scope.deleteIds = [];

				}
			}

		});
