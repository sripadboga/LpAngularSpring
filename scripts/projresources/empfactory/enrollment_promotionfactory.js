'use strict';
app.factory('EmpEnrollmentFactory',	function(ngDialog,$q, $filter, $timeout,UserEPSProjectService , $rootScope,EmpRegisterService ,GenericAlertService ) {
		var empEnrollmentPopUp;
		var service = {};
		service.empEnrollmentPopUp = function(actionType,editEmpPromotion) {
		var deferred = $q.defer();
		empEnrollmentPopUp = 	ngDialog.open({
			template : 'views/projresources/projempreg/emppromotion/enrollmentpromotionpopup.html',
			closeByDocument : false,
			showClose : true,
			controller : ['$scope',function($scope){
				$scope.action = actionType;
				$scope.addEmpPromotions =[];
				 var selectedEnrollment=[];
				
				 $scope.getUserProjects = function(promotion) {
						var userProjectSelection = UserEPSProjectService
								.epsProjectPopup();
						userProjectSelection
								.then(
										function(userEPSProjData) {
											$scope.searchProject = userEPSProjData.selectedProject;
											promotion.epsId = userEPSProjData.selectedProject.parentEPSCode;
											promotion.epsName = userEPSProjData.selectedProject.parentName;
											promotion.projId = userEPSProjData.selectedProject.projCode;
											promotion.projName = userEPSProjData.selectedProject.projName;
										},
										function(error) {
											GenericAlertService
													.alertMessage(
															"Error occured while selecting EPS Project name",
															'Error');
										});
					}
				 
				if (actionType === 'Add'){		
				$scope.addEmpPromotions.push({
					"selected" : false,
					"epsId" : '',
					"epsName" : '',
					"projId" : '',
					"projName" : '',
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
			}	
			else {
				$scope.addEmpPromotions = angular.copy(editEmpPromotion);
				editEmpPromotion=[];
			}
			$scope.addPromotions = function() {
				$scope.addEmpPromotions.push({
					"selected" : false,
					"eId" : '',
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
				$scope.promotionPopUpRowSelect = function(promotion) {
					if (promotion.selected) {
						selectedEnrollment.push(promotion);
					} else {
						selectedEnrollment.pop(promotion);
					}
				},
				$scope.deleteRows = function() {
					if(selectedEnrollment.length==0){
						GenericAlertService.alertMessage('Please select atleast one row to delete',"Warning");
					}if(selectedEnrollment.length<$scope.addEmpPromotions.length)
					{
						angular.forEach(selectedEnrollment, function(value,key) {
							$scope.addEmpPromotions.splice($scope.addEmpPromotions.indexOf(value), 1);
						});
						selectedEnrollment=[];
						GenericAlertService.alertMessage('Rows are deleted Successfully',"Info");
						}else
						{
							GenericAlertService.alertMessage('Please leave atleast one row',"Warning");
							}
				},

			$scope.saveEmpEnrollemnets = function(){
				var saveEmpEnrollementReq={
						"projEmpRegisterTOs": $scope.addEmpPromotions
				}
				EmpRegisterService.saveEmpEnrollments(saveEmpEnrollementReq).then(function(data) {
					GenericAlertService.alertMessage('Employee Enrollment and Promotion Details '+data.message,data.status);
				},function(error){
					GenericAlertService.alertMessage('Employee Enrollment and Promotion Details  are Failed to Save ',"Error");
				});
				ngDialog.close();
			}
		}]
	});
	return deferred.promise;
	}
	return service;
});
