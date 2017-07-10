'use strict';

/**
 * @ngdoc function
 * @name potApp.Home controller
 * @description # Home Controller of the potApp
 */
app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url : '/home',
		data : {
			roles : []
		},
		views : {
			'content@' : {
				templateUrl : 'views/home/home.html',
				controller : 'HomeController'
			}
		}
	})
}).controller(
		'HomeController',
		function($rootScope, $location, $scope, $state, HomeService,Principal,
				GenericAlertService) {
			$scope.account = '';
			
		      Principal.identity().then(function(account) {
		            $scope.account = account;
		       });
			
			
			$scope.modules = {};
			var req = {
				moduleId : $rootScope.moduleId
			};
			$scope.init = function() {
				HomeService.getModulesByParent(req).then(function(data) {
					$scope.modules = data.moduleTOs;
					
				})
			}, $scope.go = function(appModule) {
				if (appModule.moduleURLValue === null
						|| appModule.moduleURLValue === "") {
					req.moduleId = appModule.moduleId;
					$rootScope.moduleId = appModule.moduleId;
					$rootScope.moduleParentId = appModule.moduleParentId;
					HomeService.getModulesByParent(req).then(
							function(data) {
								$scope.modules = data.moduleTOs;
							},
							function(error) {
								GenericAlertService.alertMessage(
										"Error occured while loading modules",
										'Error');
							});
				} else {
					$state.go(appModule.moduleURLValue);
				}
			}, $scope.backButton = function() {
				$scope.init();
			};

		});
