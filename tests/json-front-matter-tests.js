var
  jsonFm = require('../lib/json-front-matter.js'),
  fs     = require('fs'),
  testBody = '430a wlskdf 02;l4ka,l   ',
  testString = '{{{"name":"json-fm","array":["a","b","c"]}}}'+testBody;

module.exports = {
  'parse strings' : function ( test ) {
    test.expect( 3 );
    var out = jsonFm.parse( testString );
    test.ok( out.attributes.name === 'json-fm', 'Should parse properties of JSON correctly' );
    test.ok( out.attributes.array[1] === 'b', 'Should parse properties of JSON correctly' );
    test.ok( out.body === testBody, 'Should return body separately' );
    test.done();
  },
  'parse strings invalid' : function ( test ) {
    test.expect( 4 );
    var out1 = jsonFm.parse( testBody );
    var out2 = jsonFm.parse( '' );
    var out3 = jsonFm.parse();
    test.ok( out1.attributes, 'Attributes should still be an empty object' ); 
    test.ok( out1.body === testBody, 'Body should still return if no JSON found' );
    test.ok( !out2.body && !out2.attributes, 'If falsy data, should return empty obj' );
    test.ok( !out3.body && !out3.attributes, 'If falsy data, should return empty obj' );
    test.done();
  },
  'parse files' : function ( test ) {
    test.expect( 6 );
    jsonFm.parseFile( __dirname + '/data/test.md', function ( err, data ) {
      test.ok( data.body, 'Body should be returned' );
      test.ok( data.attributes.title === 'Some Title' );
      test.ok( data.attributes.tags[2] === 'scissors' );
      test.ok( data.attributes.id === 1001 );
      test.ok( data.attributes.nested.attr1[2] === 'c' );
      test.ok( data.attributes.nested.attr3[2] === 'i' );
      test.done();
    });
  },
  'parse files invalid' : function ( test ) {
    test.expect( 3 );
    jsonFm.parseFile( 'path/doesnt/exist', function ( err, data ) {
      test.ok( err, 'should return an err' );
      test.ok( !data.attributes, 'should not have data' );
      test.ok( !data.body, 'should not have data' );
      test.done();
    });
  }
};
