'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Measure Service in the potApp.
 */
app.factory('WeatherService', function(Restangular) {
	return {
		getWeathers : function(req) {
			var weather = Restangular.one("centrallib/getWeathers").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return weather;
		},
		saveWeathers : function(req) {
			var resultStatus = Restangular.one("centrallib/saveWeathers").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		deleteWeathers : function(req) {
			var deleteStatus = Restangular.one("centrallib/deleteWeathers").customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteStatus;
		}

	}

});
