'use strict';
app.factory('MaterialDailySupplyFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialDailySupplyPopUp;
		var service = {};
		service.materialDailySupplyDetails = function(actionType,editDailyMaterialSupply) {
		var deferred = $q.defer();
		materialDailySupplyPopUp = ngDialog.open({
			template : 'views/projresources/projmaterialreg/deliverysuply/deliverysupplypopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addDailyMaterialSupply =[];
             var selectedItem=[];
			if (actionType === 'Add'){		
				$scope.addDailyMaterialSupply.push({
					"selected" : false,
					"supplyDeliveryDate" : '',
					"projectId" : '',
					"projectName" : '',
					"epsId" : '',
					"epsName" : '',
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupId" : '',
					"materialSubGroupName" : '',
					"supplierName" : '',
					"unitOfMeasure" : '',
					"purchaseOrder(PO)" : '',
					"poScheduleItemId" : '',
					"poScheduleItemDescription" : '',
					"deliveryDocketNo" : '',
					"docketDate" : '',
					"locationOfDelivery" : '',
					"quantityReceived" : '',
					"ratePerUnit" : '',
					"receivedBy" : '',
					"defectsIfAny" : '',
					"otherCommentsFromReceiver" : '',
					"recordOfDeliveryDockets" : ''
				});
			}	
			else {
				$scope.addDailyMaterialSupply = angular.copy(editDailyMaterialSupply);
				editDailyMaterialSupply=[];
			}
			$scope.addRows = function() {
				$scope.addDailyMaterialSupply.push({
					"selected" : false,
					"supplyDeliveryDate" : '',
					"projectId" : '',
					"projectName" : '',
					"epsId" : '',
					"epsName" : '',
					"resourceId" : '',
					"resourceName" : '',
					"materialSubGroupId" : '',
					"materialSubGroupName" : '',
					"supplierName" : '',
					"unitOfMeasure" : '',
					"purchaseOrder(PO)" : '',
					"poScheduleItemId" : '',
					"poScheduleItemDescription" : '',
					"deliveryDocketNo" : '',
					"docketDate" : '',
					"locationOfDelivery" : '',
					"quantityReceived" : '',
					"ratePerUnit" : '',
					"receivedBy" : '',
					"defectsIfAny" : '',
					"otherCommentsFromReceiver" : '',
					"recordOfDeliveryDockets" : ''
				});
			},
			$scope.deliverySupplyPopUpRowSelect = function(supply) {
				if (supply.selected) {
					selectedItem.push(supply);
				} else {
					selectedItem.pop(supply);
				}
			},
			$scope.deleteRows = function() {
				if(selectedItem.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedItem.length<$scope.addDailyMaterialSupply.length)
				{
					angular.forEach(selectedItem, function(value,key) {
						$scope.addDailyMaterialSupply.splice($scope.addDailyMaterialSupply.indexOf(value), 1);
					});
					selectedItem=[];
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
					GenericAlertService.alertMessage('Material Daily Supply  Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Daily Supply Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}
			}]
			});
						return deferred.promise;
					}
					return service;
				});
