'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # EmailSetting Service in the potApp.
 */
app.factory('EmailSettingService', function(Restangular) {
	return {
		getEmailSettings : function(req) {
			var result = Restangular.one("user/getEmailSettings").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return result;
		},
		saveEmailSettings : function(req) {
			var saveStatus = Restangular.one("user/saveEmailSettings").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return saveStatus;
		},
		deactivateEmailSettings : function(req) {
			var deactivateStatus = Restangular.one("user/deactivateEmailSettings").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return deactivateStatus;
		}

	}
});
