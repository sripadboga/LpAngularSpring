'use strict';

app
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                parent: 'site',
                url: '/',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'login.html',
                        controller: 'LoginController'
                    }
                }
            });
    })
    .controller('MainController', function ($rootScope, $scope, $state, Auth,Principal) {

    	$scope.account = '';
    	$rootScope.moduleParentId=null;
		$rootScope.moduleId=null;
		$rootScope.moduleState=null;
    	
    	 $scope.authenticated = {'usrAuthSuccess':'N'};
    	  $scope.homeButton = function() {
				$rootScope.moduleId = null;
				$state.go("home");
			}
    	
    	 $scope.$on("loginsuccess", function() {
    		 
    		 
    		 console.log(' After loginsuccess event fired');
    		 
    	     Principal.identity().then(function(account) {
    	    	 console.log(' After loginsuccess event identify promise');
    	            $scope.account = account;
    	            $scope.authenticated.usrAuthSuccess = 'Y';  
    	       });
        });
    	 
    	 $scope.logout = function(){
    		 Auth.logout();
    		 $scope.authenticated.usrAuthSuccess = 'N'; 
   		  	 $state.go('account.logout');
    	 }
    	
    });
