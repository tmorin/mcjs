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
        define(['ioc', 'expromises'], factory);

    // <script>
    } else {
        mcjs = factory(ioc, expromises);
    }
}(function (ioc, expromises, Repository) {
    'use strict';

    var containers = {},
        injector = ioc();

    /* --- mcjs --- */
    var platform = {
        containers: {},
        entries: {}
    };
    function mcjs(params) {
        expromises(PlatformStruct, platform, {
            injector: injector
        });
    }

    mcjs.repository = expromises(Repository, platform.entries);

    return mcjs;
}));
