/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
        .constant('APP_BRAND', {
            SMALL : 'modules/core/img/brand/sm_dg_symbol_light.png',
            BIG : 'modules/core/img/brand/dg_full_light.png'
        })
        .constant('DATE_FORMATS', {
            EN_DATE_TIME : "MM/dd/yyyy 'at' h:mm a"
        })
        .constant('CHARGEBEE_API', {
            PREFIX : 'chargebee/',
            EVENTS : 'events/'
        })
      ;

})();

