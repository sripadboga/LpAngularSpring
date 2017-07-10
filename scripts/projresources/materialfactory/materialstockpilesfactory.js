'use strict';
app.factory('MaterialStockPilesFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialStockPilesPopUp;
		var service = {};
		service.materialStockPilesDetails = function(actionType,editStockPiles) {
		var deferred = $q.defer();
		materialStockPilesPopUp = ngDialog.open({
			template : 'views/projresources/projmaterialreg/stockpiles/stockpilespopup.html',

			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addStockPiles =[];
			var selectedStockPiles=[];

			if (actionType === 'Add'){		
				$scope.addStockPiles.push({
					"selected" : false,
					"date" : '',
					"epsName" : '',
					"projectId" : '',
					"projectName" : '',
					"stockPiledLocation" : '',
					"preApprovalNotificationId" : '',
					"projectDocket" : '',
					"supplierId" : '',
					"supplierName" : '',
					"supplierDocketDate" : '',
					"supplierDocket" : '',
					"resourceId" : '',
					"resourceName" : '',
					"resourceSubGroupId" : '',
					"resourceSubGroupName" : '',
					"stockLocation" : '',
					"unitOfMeasure" : '',
					"rate" : '',
					"openingBalance" : '',
					"dateWiseQuantityDelivered" : '',
					"cumulativeQuantityDelivered" : '',
					"dateWiseConsumptionQuantity" : '',
					"cumulativeConsumptionQuantity" : '',
					"quantityTransferToOtherProjects" : '',
					"closingStockBalance" : ''
				});
			}	
			else {
				$scope.addStockPiles =angular.copy(editStockPiles);
				editStockPiles=[];
			}
			$scope.addRows = function() {
				$scope.addStockPiles.push({
					"selected" : false,
					"date" : '',
					"epsName" : '',
					"projectId" : '',
					"projectName" : '',
					"stockPiledLocation" : '',
					"preApprovalNotificationId" : '',
					"projectDocket" : '',
					"supplierId" : '',
					"supplierName" : '',
					"supplierDocketDate" : '',
					"supplierDocket" : '',
					"resourceId" : '',
					"resourceName" : '',
					"resourceSubGroupId" : '',
					"resourceSubGroupName" : '',
					"stockLocation" : '',
					"unitOfMeasure" : '',
					"rate" : '',
					"openingBalance" : '',
					"dateWiseQuantityDelivered" : '',
					"cumulativeQuantityDelivered" : '',
					"dateWiseConsumptionQuantity" : '',
					"cumulativeConsumptionQuantity" : '',
					"quantityTransferToOtherProjects" : '',
					"closingStockBalance" : ''
				});
			},
			$scope.stokePilesPopUpRowSelect = function(stock) {
				if (stock.selected) {
					selectedStockPiles.push(stock);
				} else {
					selectedStockPiles.pop(stock);
				}
			},
			$scope.deleteRows = function() {
				if(selectedStockPiles.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedStockPiles.length<$scope.addStockPiles.length)
				{
					angular.forEach(selectedStockPiles, function(value,key) {
						$scope.addStockPiles.splice($scope.addStockPiles.indexOf(value), 1);
					});
					selectedStockPiles=[];
					GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
					}else
					{
						GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
						}
			}
			 
			$scope.save = function(){
				var req={
			}
				MaterialRegisterService.saveDateWiseConsumption(req).then(function(data) {
					GenericAlertService.alertMessage('Material Stock Piles  Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Stock Piles Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}
			}]
		});
						return deferred.promise;
					}
					return service;
				});
