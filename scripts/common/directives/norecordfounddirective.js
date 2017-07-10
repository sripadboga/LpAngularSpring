'use strict';


app.directive('noRecordFound', function() {
    return {
        scope: {
        	
             num: '=numCol'
           
        },
        template: '<td colspan="num" class="text-center">No records found</td>'
 
    };
});
