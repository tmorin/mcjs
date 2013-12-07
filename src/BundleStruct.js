(function (factory) {
    // Turn off strict mode for this function so we can assign to global.ioc
    /* jslint strict: false */

    // see https://github.com/kriskowal/q/blob/master/q.js

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the ioc API and when
    // executed as a simple <script>, it creates a ioc global instead.

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);

    // <script>
    } else {
        McBundleStruct = factory();
    }
}(function () {
    'use strict';

    function BundleStruct() {
        function start(container) {}
        this.start = start;

        function stop(container) {}
        this.stop = stop;
    }

    return BundleStruct;
}));
