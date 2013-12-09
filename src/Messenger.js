/*jslint sloppy: true */
(function (factory) {
    /*global exports, module:true, define, McMessenger:true */

    // CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);

    // <script>
    } else {
        McMessenger = factory();
    }
}(function () {
    'use strict';

    function Messenger(defaultParams) {
        var params = defaultParams || {},
            listeners = params.listeners || {};

        this.publish = function publish(uri, name, data) {
            if (listeners[uri] && listeners[uri][name]) {
                listeners[uri][name].forEach(function (entry) {
                    entry.cb.call(entry.ctx, name, data);
                });
            }
        };

        this.subscribe = function subscribe(uri, name, ctx, cb) {
            if (!listeners[uri]) {
                listeners[uri] = {};
            }
            if (!listeners[uri][name]) {
                listeners[uri][name] = [];
            }
            listeners[uri][name].push({
                ctx: ctx,
                cb: cb
            });
        };

        this.unsubscribe = function unsubscribe(uri, name, ctx, cb) {
            if (uri && name) {
                if (!listeners[uri] && !listeners[uri][name]) {
                    return;
                }
                listeners[uri][name].filter(function (entry) {
                    if (ctx && cb) {
                        return entry.ctx === ctx && entry.cb === cb;
                    }
                    if (ctx) {
                        return entry.ctx === ctx;
                    }
                    if (cb) {
                        return entry.cb === cb;
                    }
                    return true;
                }).forEach(function (entry) {
                    var index = listeners[uri][name].indexOf(entry);
                    listeners[uri][name].splice(index, 1);
                });
            } else if (ctx || cb) {
                var aUri, aName;
                for (aUri in listeners) {
                    if (listeners.hasOwnProperty(aUri)) {
                        for (aName in listeners[aUri]) {
                            if (listeners[aUri].hasOwnProperty(aName)) {
                                unsubscribe(aUri, aName, ctx, cb);
                            }
                        } // end loop over names
                    }
                } // end loop over listeners
            }
        };

    }

    return Messenger;
}));
