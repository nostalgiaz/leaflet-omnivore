var test = require('tape'),
    omnivore = require('../');

test('gpx', function (t) {
    t.plan(2);
    var layer = omnivore.gpx('a.gpx');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.pass('fires ready event');
    });
    layer.on('error', function() {
        t.fail('does not fire error event');
    });
});

test('csv fail', function (t) {
    t.plan(4);
    var layer = omnivore.csv('a.gpx');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.fail('fires ready event');
    });
    layer.on('error', function(e) {
        t.equal(e.error.message, 'Latitude and longitude fields not present');
        t.equal(e.error.type, 'Error');
        t.pass('fires error event');
    });
});

test('csv options', function (t) {
    t.plan(2);
    var layer = omnivore.csv('options.csv', {
        latfield: 'a',
        lonfield: 'b'
    });
    layer.on('ready', function() {
        t.pass('fires ready event');
        t.deepEqual(
            layer.toGeoJSON().features[0].geometry.coordinates,
            [10, 20], 'parses coordinates');
    });
    layer.on('error', function() {
        t.fail('fires error event');
    });
});

test('kml', function (t) {
    t.plan(2);
    var layer = omnivore.kml('a.kml');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.pass('fires ready event');
    });
    layer.on('error', function() {
        t.fail('does not fire error event');
    });
});

test('csv', function (t) {
    t.plan(2);
    var layer = omnivore.csv('a.csv');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.pass('fires ready event');
    });
    layer.on('error', function() {
        t.fail('does not fire error event');
    });
});

test('csv.parse', function (t) {
    t.plan(1);
    var lyr = omnivore.csv.parse('lat,lon,title\n0,0,"Hello"');
    t.ok(lyr instanceof L.GeoJSON, 'produces layer');
});

test('wkt.parse', function (t) {
    t.plan(1);
    var lyr = omnivore.wkt.parse('MultiPoint(20 20, 10 10, 30 30)');
    t.ok(lyr instanceof L.GeoJSON, 'produces layer');
});

test('wkt', function (t) {
    t.plan(2);
    var layer = omnivore.wkt('a.wkt');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.pass('fires ready event');
    });
    layer.on('error', function() {
        t.fail('does not fire error event');
    });
});

test('topojson', function (t) {
    t.plan(2);
    var layer = omnivore.topojson('a.topojson');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.pass('fires ready event');
    });
    layer.on('error', function() {
        t.fail('does not fire error event');
    });
});

test('geojson', function (t) {
    t.plan(2);
    var layer = omnivore.geojson('a.geojson');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.pass('fires ready event');
    });
    layer.on('error', function() {
        t.fail('does not fire error event');
    });
});

test('geojson: fail', function (t) {
    t.plan(2);
    var layer = omnivore.geojson('404 does not exist');
    t.ok(layer instanceof L.GeoJSON, 'produces geojson layer');
    layer.on('ready', function() {
        t.fail('fires ready event');
    });
    layer.on('error', function(e) {
        t.pass('fires error event');
    });
});
