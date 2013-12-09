/*jslint sloppy: true */
(function (factory) {
    /*global exports, module:true, define, McPlatform:true, Q, McBundleRepository, McProperties, McContainer */

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['q', './BundleRepository', './Properties', './Container'], factory);

    // <script>
    } else {
        McPlatform = factory(Q, McBundleRepository, McProperties, McContainer);
    }
}(function (Q, BundleRepository, Properties, Container) {
    'use strict';

    function Platform(defaultParams) {
        var params = defaultParams || {},
            containers = params.defaultContainers || {};

        this.params = params;
        this.bundleRepository = new BundleRepository(params);
        this.properties = new Properties(params.properties);

        /**
         * Create or get a container from its identifier
         * @param containerId {String} the container identifier
         * @param [containerParams] {Object} the container params
         * @return {Container} the container
         */
        this.container = function container(containerId, containerParams) {
            if (!containerId) {
                throw new TypeError('containerId can not be empty');
            }
            if (!containers[containerId]) {
                containers[containerId] = new Container(this, containerId, containerParams || {});
            }
            return containers[containerId];
        };

        this.resolveBundles = function resolveBundles(bundlesUri) {
            return Q.resolve([]);
        };
    }

    return Platform;
}));
