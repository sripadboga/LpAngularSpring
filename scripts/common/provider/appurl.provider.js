'use strict';

app.provider('appUrl', function (POTURL) {
    	var urls={appurl:''};
   
    		this.getAppURL = function(){   
    			
    			console.log('  from app url provider ');
				
				var appurl;
				
					
				if (POTURL.IS_PROD_STAGE_URL){
					appurl = POTURL.API_PROD_STAGE_URL;
				}
				
				urls.appurl = appurl;
				
				
				console.log('  from app url provider urls '+urls.appurl);
				
    		};
    		this.$get = function() {
    	        return urls;
    	    };
    		
    
    	

    });
