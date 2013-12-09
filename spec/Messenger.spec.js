describe('Messenger', function () {

    describe('#publish', function () {
        var mcMessenger, defaultParams, entry1, ctx1, entry2, ctx2, ctx3, cb3;
        it('should publish a message', function () {
            ctx1 = {};
            ctx2 = {};
            entry1 = { cb: function () {}, ctx: ctx1 };
            entry2 = { cb: function () {}, ctx: ctx2 };
            defaultParams = {
                listener: {
                    'uri1': {
                        'name1' : [entry1],
                        'name2' : [entry2]
                    }
                }
            };
            spyOn(entry1, 'cb');
            spyOn(entry2, 'cb');
            mcMessenger = new McMessenger(defaultBundleEntries);
            mcMessenger.publish('uri1', 'name1', 'data1');
            expect(entry1.cb).toHaveBeenCalled();
            expect(entry2.cb).not.toHaveBeenCalled();
        });
    });

    describe('#subscribe', function () {
        it('should subscribe', function () {
            ctx1 = {};
            ctx2 = {};
            ctx3 = {};
            cb3 = function () {};
            entry1 = { cb: function () {}, ctx: ctx1 };
            entry2 = { cb: function () {}, ctx: ctx2 };
            defaultParams = {
                listener: {
                    'uri1': {
                        'name1' : [entry1],
                        'name2' : [entry2]
                    }
                }
            };
            spyOn(entry1, 'cb');
            spyOn(entry2, 'cb');
            mcMessenger = new McMessenger(defaultBundleEntries);
            mcMessenger.subscribe('uri1', 'name1', ctx3, cb3);
            expect(defaultParams.litener.uri1.name1.length).toBe(2);
        });
    });

    describe('#unsubscribe', function () {
        it('should unsubscribe with uri, name, ctx and cb', function () {
            ctx1 = {};
            entry1 = { cb: function () {}, ctx: ctx1 };
            entry2 = { cb: function () {}, ctx: ctx1 };
            defaultParams = {
                listener: {
                    'uri1': {
                        'name1' : [entry1, entry2]
                    }
                }
            };
            spyOn(entry1, 'cb');
            spyOn(entry2, 'cb');
            mcMessenger = new McMessenger(defaultBundleEntries);
            mcMessenger.unsubscribe('uri1', 'name1', ctx1, cb1);
            expect(defaultParams.litener.uri1.name1.length).toBe(1);
        });
        it('should unsubscribe with uri, name, ctx', function () {
            ctx1 = {};
            entry1 = { cb: function () {}, ctx: ctx1 };
            entry2 = { cb: function () {}, ctx: ctx1 };
            defaultParams = {
                listener: {
                    'uri1': {
                        'name1' : [entry1, entry2]
                    }
                }
            };
            spyOn(entry1, 'cb');
            spyOn(entry2, 'cb');
            mcMessenger = new McMessenger(defaultBundleEntries);
            mcMessenger.unsubscribe('uri1', 'name1', ctx1);
            expect(defaultParams.litener.uri1.name1.length).toBe(0);
        });
        it('should unsubscribe with uri, name, cb', function () {
            ctx1 = {};
            entry1 = { cb: function () {}, ctx: ctx1 };
            entry2 = { cb: function () {}, ctx: ctx1 };
            defaultParams = {
                listener: {
                    'uri1': {
                        'name1' : [entry1, entry2]
                    }
                }
            };
            spyOn(entry1, 'cb');
            spyOn(entry2, 'cb');
            mcMessenger = new McMessenger(defaultBundleEntries);
            mcMessenger.unsubscribe('uri1', 'name1', null, cb1);
            expect(defaultParams.litener.uri1.name1.length).toBe(1);
        });
        it('should unsubscribe with ctx', function () {
            ctx1 = {};
            entry1 = { cb: function () {}, ctx: ctx1 };
            entry2 = { cb: function () {}, ctx: ctx1 };
            defaultParams = {
                listener: {
                    'uri1': {
                        'name1' : [entry1, entry2],
                        'name2' : [entry1, entry2]
                    }
                }
            };
            spyOn(entry1, 'cb');
            spyOn(entry2, 'cb');
            mcMessenger = new McMessenger(defaultBundleEntries);
            mcMessenger.unsubscribe(null, null, ctx1);
            expect(defaultParams.litener.uri1.name1.length).toBe(0);
            expect(defaultParams.litener.uri1.name2.length).toBe(0);
        });
    });

});

