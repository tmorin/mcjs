describe('Platform', function () {

    describe('#container', function () {
        var mcPlatform, defaultParams, container1;
        it('should create a container', function () {
            defaultParams = {};
            mMcPlatform = new McPlatform(defaultParams, defaultContainers)
            container1 = mMcBundleRepository.container('container1');
            expect(container1).toBeTruthy();
            expect(bundleRepository).toBeTruthy();
            expect(properties).toBeTruthy();
        });
        it('should get an existing container', function () {
            defaultParams = {
                defaultContainers: {
                    'container1': {
                        'key1': 'value1'
                    }
                }
            };
            mMcPlatform = new McPlatform(defaultParams)
            container1 = mMcBundleRepository.container('container1');
            expect(container1).toBeTruthy();
            expect(container1.key1).toBe('value1');
        });
    });

});
