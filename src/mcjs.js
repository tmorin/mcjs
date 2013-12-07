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

    /* --- Bundle --- */

    function BundleStruct(platform, container) {
        function start(entry) {}
        this.start = start;

        function stop(entry) {}
        this.stop = stop;
    }
    Bundle.$inject = ['platform', 'container'];

    /* --- Container --- */

    function ContainerStruct(platform) {
        function start(container) {}
        this.start = start;

        function stop(container) {}
        this.stop = stop;
    }
    Container.$inject = ['platform'];

    /* --- Platform --- */

    function PlatformStruct() {
        function container(platform, containerId, params) {
            if (!containerId) {
                throw TypeError('containerId can not be empty');
            }
            if (!container[containerId]) {
                container[containerId] = {
                    params: params
                };
            }
            return container[containerId];
        }
        container.$Struct = ContainerStruct;
        this.container = container;
    }

    /* --- mcjs --- */

    function mcjs(params) {
        expromises(PlatformStruct, null, {
            injector: injector
        });
    }

    mcjs.repository = expromises(Repository, {});

    return mcjs;
}));
