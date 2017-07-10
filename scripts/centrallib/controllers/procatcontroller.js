'use strict';

/**
 * @ngdoc function
 * @name potApp.controller : Procurement Category Controller
 * @description # Procurement Category Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state("procurecatg", {
		url : '/procurecatg',
		data : {
		roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/centrallib/procure/procure.html',
				controller : 'ProCategoryController'
			}
		}
	})
}).controller('ProCategoryController',function($scope, $state,$q, ngDialog, ProcureService,GenericAlertService) {
		var editCategories = [];
		$scope.categories = [];
		var selectedCategory=[];
		var deferred = $q.defer();
		$scope.deleteIds = [];
		$scope.proCategory = [];
		$scope.procReq = {
				"procureId" : null,
				"subProcureName" : null,
				"status" : "1"
		};
		var req = {
				"status" : 1
		};
		$scope.getprocures = function() {
			ProcureService.getprocures(req).then(function(data) {
				$scope.proCategory = data.procurementTOs;
			});
		},
		$scope.activeFlag = 0;
		$scope.procureSearch = function() {
			ProcureService
					.getProcureCatgs($scope.procReq)
					.then(
							function(data) {
								$scope.activeFlag = 0;
								$scope.categories = data.procureMentCatgTOs;
								if ($scope.categories != null
										&& $scope.categories.length > 0) {
									if ($scope.categories[0].status == 1) {
										$scope.activeFlag = 1;
									} else if ($scope.categories[0].status == 2) {
										$scope.activeFlag = 2;
									}
								}
								else{
									GenericAlertService
									.alertMessage(
											'Procurements  are not available for given search criteria',
											"Warning");
								}
							});
		},
		
		
		
		$scope.reset = function() {
			$scope.procReq = {
					"procureId" : null,
					"subProcureName" : null,
					"status" : "1"
			}
			$scope.activeFlag = 0;
			$scope.procureSearch();
		}, $scope.updateCatgCode = function(data) {
			$scope.procReq.procureId = data.id;
		}, $scope.rowSelect = function(category) {
			if (category.selected) {
				editCategories.push(category);
			} else {
				editCategories.pop(category);
			}
		}
		var service = {};
		var categoryPopUp;
		$scope.addCategories = function(actionType) {
			categoryPopUp = service.addCategory (actionType);
			categoryPopUp
			.then(
					function(
							data) {
						$scope.categories = data.procureMentCatgTOs;
					},
					function(
							error) {
						GenericAlertService
								.alertMessage(
										"Error occured while selecting Procurement details",
										'Error');
					});
		}
		
	service.addCategory = function(actionType) {
			if (actionType == 'Edit' && editCategories.length === 0) {
				GenericAlertService.alertMessage('Please select atleast one row to edit',"Warning");
				return;
			}
			categoryPopUp=ngDialog.open({
				template : 'views/centrallib/procure/procurepopup.html',
				closeByDocument : false,
				showClose : true,
				controller : ['$scope',function($scope) {
					$scope.categoryList = [];
					$scope.action = actionType;
					$scope.proCategory = [];
					if (actionType === 'Add') {
						$scope.categoryList.push({
							'code' : '',
							'desc' : '',
							'status' : '1',
							'selected' : false
						});
					} else {
						$scope.categoryList = angular.copy(editCategories);
						editCategories = [];
					}
					var req = {
							"status" : 1
					};
					ProcureService.getprocures(req).then(function(data) {
						$scope.proCategory = data.procurementTOs;
						console.log($scope.proCategory);
					});
					$scope.addRows = function() {
						$scope.categoryList.push({
							'code' : '',
							'desc' : '',
							'status' : '1',
							'selected' : false
						});
					},
					$scope.updateCatgCode = function(data,category) {
						category.procureId = data.id;
					}
					$scope.saveProcureCatgs = function() {					
						var procurecatgMap=[];
						angular.forEach($scope.categoryList,function(value,key) {
											if(procurecatgMap[value.code]!=null){
												GenericAlertService.alertMessage('Duplicate Procure Codes  are not allowed',"Error");
												forEach.break();
												}else
													{
													procurecatgMap[value.code]=true;
													}
										});
						var req = {
							"procureMentCatgTOs" : $scope.categoryList
						}
						var results =[];
						ProcureService.saveProcureCatgs(req).then(function(data) {
                        	   results =data.procureMentCatgTOs  ;
							   var succMsg = GenericAlertService.alertMessageModal('Procurement Details '+ data.message,data.status);
							   succMsg.then(function(data1) {			
									 var returnPopObj = {
			                                 "procureMentCatgTOs":  results                         
			                             }
									  deferred.resolve(returnPopObj); 
							   })
							},function (error){
									GenericAlertService.alertMessage('Procurement Details  are failed to save',"Error");
								});
						 ngDialog.close();
				}
					$scope.popUpRowSelect = function(category) {
						if (category.selected) {
							selectedCategory.push(category);
						} else {
							selectedCategory.pop(category);
						}
					},$scope.deleteRows = function() {
						if(selectedCategory.length==0){
							GenericAlertService.alertMessage('Please select atlist one row to delete',"Warning");
						}
						if(selectedCategory.length<$scope.categoryList.length)
							{
							angular.forEach(selectedCategory, function(value,key) {
								$scope.categoryList.splice($scope.categoryList.indexOf(value), 1);
							
							});
							selectedCategory=[];
							GenericAlertService.alertMessage('Rows are Deleted successfully',"Info");
							}else
								{
								GenericAlertService.alertMessage('Please leave atlist one row',"Warning");
								}
					}
				} ]
			});
			return deferred.promise;
		}
	$scope.activeProcureCatgs = function() {
		if (editCategories.length <= 0) {
			GenericAlertService.alertMessage('Please select at least one row to Activate','Warning');
			return;
		}
		var deleteIds = [];
		var nondeleteIds = [];
		if ($scope.selectedAll) {
			$scope.categories = [];
		} else {
			angular.forEach($scope.categories,function(value, key) {
				if (!value.selected) {
					nondeleteIds.push(value);
				} else {
					if (value.proCatgId != null && value.proCatgId > 0) {
						deleteIds.push(value.proCatgId);
					}
				}
			});
			var req = {
					"procureCatgIds" : deleteIds,
					"status":1
			};
			ProcureService.deleteProcureCatgs(req).then(function(data) {
			});
			GenericAlertService.alertMessage('Procurement Details are Activated successfully','Info');
			angular.forEach(editCategories, function(value, key) {
				$scope.categories.splice($scope.categories.indexOf(value), 1);
			}, function(error) {
				GenericAlertService.alertMessage('Procurement Details are failed to Activate',"Error");
			});
			editCategories = [];
			$scope.deleteIds = [];
		}
	}
		$scope.deleteProcureCatgs = function() {
			if (editCategories.length <= 0) {
				GenericAlertService.alertMessage('Please select at least one row to Deactivate','Warning');
				return;
			}
			var deleteIds = [];
			var nondeleteIds = [];
			if ($scope.selectedAll) {
				$scope.categories = [];
			} else {
				angular.forEach($scope.categories,function(value, key) {
					if (!value.selected) {
						nondeleteIds.push(value);
					} else {
						if (value.proCatgId != null && value.proCatgId > 0) {
							deleteIds.push(value.proCatgId);
						}
					}
				});
				var req = {
						"procureCatgIds" : deleteIds,
						"status":2
				};
				ProcureService.deleteProcureCatgs(req).then(function(data) {
				});
				GenericAlertService.alertMessage('Procurement Details are Deactivated successfully','Info');
				angular.forEach(editCategories, function(value, key) {
					$scope.categories.splice($scope.categories.indexOf(value), 1);
				}, function(error) {
					GenericAlertService.alertMessage('Procurement Details are failed to Deactivate',"Error");
				});
				editCategories = [];
				$scope.deleteIds = [];
			}
		}
		return service;
		});
