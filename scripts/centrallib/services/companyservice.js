'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # Company Service in the potApp.
 */
app.factory('CompanyService', function(Restangular) {
	return {
		getCompanies : function(req) {
			var company = Restangular.one("centrallib/getCompanies").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return company;
		},
		onLoadDataForCompany : function(req) {
			var bussAct = Restangular.one("centrallib/onLoadDataForCompany").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return bussAct;
		},
		getCompanyDetails : function(req) {
			var details = Restangular.one("centrallib/getCompanyDetails").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return details;
		},getProjectsByClient : function(req) {
			var projs = Restangular.one("centrallib/getProjectsByClient").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return projs;
		},saveCompany : function(req) {
			var resultStatus = Restangular.one("centrallib/saveCompany").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		saveAddress : function(req) {
			var resultStatus = Restangular.one("centrallib/saveAddress").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		saveContacts : function(req) {
			var resultStatus = Restangular.one("centrallib/saveContacts").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return resultStatus;
		},
		saveCompanyCurrentProjs : function(req) {
			var resultProjStatus = Restangular.one("centrallib/saveCompanyCurrentProjs").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return resultProjStatus;
		},
		deleteCompanies : function(req) {
			var delCmpStatus = Restangular.one("centrallib/deleteCompanies").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return delCmpStatus;
		},
		deleteAddress : function(req) {
			var deleteAddrStatus = Restangular.one("centrallib/deleteAddress").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteAddrStatus;
		},
		deleteContacts : function(req) {
			var deleteContStatus = Restangular.one("centrallib/deleteContacts").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteContStatus;
		},
		deleteCompanyCurrentProjs : function(req) {
			var deleteProjStatus = Restangular.one("centrallib/deleteCompanyCurrentProjs").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return deleteProjStatus;
		},
		moveToToCmpClosedProjs : function(req) {
			var moveProjStatus = Restangular.one("centrallib/moveToCmpClosedProjs").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return moveProjStatus;
		}
	}
});
