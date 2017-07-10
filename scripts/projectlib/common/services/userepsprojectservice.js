'use strict';

app.factory('UserEPSProjectService', function(ngDialog, $q, $filter, $timeout,$rootScope,ProjEmpClassService,GenericAlertService) {
	var  epsProjPopup;
	var service = {};

	 service.epsProjectPopup = function () {
         var deferred = $q.defer();
         epsProjPopup = ngDialog.open({
             template: 'views/projectlib/common/epsprojectselect.html',
             className: 'ngdialog-theme-plain ng-dialogueCustom1',
             controller: ['$scope', function ($scope) {
                 $scope.userProjDetailsTOs = []; 
                 $scope.init = function(){
                	 var req = {						
 							"status" : 1
 						};
                	 ProjEmpClassService.getUserProjects(req).then(function(data) {
							$scope.userProjDetailsTOs = data.userProjDetailsTOs;
						},function(error){
							GenericAlertService.alertMessage('An error occurred while fetching EPS Project details',"Error");
						});
                 }

                 $scope.init();
                 
                 
                 $scope.selectproject = function (projDetail) {                    
                             ngDialog.close(epsProjPopup);
                             var returnPopObj = {
                                 "selectedProject": projDetail                                 
                             };
                             deferred.resolve(returnPopObj);                        
                    
                 }         
              }]
         });
         return deferred.promise;
     };



	return service;

});
