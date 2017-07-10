'use strict';

/**
 * @ngdoc service
 * @name potApp.module
 * @description # ProjCostCode Service in the potApp.
 */
app.factory('EmpRegisterService', function(Restangular) {
	return {
		
		getEmpregisters: function(req) {
			var getEmployees = Restangular.one("register/getEmpregisters")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return getEmployees;
		},
		empRegisterOnLoad : function(req) {
			console.log(JSON.stringify(req));
			var employees = Restangular.one("register/empRegisterOnLoad")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return employees;
		},
		saveEmpregisters : function(req) {
			console.log(JSON.stringify(req));
			var saveEmpData = Restangular.one("register/saveEmpregisters").customPOST(
					req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpData;
		},
		deactivateRegisters : function(req) {
			var empDeactivateStatus = Restangular.one(
					"register/EmpRegistersDeactivate").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empDeactivateStatus;
		},
		
		getEmpEnrollments : function(req) {
			var empEnrollments = Restangular.one(
					"register/getProjEmpRegisters").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empEnrollments;
		},
		saveEmpEnrollments : function(req) {
			console.log(JSON.stringify(req));
			var saveEmpEnrollmentsData = Restangular.one(
					"register/saveProjEmpRegisters").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveEmpEnrollmentsData;
		},
		deactivateEmpEnrollments : function(req) {
			var deactivateEmpEnrollments = Restangular.one(
					"register/deactivateProjEmpRegisters").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return deactivateEmpEnrollments;
		},
		
		getEmpServiceHistory : function(req) {
			var empServiceHistory = Restangular.one(
					"register/getEmpServiceHistory").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empServiceHistory;
		},
		saveEmpServiceHistory : function(req) {
			var saveEmpServiceData = Restangular.one(
					"register/saveEmpServiceHistory").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveEmpServiceData;
		},
		deactivateEmpServiceHistory : function(req) {
			var deactivateEmpService = Restangular.one(
					"register/deactivateEmpServiceHistory").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return deactivateEmpService;
		},
		
		getEmpChargeOutRates : function(req) {
			var empChargeOutRates = Restangular.one(
					"register/getEmpChargeOutRates").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empChargeOutRates;
		},
		saveEmpChargeOutRates : function(req) {
			var saveEmpChargeData = Restangular.one(
					"register/saveEmpChargeOutRates").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveEmpChargeData;
		},
		deactivateEmpChargeOutRates : function(req) {
			var deactivateEmpCharge = Restangular.one(
					"register/deactivateEmpChargeOutRates").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return deactivateEmpCharge;
		},
		
		getEmpRegPayAllowances : function(req) {
			var empRegPayAllowances = Restangular.one(
					"register/getEmpRegPayAllowances").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empRegPayAllowances;
		},
		saveEmpRegPayAllowances : function(req) {
			var saveEmpRegPayData = Restangular.one(
					"register/saveEmpRegPayAllowances").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveEmpRegPayData;
		},
		deactivateEmpRegPayAllowances : function(req) {
			var deactivateEmpRegPay = Restangular.one(
					"register/deactivateEmpRegPayAllowances").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return deactivateEmpRegPay;
		},
		
		getEmpNonRegPayments : function(req) {
			var empNonRegPayment = Restangular.one(
					"register/getEmpNonRegPayments").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empNonRegPayment;
		},
		saveEmpNonRegPayments : function(req) {
			var saveEmpNonRegPayData = Restangular.one(
					"register/saveEmpNonRegPayments").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveEmpNonRegPayData;
		},
		deactivateEmpNonRegPayments : function(req) {
			var deactivateEmpNonRegPay = Restangular.one(
					"register/deactivateEmpNonRegPayments").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return deactivateEmpNonRegPay;
		},
		
		getEmpTax : function(req) {
			var empTax = Restangular.one(
					"register/getEmpTax").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return empTax;
		},
		saveEmpTax : function(req) {
			var saveEmpTaxData = Restangular.one(
					"register/saveEmpTax").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return saveEmpTaxData;
		},
		deactivateEmpTaxDetails : function(req) {
			var deactivateEmpTax = Restangular.one(
					"register/deactivateEmpTaxDetails").customPOST(req, '', {},
					{
						ContentType : 'application/json'
					});
			return deactivateEmpTax;
		},
		
		getEmpBankAccountDetails : function(req) {
			var empBankAccount = Restangular.one("register/getEmpBankAccountDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return empBankAccount;
		},
		empBankAccountDetailsOnLoad : function(req) {
			var empBankOnLoadDtls = Restangular.one("register/empBankAccountDetailsOnLoad")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return empBankOnLoadDtls;
		},
		saveEmpBankAccountDetails : function(req) {
			var saveBankAccountDtls = Restangular.one("register/saveEmpBankAccountDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveBankAccountDtls;
		},
		deactivateBankAccDetails : function(req) {
			var deactivateBankAcc = Restangular.one("register/deactivateBankAccountDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateBankAcc;
		},
		
		getEmpPFDetails : function(req) {
			var empPF = Restangular.one("register/getEmpPFDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return empPF;
		},
		saveEmpPFDetails : function(req) {
			var saveEmpPFDtls = Restangular.one("register/saveEmpPFDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpPFDtls;
		},
		deactivateEmpPFDetails : function(req) {
			var deactivateEmpPF = Restangular.one("register/deactivateEmpPFDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateEmpPF;
		},
		
		getEmpMedicalHistory : function(req) {
			var empMedicalHistory = Restangular.one("register/getEmpMedicalHistory")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return empMedicalHistory;
		},
		saveEmpMedicalHistoryDtls : function(req) {
			var saveEmpMedicalDtls = Restangular.one("register/saveEmpMedicalHistoryDtls")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpMedicalDtls;
		},
		deactivateEmpMedicalDetails : function(req) {
			var deactivateEmpMedical = Restangular.one("register/deactivateEmpMedicalDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateEmpMedical;
		},
		
		getEmpAttendanceDtls : function(req) {
			var empAttendance = Restangular.one("register/getEmpAttendance")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return empAttendance;
		},
		saveEmpAttendanceDtls : function(req) {
			var saveEmpAttendance = Restangular.one("register/saveEmpAttendanceDtls")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpAttendance;
		},
		deactivateEmpAttendanceDetails : function(req) {
			var deactivateEmpAttendance = Restangular.one("register/deactivateEmpAttendanceDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateEmpAttendance;
		},
		
		getEmpContactDetails : function(req) {
			var getEmpContactDtls = Restangular.one("register/getEmpContactDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return getEmpContactDtls;
		},
		saveEmpContacts : function(req) {
			var saveEmpContactDtls = Restangular.one("register/saveEmpContactDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpContactDtls;
		},
		deactivateEmpContacts : function(req) {
			var deactivateEmpContactDtls = Restangular.one("register/saveEmpContactDetails")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateEmpContactDtls;
		},
		getEmpNOKDetails : function(req) {
			var getEmpNOKDetails = Restangular.one("register/getEmpNok")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return getEmpNOKDetails;
		},
		saveEmpNOK : function(req) {
			var saveEmpNOKDetails = Restangular.one("register/saveEmpNok")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return saveEmpNOKDetails;
		},
		deactivateEmpNOK : function(req) {
			var deactivateEmpNOKDetails = Restangular.one("register/deactivateEmpNOK")
					.customPOST(req, '', {}, {
						ContentType : 'application/json'
					});
			return deactivateEmpNOKDetails;
		}
	}
});
