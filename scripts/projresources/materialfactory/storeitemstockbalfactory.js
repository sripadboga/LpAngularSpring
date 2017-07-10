'use strict';
app.factory('StoreItemStockBalanceFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var storeItemStockBalancePopUp;
		var service = {};
		service.storeItemStockBalanceDetails = function(actionType,editStoreStockBalance) {
		var deferred = $q.defer();
		storeItemStockBalancePopUp = ngDialog.open({
			template : 'views/projresources/projmaterialreg/storeitemstockbal/storesitempopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addStoreStockBalance =[];
			 var selectedStoreItem=[];
			if (actionType === 'Add'){		
				$scope.addStoreStockBalance.push({
					"selected" : false,
					"date" : '',
					"projectDocket" : '',
					"resourceId" : '',
					"resourceName" : '',
					"resourceSubGroupId" : '',
					"resourceSubGroupName" : '',
					"originProject" : '',
					"originStoreStockYard" : '',
					"destinationProject" : '',
					"destinationStoreStockYard" : '',
					"supplierId" : '',
					"supplierName" : '',
					"issueEmployeeId" : '',
					"issueEmployeeName" : '',
					"receiverEmployeeId" : '',
					"receiverEmployeeName" : '',
					"unitOfMeasure" : '',
					"rate" : '',
					"openingBalanceQuantity" : '',
					"issuedQuantity" : '',
					"dateWiseConsumptionQuantity" : '',
					"cumulativeQuantityConsumed" : '',
					"closingStockBalanceQuantityOnSite" : ''
				});
			}	
			else {
				$scope.addStoreStockBalance = angular.copy(editStoreStockBalance);
				editStoreStockBalance=[];
			}
			$scope.addRows = function() {
				$scope.addStoreStockBalance.push({
					"selected" : false,
					"date" : '',
					"projectDocket" : '',
					"resourceId" : '',
					"resourceName" : '',
					"resourceSubGroupId" : '',
					"resourceSubGroupName" : '',
					"originProject" : '',
					"originStoreStockYard" : '',
					"destinationProject" : '',
					"destinationStoreStockYard" : '',
					"supplierId" : '',
					"supplierName" : '',
					"issueEmployeeId" : '',
					"issueEmployeeName" : '',
					"receiverEmployeeId" : '',
					"receiverEmployeeName" : '',
					"unitOfMeasure" : '',
					"rate" : '',
					"openingBalanceQuantity" : '',
					"issuedQuantity" : '',
					"dateWiseConsumptionQuantity" : '',
					"cumulativeQuantityConsumed" : '',
					"closingStockBalanceQuantityOnSite" : ''
				});
			},
			$scope.stockBalPopUpRowSelect = function(storestock) {
				if (storestock.selected) {
					selectedStoreItem.push(storestock);
				} else {
					selectedStoreItem.pop(storestock);
				}
			},
			$scope.deleteRows = function() {
				if(selectedStoreItem.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedStoreItem.length<$scope.addStoreStockBalance.length)
				{
					angular.forEach(selectedStoreItem, function(value,key) {
						$scope.addStoreStockBalance.splice($scope.addStoreStockBalance.indexOf(value), 1);
					});
					selectedStoreItem=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveIssueDockets(req).then(function(data) {
					GenericAlertService.alertMessage('Material Store Item Stock Balance Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Store Item Stock Balance Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}

			}]
			});
						return deferred.promise;
					}
					return service;
				});
