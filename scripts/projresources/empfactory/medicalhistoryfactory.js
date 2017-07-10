'use strict';
app.factory('MedicalHistoryFactory',	function(ngDialog, $q, $filter, $timeout, $rootScope,EmpRegisterService,GenericAlertService ) {
		var medicalHistoryPopUp;
		var service = {};
		service.medicalHistoryPopUp = function(actionType,editEmpMedicalHistory) {
		var deferred = $q.defer();
		medicalHistoryPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/medicalhistory/medicalrecordspopup.html',
			
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				var selectedEmpMedicalRecords=[];
				$scope.addEmpMedicalHistory =[];
				if (actionType === 'Add'){		
					$scope.addEmpMedicalHistory.push({
						"selected" : false,
						"date" :'',
						"projectPosting" :'',
						"epsId" :'',
						"epsName" : '',
						"pId"  : '',
						"pName" :'',
						"record" :'',
						"itemRecord" :'',
						"particulars" :'',
						"category" :'',
						"documents" :'',
						"notes" : ''
					});
				}	
				else {
					$scope.addEmpMedicalHistory = angular.copy(editEmpMedicalHistory);
					editEmpMedicalHistory=[];
				}
				
				$scope.addRows = function() {
					$scope.addEmpMedicalHistory.push({
						"selected" : false,
						"date" :'',
						"projectPosting" :'',
						"epsId" :'',
						"epsName" : '',
						"pId"  : '',
						"pName" :'',
						"record" :'',
						"itemRecord" :'',
						"particulars" :'',
						"category" :'',
						"documents" :'',
						"notes" : ''
						
					});
				},
				$scope.medicalHistoryPopUpRowSelect = function(medicalrecords) {
					if (medicalrecords.selected) {
						selectedEmpMedicalRecords.push(medicalrecords);
					} else {
						selectedEmpMedicalRecords.pop(medicalrecords);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEmpMedicalRecords.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEmpMedicalRecords.length<$scope.addEmpMedicalHistory.length)
					{
						angular.forEach(selectedEmpMedicalRecords, function(value,key) {
							$scope.addEmpMedicalHistory.splice($scope.addEmpMedicalHistory.indexOf(value), 1);
						});
						selectedEmpMedicalRecords=[];
						GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				}
				 
				$scope.save = function(){
					var req={
					
				}
					EmpRegisterService.saveEmpregisters(req).then(function(data) {
						GenericAlertService.alertMessage('Employee Medical History Details  '+data.message,data.status);
					},function(error){
						GenericAlertService.alertMessage('Employee Medical History Details Failed to Save ',"Info");
					});
					ngDialog.close();
				}
		}]
		
		});
						return deferred.promise;
					}
					return service;
				});
