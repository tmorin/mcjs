var entries = {};
var repository = new McRepositoryStruct();

repository.add(entries, {
    uri: 'bundle0:0.0.1',
    autostart: true,
    properties: {}
});
console.assert(typeof entries['bundle0:0.0.1'] === 'object');

repository.add(entries, {
    uri: 'bundle1:0.0.1',
    autostart: true,
    properties: {}
});
console.assert(typeof entries['bundle1:0.0.1'] === 'object');

var entry0 = repository.get(entries, 'bundle1:0.0.1');
console.assert(typeof entry0 === 'object');

repository.remove(entries, 'bundle1:0.0.1');
console.assert(typeof entries['bundle1:0.0.1'] === 'undefined');
