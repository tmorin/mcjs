describe('Properties', function () {

    describe('#set', function () {
        var properties, mcProperties;
        it('should set unset property', function () {
            properties = {};
            mcProperties = new McProperties();
            mcProperties.set('key1.key2.key3', 'value1');
            expect(properties.key1).toBeTruthy();
            expect(properties.key1.key2).toBeTruthy();
            expect(properties.key1.key2.key3).toBeTruthy();
            expect(properties.key1.key2.key3).toBe('value1');
        });
        it('should override property', function () {
            properties = {
                key1: {
                    key2: {
                        key3: 'value1'
                    }
                }
            };
            mcProperties = new McProperties();
            mcProperties.set('key1.key2.key3', 'value2');
            expect(properties.key1).toBeTruthy();
            expect(properties.key1.key2).toBeTruthy();
            expect(properties.key1.key2.key3).toBeTruthy();
            expect(properties.key1.key2.key3).toBe('value2');
        });
    });

    describe('#get', function () {
        var properties, mcProperties, value;
        it('should get property', function () {
            properties = {
                key1: {
                    key2: {
                        key3: 'value1'
                    }
                }
            };
            mcProperties = new McProperties();
            value = mcProperties.get('key1.key2.key3', 'defaultValue');
            expect(value).toBe('value1');
        });
        it('should get default value', function () {
            properties = {
                key1: {
                    key2: {
                        key3: 'value1'
                    }
                }
            };
            mcProperties = new McProperties();
            value = mcProperties.get('key1.key2.key4', 'defaultValue');
            expect(value).toBe('defaultValue');
        });
    });

});
