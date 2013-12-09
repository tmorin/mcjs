/*jslint sloppy: true */
(function (factory) {
    /*global exports:false, module:true, define:false, McBundle:true, Q:false */

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['./q'], factory);

    // <script>
    } else {
        McBundle = factory(Q);
    }
}(function (Q) {
    'use strict';

    function Bundle(platform, container, bundleEntry, defaultParams) {
        var params = defaultParams || {},
            dependencies = params.dependencies || [],
            statesInProgress = ['stopping', 'starting'];

        this.uri = bundleEntry.uri;
        this.params = params;
        this.state = 'stopped';

        function startDependencies() {
            var promises = dependencies.map(container.get).map(function (bundle) {
                return bundle.start;
            });
            return Q.allSettled(promises);
        }

        this.start = function start() {
            if (statesInProgress.indexOf(this.state) > -1) {
                return Q.reject('start or stop in progress: ' + bundleEntry.uri);
            }
            if (this.state === 'started') {
                Q.resolve(this);
            }

            this.state = 'starting';
            this.publish('state', 'starting');

            return platform.resolveBundles(dependencies)
                .then(startDependencies)
                .thenResolve(this)
                .then(function (bundle) {
                    if (typeof bundleEntry.onStart === 'function') {
                        try {
                            return Q.fcall(bundleEntry, bundleEntry.onStart, bundle).then(function () {
                                bundle.state = 'started';
                                bundle.publish('state', 'started');
                            });
                        } catch (error) {
                            bundle.state = 'unvailable';
                            bundle.publish('state', 'unvailable');
                            return Q.reject(error);
                        }
                    }

                    bundle.state = 'started';
                    bundle.publish('state', 'started');
                    return bundle;
                });
        };

        this.stop = function stop() {
            if (['stopping', 'starting'].indexOf(this.state) > -1) {
                return Q.reject('start or stop in progress: ' + bundleEntry.uri);
            }
            if (this.state === 'stopped') {
                Q.resolve(this);
            }

            this.state = 'stopping';
            this.publish('state', 'stopping');

            if (typeof bundleEntry.onStop === 'function') {
                try {
                    this.state = 'stopped';
                    this.publish('state', 'stopped');
                    return Q.fcall(bundleEntry, bundleEntry.onStop, this);
                } catch (error) {
                    this.state = 'unvailable';
                    this.publish('state', 'unvailable');
                    return Q.reject(error);
                }
            }

            this.state = 'stopped';
            this.publish('state', 'stopped');
            return Q.resolve(this);
        };

        this.constant = function constant(name, value) {
            container.injector.constant(this.uri + ':' + name, value);
        };

        this.constructor = function constructor(name, value) {
            container.injector.constructor(this.uri + ':' + name, value);
        };

        this.factory = function factory(name, value) {
            container.injector.factory(this.uri + ':' + name, value);
        };

        this.publish = function publish(name, data) {
            container.messenger.publish('bundle-' + this.uri, name, data);
        };

        this.subscribe = function subscribe(uri, name, cb) {
            container.messenger.subscribe('bundle-' + this.uri, name, this, cb);
        };

        this.unsubscribe = function unsubscribe(uri, name, cb) {
            container.messenger.unsubscribe('bundle-' + this.uri, name, this, cb);
        };
    }

    return Bundle;
}));
