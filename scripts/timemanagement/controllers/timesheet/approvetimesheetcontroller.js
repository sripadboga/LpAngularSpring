'use strict';
app
		.config(function($stateProvider) {
			$stateProvider.state('approvetimesheet', {
				url : '/approvetimesheet',
				data : {
					roles : []
				},
				views : {
					'content@' : {
						templateUrl : 'views/timemanagement/timesheet/approvetimesheet/approvestaff.html',
						controller : 'ApproveTimeSheetController'
					}
				}
			})
		})
		.controller(
				"ApproveTimeSheetController",
				function($rootScope,$scope,$state,ngDialog,UserEPSProjectService,UserService,SuperVisorTimeSheetFactory) {
				
					var editEmp = [];
					$scope.timesheet = [];
					$scope.deletecodes = [];
					var editTimeSheetDetails= [];
					var selectedEmp = [];
					var superPopup =[];
					$scope.superPopup = [];
					var addTimeSheet=[];
					$scope.addTimeSheet = [];
					
					$scope.supervisor = {
							"status" : 1,
							"clientId" : null,
							"labelKeyTO" : {

							"name" : null
							}
							};

							 
							
							
							var addsupervisorPersonPopup = [];
							$scope.supervisorPerson = function(labelKeyTO) {

								addsupervisorPersonPopup = SuperVisorTimeSheetFactory
							.getSuperVisors($rootScope.clientId);
								addsupervisorPersonPopup
							.then(
							function(data) {
							labelKeyTO.code = data.userListTO.userId;
							},
							function(error) {
							GenericAlertService
							.alertMessage(
							"Error occured while adding companies to precontract",
							'Error');
							});
							}
					
					
					
					
					$scope.getUserProjects = function() {					
					    var userProjectSelection=UserEPSProjectService.epsProjectPopup();
				    	userProjectSelection.then(function(userEPSProjData) {
				    		$scope.searchProject = userEPSProjData.selectedProject;
		                }, function(error) {
		                     GenericAlertService.alertMessage("Error occured while selecting EPS Project name",'Error');
		                });                   
				}
						
					
					
					//----Tabs----//
					$scope.timeSheetTab = [{
				        title: 'DateWise and EmployeeWise TaskListPerformed',
				        url: 'views/timemanagement/timesheet/approvetimesheet/datewise.html'
				    }, {
				        title: 'DateWise Expenses incurred',
				        url: 'views/timemanagement/timesheet/approvetimesheet/expenses.html'
				    }
				];
					$scope.currentTab = 'views/timemanagement/timesheet/approvetimesheet/datewise.html';
					$scope.onClickTimeSheetTab = function(tab) {
						$scope.currentTab= tab.url;
						}, $scope.isActiveTimeSheetTab = function(taburl) {
						return taburl == $scope.currentTab;
						}
						
					//---dropdowns---//
					$scope.crews = [{
				        id: 1,
				        name: 'Team',
				        desc: ''
				    }, {
				        id: 2,
				        name: 'Individual',
				        desc: ''
				    }
				   
				    ];
					  $scope.crewindvs= [{
					        parent: 1,
					        id: 9,
					        name: 'concreteworkCrew',
					        desc: ''
					    }, {
					        parent: 1,
					        id: 10,
					        name: 'EarthworkCrew',
					        desc: ''
					    }, {
					        parent: 1,
					        id: 11,
					        name: 'bridgeDesignTeam',
					        desc: ''
					    }, {
					        parent: 2,
					        id: 12,
					        name: 'E-101',
					        desc: ''
					    }
					   
					    ]
					  
					  $scope.timesheet= [{
		     				"employeeID" : '',
		    				"firstName" : "cc",
		    				"surName" : '',
		                    "tradeName" : '',
		                    "category" : '',
		                    "wageName" : '',
		                    "cosName" : '',
		                    "mon" : '',
		                    "tue" : '',
		                    "wed" : '',
		                    "thu" : '',
		                    "fri" : '',
		                    "sat" : '',
		                    "sun" : '',
		                    "total" : ''
		  }];
					  
					  $scope.expensesList= [{
						    "Date":'',
							"employeeId":'',
							"firstName":'',
							"surName":'',
						    "costcodeId":'',
							"amount":'',
							"desc":'',
		  }];
					  
					  $scope.dates= [{
		     				"employeeID" : 'aa',
		    				"firstName" : "cc",
		    				"surName" : 'ee',
		                    "tradeName" : '',
		                    "category" : '',
		                    "wageName" : '',
		                    "cosName" : '',
		                    "mon" : '1',
		                    "tue" : '2',
		                    "wed" : '3',
		                    "thu" : '',
		                    "fri" : '',
		                    "sat" : '',
		                    "sun" : '',
		                    "total" : 'a'
		  }];

					
				   

							$scope.deleteEmpClass = function(time) {
								$scope.deleteIds = [];
								if ($scope.selectedAll) {
									$scope.timesheet = [];
								} else {
									angular.forEach($scope.timesheet, function(
											value, key) {
										if (!value.select) {
											$scope.deleteIds.push(value);
										}
									});
									$scope.timesheet = $scope.deleteIds;
								}
								if ($scope.timesheet.length <= 0) {
									$scope.selectedAll = false;
								}
								$scope.deleteIds = [];
							}
				}).filter('crewDropdown', function () {
				    return function (secondcrewSelect, crewSelect) {
				        var filtered = [];
				        if (crewSelect === null) {
				            return filtered;
				        }
				        angular.forEach(secondcrewSelect, function (s2) {
				            if (s2.parent == crewSelect) {
				                filtered.push(s2);
				            }
				        });
				        return filtered;
				    }	
				    });

								

			