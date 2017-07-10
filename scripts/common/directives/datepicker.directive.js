angular.module('potApp').directive('potdatePicker', function ($filter, $timeout) {   return {
    restrict: 'A',
    replace: true,
    scope: {            
        fromDate: '=',
        toDate: '=',
        offset:'=',
        dateType:'@'
    },
    link: function (scope, element, attrs) {
    	
    	 $("#"+attrs.id ).datepicker( { dateFormat: "dd-M-yy" });
    	
    	
    }
};});
