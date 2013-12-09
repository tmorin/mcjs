describe('BundleRepository', function () {

    describe('#add', function () {
        var mMcBundleRepository, defaultBundleEntries;
        it('should add a bundle entry', function () {
            defaultBundleEntries = {};
            mMcBundleRepository = new McBundleRepository(defaultBundleEntries);
            mMcBundleRepository.add({
                uri: 'bundle1:1.0.0'
            });
            expect(defaultBundleEntries['bundle1:1.0.0']).toBeTruthy();
        });
        it('should not add again a bundle entry', function () {
            defaultBundleEntries = {
                'bundle1:1.0.0': {
                    uri: 'bundle1:1.0.0'
                }
            };
            mMcBundleRepository = new McBundleRepository(defaultBundleEntries);
            try {
                mMcBundleRepository.add({
                    uri: 'bundle1:1.0.0'
                });
                expect(false).toBeTruthy();
            } catch(e) {
                expect(e).toBeTruthy();
            }
        });
    });

    describe('#get', function () {
        var mMcBundleRepository, defaultBundleEntries, bundleEntry;
        it('should return a bundle entry', function () {
            defaultBundleEntries = {
                'bundle1:1.0.0': {
                    uri: 'bundle1:1.0.0'
                }
            };
            mMcBundleRepository = new McBundleRepository(defaultBundleEntries);
            bundleEntry = mMcBundleRepository.get('bundle1:1.0.0');
            expect(bundleEntry).toBeTruthy();
        });
        it('should throw an error if not found', function () {
            defaultBundleEntries = {
                'bundle1:1.0.0': {
                    uri: 'bundle1:1.0.0'
                }
            };
            mMcBundleRepository = new McBundleRepository(defaultBundleEntries);
            try {
                mMcBundleRepository.get('bundle2:1.0.0');
                expect(false).toBeTruthy();
            } catch(e) {
                expect(e).toBeTruthy();
            }
        });
    });

    describe('#remove', function () {
        var defaultBundleEntries;
        it('should remove a bundle entry', function () {
            defaultBundleEntries = {
                'bundle1:1.0.0': {
                    uri: 'bundle1:1.0.0'
                }
            };
            mMcBundleRepository = new McBundleRepository(defaultBundleEntries);
            mMcBundleRepository.remove('bundle1:1.0.0');
            expect(defaultBundleEntries['bundle1:1.0.0']).toBeFalsy();
        });
        it('should not throw an exeption when uri not found', function () {
            defaultBundleEntries = {
                'bundle1:1.0.0': {
                    uri: 'bundle1:1.0.0'
                }
            };
            mMcBundleRepository = new McBundleRepository(defaultBundleEntries);
            mMcBundleRepository.remove('bundle2:1.0.0');
            expect(defaultBundleEntries['bundle1:1.0.0']).toBeTruthy();
        });
    });

});
