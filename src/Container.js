/*jslint sloppy: true */
(function (factory) {
    /*global exports, module:true, define, McContainer:true, Q, McProperties, McMessenger, McInjector, McBundle */

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['q', './Properties', './Messenger', './Injector', './Bundle'], factory);

    // <script>
    } else {
        McContainer = factory(Q, McProperties, McMessenger, McInjector, McBundle);
    }
}(function (Q, Properties, Messenger, Injector, Bundle) {
    'use strict';

    function noop() {}

    function Container(platform, containerId, defaultParams) {
        var bundles = {},
            params = defaultParams || {};

        this.containerId = containerId;
        this.params = params;
        this.injector = new Injector();
        this.properties = new Properties(params.properties);
        this.messenger = new Messenger(params.messengerParams);
        this.state = 'stopped';

        this.start = function start() {
            var bundleUri,
                bundle,
                promises,
                states = ['stopping', 'starting', 'started'];

            if (states.indexOf(this.state) > -1) {
                return Q.resolve(this);
            }

            this.state = 'starting';
            for (bundleUri in bundles) {
                if (bundles.hasOwnProperty(bundleUri)) {
                    bundle = bundles[bundleUri];
                    if (bundle.params.autostart) {
                        promises.push(bundle.start());
                    }
                }
            }

            return Q.allSettled(promises).then(function () {
                this.state = 'started';
                return this;
            }.bind(this), function (error) {
                this.state = 'unvailable';
                throw new Error('unable to start: ' + containerId + '\n' + JSON.stringify(error));
            }.bind(this));
        };

        this.stop = function stop() {
            var bundleUri,
                bundle,
                promises,
                states = ['stopping', 'starting', 'started'];

            if (states.indexOf(this.state) > -1) {
                return Q.resolve(this);
            }

            this.state = 'stopping';
            for (bundleUri in bundles) {
                if (bundles.hasOwnProperty(bundleUri)) {
                    bundle = bundles[bundleUri];
                    if (bundle.state !== 'stopped') {
                        promises.push(bundle.stop());
                    }
                }
            }

            return Q.allSettled(promises).then(function () {
                this.state = 'stopped';
                return this;
            }.bind(this), function (error) {
                this.state = 'unvailable';
                throw new Error('unable to stop: ' + containerId + '\n' + JSON.stringify(error));
            }.bind(this));
        };

        this.addBundle = function addBundle(bundleUri, bundleParams) {
            var bundleEntry;
            if (!bundleUri) {
                throw new TypeError('bundleUri can not be empty');
            }
            if (!bundles.hasOwnProperty(bundleUri)) {
                bundleEntry = platform.bundleRepository.get(bundleUri);
                bundles[bundleUri] = new Bundle(platform, this, bundleEntry, bundleParams);
            }
            return bundles[bundleUri];
        };

        this.removeBundle = function removeBundle(bundleUri) {
            if (!bundleUri) {
                throw new TypeError('bundleUri can not be empty');
            }
            if (bundles.hasOwnProperty(bundleUri)) {
                if (bundles[bundleUri].state !== 'stopped') {
                    throw new Error('unable to remove a bundle not stopped: ' + bundleUri);
                }
                delete bundles[bundleUri];
            }
            throw new Error('unable to find the bundle: ' + bundleUri);
        };

        this.getBundle = function getBundle(bundleUri) {
            if (!bundleUri) {
                throw new TypeError('bundleUri can not be empty');
            }
            if (bundles.hasOwnProperty(bundleUri)) {
                return bundles[bundleUri];
            }
        };

    }

    return Container;
}));
