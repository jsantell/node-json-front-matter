module.exports = (function () {

  var
    fs = require( 'fs' ),
    // http://stackoverflow.com/q/1068308 / https://github.com/jxson/front-matter
    regex = /^(\s*\{\{\{([\s\S]+?)\}\}\}\s*)/gi,
    attributes, body;
    
  function parseFile ( path, callback ) {
    fs.readFile( path, 'utf-8', function ( err, data ) {
      callback( err, parseString( data ) );
    });
  }

  function parseString ( data ) {
    if ( !data ) { return {} };
    var match = regex.exec( data );
    if ( match && match.length ) {
      attributes = JSON.parse( '{' + match[ 2 ].replace(/^\s+|\s+$/g, '') + '}' );
      body = data.replace( match[ 0 ], '' );
    } else {
      attributes = {};
      body = data;
    }
    regex.lastIndex = 0;
    return { attributes: attributes, body: body };
  }

  return {
    parseFile : parseFile,
    parse     : parseString
  };

})();
