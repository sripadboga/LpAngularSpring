'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # PreContract Service in the potApp.
 */
app.factory('PreContractExternalService', function(Restangular) {
	return {
		getExternalPreContracts : function(req) {

			var contractDetails = Restangular
					.one("procurement/getExternalPreContracts").customPOST(req, '', {},
							{
								ContentType : 'application/json'
							});
			return contractDetails;
		},
		
		getWorkFlowstatus : function() {
			var workFlowstatus = Restangular.one(
					"procurement/getWorkFlowStatus").customPOST(null, '', {}, {
				ContentType : 'application/json'
			});
			return workFlowstatus;
		},
		getPreContractTypes : function(req) {

			var contractDetails = Restangular.one(
					"procurement/getPreContractTypes").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return contractDetails;
		},
		getExternalPreContractPopupOnLoad : function(req) {
			var costCodes = Restangular.one(
					"procurement/getExternalPreContractPopupOnLoad").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costCodes;
		},
		getPreContractReqApprs : function(req) {
			var reqApprovals = Restangular.one(
					"procurement/getPreContractReqApprs").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return reqApprovals;
		},
		getPreContratCompanies : function(req) {
			var reqApprovals = Restangular.one(
					"procurement/getPreContratCompanies").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return reqApprovals;
		},
		
		saveExternalPreContracts : function(req) {

			var costSaveStatus = Restangular
					.one("procurement/saveExternalPreContracts").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return costSaveStatus;
		},
		deactivateInternalRequest : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/deactivatePreContracts").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		deactivatePreContractDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/deactivatePreContractDetails").customPOST(req,
					'', {}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratEmpDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratEmpTypes").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratPlantDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratPlants").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratMaterialDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratMaterials").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return costDeactivateStatus;
		},
		getPreContratServiceDetails : function(req) {
			var costDeactivateStatus = Restangular.one(
					"procurement/getPreContratServices").customPOST(req, '',
					{}, {
						ContentType : 'application/json'
					});
			return serDetails;
		},savePreContratEmpTypes : function(req) {

			var saveStatus = Restangular
					.one("procurement/savePreContratEmpTypes").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveStatus;
		},savePreContratMaterials : function(req) {

			var saveStatus = Restangular
					.one("procurement/savePreContratMaterials").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveStatus;
		},savePreContratPlants : function(req) {

			var saveStatus = Restangular
					.one("procurement/savePreContratPlants").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveStatus;
		},savePreContratServices : function(req) {

			var saveStatus = Restangular
					.one("procurement/savePreContratServices").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveStatus;
		},savePreContratCompanies : function(req) {

			var saveStatus = Restangular
					.one("procurement/savePreContratCompanies").customPOST(req, '',
							{}, {
								ContentType : 'application/json'
							});
			return saveStatus;
		}
		
	}
});
