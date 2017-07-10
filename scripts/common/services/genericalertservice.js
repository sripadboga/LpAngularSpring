'use strict';

app.factory('GenericAlertService', function(ngDialog, $q, $filter, $timeout,
		$rootScope) {
	var alertPopup, rPopup, confirmPopup;
	var service = {};
	service.alertMessage = function(message, header) {
		alertPopup = ngDialog.open({
			template : 'views/alerts/alert-popup.html',
			className : 'ngdialog-theme-plain ng-dialogueCustom7',
			showClose : true,
			closeByDocument : false,
			controller : [ '$scope', function($scope, reqService) {
				$scope.header = header || 'Alert !';
				$scope.message = message;
				$scope.closePopup = function() {
					// ngDialog.close(alertPopup);
					$scope.closeThisDialog(alertPopup);
				};
				$scope.confirm = function() {
					// ngDialog.close(alertPopup);
					$scope.closeThisDialog(alertPopup);
				}
			} ]
		});
	};
	service.alertMessageModal = function(message, header) {
		var deferred = $q.defer();
		alertPopup = ngDialog.openConfirm({
			template : 'views/alerts/alert-popup.html',
			className : 'ngdialog-theme-plain ng-dialogueCustom7',
			showClose : true,
			closeByDocument : false,
			controller : [ '$scope', function($scope, reqService) {
				$scope.header = header || 'Alert !';
				$scope.message = message;
				$scope.closePopup = function() {
					deferred.reject();
				};
				$scope.confirm = function() {
					// ngDialog.close(alertPopup);
					$scope.closeThisDialog(alertPopup);
					deferred.resolve();
				}
			} ]

		});
		deferred.resolve();
		return deferred.promise;
	};

	service.confirmMessageModal = function(message, header, button1, button2) {
		var deferred = $q.defer();
		alertPopup = ngDialog.openConfirm({
			template : 'views/alerts/confirm-popup.html',
			className : 'ngdialog-theme-plain ng-dialogueCustom7',
			showClose : true,
			closeByDocument : false,
			controller : [ '$scope', function($scope, reqService) {
				$scope.header = header || 'Confirm !';
				$scope.message = message;
				$scope.button1 = button1;
				$scope.button2 = button2;

				$scope.closePopup = function() {
					$scope.closeThisDialog();
					deferred.reject();
				};
				$scope.confirm = function() {
					$scope.closeThisDialog();
					deferred.reject();
				}
				$scope.continueAction = function() {
					$scope.closeThisDialog();
					deferred.resolve();
				}

			} ]
		});
		return deferred.promise;
	};

	return service;

});
