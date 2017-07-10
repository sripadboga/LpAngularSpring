'use strict';

app
    .factory('Sessions', function ($resource) {
        return $resource('app/rest/account/sessions/:series', {}, {
            'getAll': { method: 'GET', isArray: true}
        });
    });



