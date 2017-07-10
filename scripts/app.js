'use strict';

/**
 * @ngdoc overview
 * @name potApp
 * @description # potApp
 * 
 * Main module of the application.
 */

var app = angular.module(
		'potApp',
	['LocalStorageModule', 'tmh.dynamicLocale', 'ngResource','angular.filter','blockUI','ngInputDate', 'anguFixedHeaderTable','picardy.fontawesome','ui.router', 
		  'ngCookies','reCAPTCHA','ngFileUpload','angularFileUpload','pascalprecht.translate', 'ngCacheBuster', 'ngTable',
				'ui.bootstrap', 'angularUtils.directives.dirPagination',
				'ngAria', 'ngMessages', 'ngTouch', 'restangular','ngDialog', 	
				'ngSanitize']).run(
		function($rootScope, $location, $http, $state, Restangular, ngDialog, Auth, Principal,appUrl) {
		
			Restangular.setBaseUrl(appUrl.appurl);
			$rootScope.$on('$stateChangeStart', function(event, toState,
					toStateParams) {
				$rootScope.toState = toState;
				$rootScope.toStateParams = toStateParams;

			});
			$rootScope.$on("$stateChangeSuccess", function(event, toState,
					toParams, fromState, fromParams) {
				$rootScope.previousState_name = fromState.name;
			});
			$rootScope.back = function() {
				if ($rootScope.previousState_name === 'activate') {
					$state.go(previousState_name);
				} else {
					$state.go($rootScope.previousState_name,
							$rootScope.previousState_params);
				}
			};
		    Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
	            _.contains = _.includes;
	            if (Principal.isIdentityResolved()) {
	                headers["pottoken"] = Principal.potToken();               

	            } else {
	                Principal.identity().then(function (account) {
	                    if (account.token) {
	                        headers["pottoken"] = account.token;                        
	                    }
	                });
	            }

	            return {
	                element: element,
	                headers: headers,
	                params: params,
	                httpConfig: httpConfig
	            };
	        })

		}).config(function($stateProvider, $urlRouterProvider, $httpProvider,$locationProvider, $translateProvider,appUrlProvider) {
			  appUrlProvider.getAppURL();
		//	$locationProvider.html5Mode(true);
			$urlRouterProvider.otherwise('/');
			$stateProvider.state('site', {
				'abstract' : true,
			})
			

		});
