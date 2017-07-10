'use strict';

app
    .factory('Account', function ($resource,appUrl,localStorageService) {
        console.log('  account service   appUrl'+appUrl.appurl);    
       
        return $resource(appUrl.appurl+'account', {}, {
            'get': { method: 'GET', headers: { 'pottoken': localStorageService.pottoken},params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                       
                        return response;
                    }
                }
            }
        });
    });



