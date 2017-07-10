'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjSOE Service in the potApp.
 */
app.factory('ProjSOEService', function(Restangular) {
	return {
		getSOEDetails : function(req) {
			var soeDetails = Restangular.one(
					"projectlib/getSOEItems").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return soeDetails;
		},
		/*
		 * getProjSOEItemsById : function(req) { var soeDetails =
		 * Restangular.one(
		 * "projectlib/getProjSOEItemsById").customPOST( req, '',
		 * {}, { ContentType : 'application/json' }); return soeDetails; }
		 */
		saveSOEDetails : function(req) {
			var soeSaveStatus = Restangular.one(
					"projectlib/saveSOEItems").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return soeSaveStatus;
		},
		deactivateSOEDetails : function(req) {
			var soeDeactivateStatus = Restangular.one(
					"projectlib/deleteSOEItems").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return soeDeactivateStatus;
		},
		projSoeifOnLoad : function(req) {
			var measure = Restangular.one(
					"projectlib/projSoeifOnLoad").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return measure;
		}

	}
});
