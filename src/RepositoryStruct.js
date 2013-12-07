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
        McRepositoryStruct = factory();
    }
}(function () {
    'use strict';

    function EntryStruct() {
        function repository() {
            return this;
        }
        repository.$Struct = RepositoryStruct;
        this.repository = repository;
    }

    function RepositoryStruct() {
        function add(entries, entry) {
            if (!entry) {
                throw new TypeError('entry is mandatory');
            }
            if (entries.hasOwnProperty(entry.uri)) {
                throw new Error(entry.uri + ' is already registered');
            }
            entries[entry.uri] = entry;
            return entries;
        }
        this.add = add;

        function get(entries, uri) {
            if (!uri) {
                throw new TypeError('uri can not be empty');
            }
            if (entries.hasOwnProperty(uri)) {
                return entries[uri];
            }
            throw new Error('unable to find the entry ' + uri);
        }
        get.$Struct = EntryStruct;
        this.get = get;

        function remove(entries, uri) {
            if (!uri) {
                throw new TypeError('uri can not be empty');
            }
            delete entries[uri];
            return entries;
        }
        this.remove = remove;
    }

    return RepositoryStruct;
}));
