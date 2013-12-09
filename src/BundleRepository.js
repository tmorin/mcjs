/*jslint sloppy: true */
(function (factory) {
    /*global exports:false, module:true, define:false, McBundleRepository:true */

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);

    // <script>
    } else {
        McBundleRepository = factory();
    }
}(function () {
    'use strict';

    function BundleRepository(defaultBundleEntries) {
        var bundleEntries = defaultBundleEntries || {};

        this.add = function add(bundleEntry) {
            if (!bundleEntry) {
                throw new TypeError('bundleEntry is mandatory');
            }
            if (!bundleEntry.uri) {
                throw new TypeError('bundleEntry.uri is mandatory');
            }
            if (bundleEntries.hasOwnProperty(bundleEntry.uri)) {
                throw new Error(bundleEntry.uri + ' is already registered');
            }
            bundleEntries[bundleEntry.uri] = bundleEntry;
            return bundleEntries;
        };

        this.get = function get(uri) {
            if (!uri) {
                throw new TypeError('uri is mandatory');
            }
            if (bundleEntries.hasOwnProperty(uri)) {
                return bundleEntries[uri];
            }
            throw new Error('Unable to find the bundle entry ' + uri);
        };

        this.remove = function remove(uri) {
            if (!uri) {
                throw new TypeError('uri is mandatory');
            }
            if (bundleEntries.hasOwnProperty(uri)) {
                delete bundleEntries[uri];
            }
            return bundleEntries;
        };
    }

    return BundleRepository;
}));
