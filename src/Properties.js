/*jslint sloppy: true */
(function (factory) {
    /*global exports, module:true, define, McProperties:true */

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);

    // <script>
    } else {
        McProperties = factory();
    }
}(function () {
    'use strict';

    function recursiveSet(root, path, value) {
        var parts = path.split('.'),
            key = parts.shift();
        if (parts.length < 1) {
            root[key] = value;
        } else {
            root[key] = {};
            recursiveSet(root[key], parts.join('.'), value);
        }
    }

    function recursiveGet(root, path, defaultValue) {
        var parts = path.split('.'),
            key = parts.shift();
        if (root.hasOwnProperty(key)) {
            if (parts.length > 1) {
                return recursiveGet(root[key], parts.join('.'), defaultValue);
            }
            return root[key];
        }
        return defaultValue;
    }

    function Properties(defaultProperties) {
        var properties = defaultProperties || {};

        this.set = function set(path, value) {
            recursiveSet(properties, path, value);
        };


        this.get = function get(path, defaultValue) {
            return recursiveGet(properties, path, defaultValue);
        };
    }

    return Properties;
}));
