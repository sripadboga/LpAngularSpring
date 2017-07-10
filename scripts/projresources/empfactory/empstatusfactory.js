'use strict';
app.factory('EmpStatusFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var empStatusFactoryPopUp;
		var service = {};
		service.empStatusFactoryPopUp = function(actionType,editEmpStatus) {
		var deferred = $q.defer();
		empStatusFactoryPopUp =  ngDialog.open(
				 {
					 template : 'views/projresources/projempreg/empstatus/currentstatuspopup.html',
		             closeByDocument : false, showClose : true,
		               controller : ['$scope',function($scope){ 
			          $scope.action = actionType;
		                  $scope.addEmpStatus =[];
		 if (actionType === 'Add'){
			 $scope.addEmpStatus.push(
					 { 
						 "selected" : false,
						 "epsId" : '',
						 "epsName" : '', 
						 "pId" : '', 
						 "pName" : '', 
						 "status" :  '', 
						 "actualMobDate" : '', 
						 "expectedDeMobDate" :'',
						 "actualDeMobDate" :'',
		                    "record" :''
		  
		  });
			 } 
		 else { $scope.addEmpStatus = angular.copy(editEmpStatus); 
		 editEmpStatus=[];
		 }
		  $scope.addRows = function() { 
			  $scope.addEmpStatus.push(
					  { "selected" : false,
						  "eId" : '',
						  "fName" : '', 
						  "lName" : '', 
						  "pComId" : '', 
						  "pComName" :'', 
						  "gender" : '',
		                "dob" : '',
		               "tradeName" : '',
		              "locOrNonLoc" : '', 
		               "empType" : '',
		               "existOrNew" : '',
		              "epsId" : '', 
		              "epsName" : '',
		              "pId" : '', 
		               "pName" : '',
		            "pon" :'',
		            "posItemId" :'', 
		            "resourceClassId" :'',
		             "resourceClassName" :'',
		             "enrolDate" :'', 
		            "enrolLoc" :'', 
		            "empIdName" :'', 
		            "empCDate" :'',
		            "empCNum":'', 
		             "empCDoc":''
		  });
			  },
		  
		  $scope.deleteRows = function() {
				  var tempTableData =[];
		  angular.forEach($scope.addEmpStatus,function(value,key){
		  console.log(value);
		  if (!value.selected){
			  tempTableData.push(value);
			  }
		  });
		  
		  $scope.addEmpStatus = tempTableData; 
		 }
		  $scope.save = function(addEmpStatus,empStatusForm){
		  if(empStatusForm.$invalid){
			  alert("please enter proper values"); 
			  }else{
		  alert("success"); 
		  alert("emp Status Form Details"+JSON.stringify(addEmpStatus)); 
		  ngDialog.close(); 
		  }
		   }
		  
		   }]
		  }); 
						return deferred.promise;
					}
					return service;
				});
