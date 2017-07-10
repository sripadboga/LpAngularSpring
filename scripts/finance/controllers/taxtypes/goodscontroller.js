'use strict';
app.config(function($stateProvider) {
	$stateProvider.state("goodstax", {
		
		url : '/goodstax',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/finance/taxtypes/goodsandservicetax.html',
				controller : 'GoodsAndServiceController'
			}
		}
	})
}).controller("GoodsAndServiceController",function($scope,$q,$state,ngDialog,GoodsTaxFactory,GoodsTaxService,GenericAlertService) {
	var service = {}
	
	var editGoodsTax=[];
	var servicetax=[];
	$scope.servicetax =[];
	
	
	//get req
	$scope.getServiceTax = function() {
		var getserviceReq = {
				"selected" : false,
				"taxCalMstrId" :'',
				"invoiceAmount" :'',
				"taxRate" :'',
				"comments" :'',
				"status":'1'
		};
		TaxonService
				.getServiceTax(getserviceReq)
				.then(
						function(data) {
							$scope.servicetax = data.serviceTaxTOs;
						},
						function(error) {
							GenericAlertService
									.alertMessage(
											"Error occured while getting servicetax Details",
											"Error");
						});
	}
	

	 $scope.goodstaxrowselect = function(goods) {
		if (goods.selected) {
			editGoodsTax.push(goods);
		} else {
			editGoodsTax.pop(goods);
		}
	 },
	 $scope.addGoodsTax = function(actionType) {
			
			if (actionType == 'Edit' && editGoodsTax <= 0) {
				GenericAlertService
						.alertMessage(
								"Please select alteast one row to modify",
								'Warning');
				return;
			} else {
				var goodstaxDetails = GoodsTaxFactory
						.goodstaxPopUpDetails(actionType,
								editGoodsTax);
				goodstaxDetails
						.then(
								function(data) {
									$scope.servicetax = data.serviceTaxTOs;
									editGoodsTax = [];
								},
								function(error) {
									GenericAlertService
											.alertMessage(
													"Error occurred while selecting  Details",
													'Info');
								})
			}
		}
	 
	 $scope.deteteGoodsTax = function() {
			if (editGoodsTax.length <= 0) {
				GenericAlertService.alertMessage("Please select alteast one row to Deactivate",'Warning');
				return;
			}
			var deleteIds = [];
			$scope.nondeleteIds = [];
			if ($scope.selectedAll) {
				$scope.servicetax = [];
			} else {
				angular.forEach(editGoodsTax,function(value, key) {
									if (value.id) {
										deleteIds.push(value.id);
									}
								});
				var req = {
					"serviceTaxIds" : deleteIds,
					"status" : 2
				};
				GoodsTaxService.deleteServiceTax(req).then(function(data) {
					GenericAlertService.alertMessage('Goods Details are  Deactivated successfully','Info');
						});
			
				angular.forEach(editGoodsTax,function(value, key) {
									$scope.servicetax.splice(
													$scope.servicetax.indexOf(value),1);
								},
								function(error) {
									GenericAlertService.alertMessage('GoodsDetails are failed to Deactivate',"Error");
								});
				editGoodsTax = [];
				$scope.deleteIds = [];

			}
		}
			
			
		});
