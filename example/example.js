/*global mcjs, console*/

/* --- bundle0 --- */
(function () {
    'use strict';

    function Service1(constant1) {
        function action1() {
            console.log('bundle0:service1#action1', 'constant1', constant1);
        }
        this.action1 = action1;
    }
    Service1.$inject = ['constant1'];

    function service2Factory() {
        function action1() {
            console.log('bundle0:service2#action1');
        }
        return {
            action1: action1
        };
    }

    var constant1 = 'bundle0:constant1#value';

    mcjs.repository.add({
            uri: 'bundle0:0.0.1',
            autostart: true,
            properties: {},
            onStart: function onStart(bundle) {
                return bundle
                    .registry()
                    .constructor('service1', Service1)
                    .factory('service2', service2Factory)
                    .constant('constant1', constant1);
            },
            onStop: function onStop(bundle) {
            }
        }).catch(function (error) {
            console.log(error);
        });
}());

/* --- bundle1 --- */
(function () {
    'use strict';

    function Service1(constant1) {
        function action1() {
            console.log('bundle1:service1#action1', 'constant1', constant1);
        }
        this.action1 = action1;
    }
    Service1.$inject = ['constant1'];

    function service2Factory(bundle0Service1) {
        function action1() {
            console.group('bundle1:service2#action1');
            console.log('bundle1:service2#action1');
            bundle0Service1.action1();
            console.groupEnd('bundle1:service2#action1');
        }
        return {
            action1: action1
        };
    }
    service2Factory.$inject = ['bundle0:service1'];

    var constant1 = 'bundle1:constant1#value';

    mcjs.repository.add({
            uri: 'bundle1:0.0.1',
            autostart: true,
            dependencies: ['bundle0:0.0.1'],
            properties: {},
            onStart: function onStart(bundle) {
                return bundle
                    .registry()
                    .constructor('service1', Service1)
                    .factory('service2', service2Factory)
                    .constant('constant1', constant1);
            },
            onStop: function onStop(bundle) {
            }
        }).catch(function (error) {
            console.log(error);
        });
}());

/* --- bundle2 --- */
(function () {
    'use strict';

    function Service1(constant1, bundle0Service1, bundle1Service2) {
        function action1() {
            console.group('bundle2:service1#action1');
            console.log('bundle2:service1#action1', 'constant1', constant1);
            bundle0Service1.action1();
            bundle1Service2.action1();
            console.groupEnd('bundle2:service1#action1');
        }
        this.action1 = action1;
    }
    Service1.$inject = ['constant1', 'bundle0:service1', 'bundle1:service2'];

    function service2Factory() {
        function action1() {
            console.log('bundle2:service2#action1');
        }
        return {
            action1: action1
        };
    }

    var constant1 = 'bundle2:constant1#value';

    mcjs.getRepository().add({
            uri: 'bundle2:0.0.1',
            autostart: true,
            dependencies: ['bundle0:0.0.1', 'bundle1:0.0.1'],
            properties: {},
            onStart: function onStart(bundle) {
                return bundle
                    .registry()
                    .constructor('service1', Service1)
                    .factory('service2', service2Factory)
                    .constant('constant1', constant1);
            },
            onStop: function onStop(bundle) {
            }
        }).catch(function (error) {
            console.log(error);
        });
}());

/* --- container1 --- */
(function () {
    'use strict';
    var platform, container1;

    platform = mcjs({
        properties: {}
    });

    container1 = platform.container('container1', {
        bundles: ['bundle1:0.0.1', 'bundle2:0.0.1'],
        properties: {}
    });

    container1
        .start()
        .then(function onStarted(container) {
            console.log('container1', 'started');
            return container;
        })
        .stop()
        .then(function onStopped(container) {
            console.log('container1', 'stopped');
            return container;
        })
        .catch(function (error) {
            console.error(error);
        });

}());
