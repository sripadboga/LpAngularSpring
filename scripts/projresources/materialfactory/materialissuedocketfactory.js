'use strict';
app.factory('MaterialIssueDocketFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,MaterialRegisterService ,GenericAlertService ) {
		var materialissuedocketpopup;
		var service = {};
		service.materialIssueDocketDetails = function(actionType,editStoreIssueDocket) {
		var deferred = $q.defer();
		materialissuedocketpopup = 	ngDialog.open({
			template : 'views/projresources/projmaterialreg/issuedocket/storeissuepopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
			$scope.action = actionType;
			$scope.addStoreIssueDocket =[];
			var selectedIssueDocket=[];

			if (actionType === 'Add'){		
				$scope.addStoreIssueDocket.push({
					"selected" : false,
					"rId" : '',
					"rName" : '',
					"rSubgId" : '',
					"rSubgName" : '',
					"poNum" : '',
					"sceduleItemId" : '',
					"suppId" : '',
					"suppName" : '',
					"measure" : '',
					"quantity" : '',
					"rate" : '',
					"comments" : ''
				});
			}	
			else {
				$scope.addStoreIssueDocket = angular.copy(editStoreIssueDocket);
				editStoreIssueDocket=[];
			}
			$scope.addRows = function() {
				$scope.addStoreIssueDocket.push({
					"selected" : false,
					"rId" : '',
					"rName" : '',
					"rSubgId" : '',
					"rSubgName" : '',
					"poNum" : '',
					"sceduleItemId" : '',
					"suppId" : '',
					"suppName" : '',
					"measure" : '',
					"quantity" : '',
					"rate" : '',
					"comments" : ''
				});
			},
			$scope.issueDocketPopUpRowSelect = function(storedocket) {
				if (storedocket.selected) {
					selectedIssueDocket.push(storedocket);
				} else {
					selectedIssueDocket.pop(storedocket);
				}
			},
			$scope.deleteRows = function() {
				if(selectedIssueDocket.length==0){
					GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
				}if(selectedIssueDocket.length<$scope.addStoreIssueDocket.length)
				{
					angular.forEach(selectedIssueDocket, function(value,key) {
						$scope.addStoreIssueDocket.splice($scope.addStoreIssueDocket.indexOf(value), 1);
					});
					selectedIssueDocket=[];
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
					GenericAlertService.alertMessage('Material Issue  Docket Details  '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Material Issue  Docket Details  Failed to Save ',"Error");
				});
				ngDialog.close();
			}

			}]
			});
						return deferred.promise;
					}
					return service;
				});
