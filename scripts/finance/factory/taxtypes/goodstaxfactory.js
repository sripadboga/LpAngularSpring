'use strict';
app.factory('GoodsTaxFactory',	
		function(ngDialog, $q, $filter,$timeout,GoodsTaxService,GenericAlertService) {
		var goodsTaxPopUp;
		var service = {};
		service.goodstaxPopUpDetails = function(actionType,editGoodsTax) {
		var deferred = $q.defer();
		goodsTaxPopUp = ngDialog
		.open({
			template : 'views/centrallib/finance/goodstaxpopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				 var selectedGoodsTax=[];
				 $scope.goodsList =[];
				
				
				if (actionType === 'Add'){		
					$scope.goodsList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"invoiceAmount" :'',
						"taxRate" :'',
						"comments" :'',
						"status":'1'
						
					});
				}	
				else {
					$scope.goodsList = angular.copy(editGoodsTax);
					editGoodsTax=[];
				}
				
				$scope.addgoodsRows = function() {
					$scope.goodsList.push({
						"selected" : false,
						"taxCalMstrId" :'',
						"invoiceAmount" :'',
						"taxRate" :'',
						"comments" :'',
						"status":'1'
						
					});
				},
				$scope.goodsPopUpRowSelect = function(goods) {
					if (goods.selected) {
						selectedGoodsTax.push(goods);
					} else {
						selectedGoodsTax.pop(goods);
					}
				},
				$scope.deleteProjRows = function() {
					if (selectedGoodsTax.length == 0) {
						GenericAlertService
								.alertMessage(
										'Please select atleast one row to delete',
										"Warning");
					}
					if (selectedGoodsTax.length < $scope.goodsList.length) {
						angular
								.forEach(
										selectedGoodsTax,
										function(
												value,
												key) {
											$scope.goodsList
													.splice(
															$scope.goodsList
																	.indexOf(value),
															1);
										
										});
						selectedGoodsTax = [];
						GenericAlertService
						.alertMessage(
								'Rows are deleted Successfully',
								"Info");
					} else {
						GenericAlertService
								.alertMessage(
										'Please leave atleast one row',
										"Warning");
					}
				}
				$scope.savegoodstax = function(){
					var req={
							"serviceTaxTOs" : $scope.goodsList
				}
					GoodsTaxService.saveServiceTax(req).then(function(data) {
						GenericAlertService.alertMessage('Goodstax New Request Details are  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Goodstax New Request Details are Failed to Save ',"Error");
					});
					ngDialog.close();
				}
		}]
		});
						return deferred.promise;
					}
					return service;
				});

