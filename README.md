json-front-matter
======

Extract JSON front matter from strings and files

### Installing

* `npm install json-front-matter`

### Methods

* `parse( s )` Parses string `s`, returning an object with properties `attributes`, containing the JSON front matter, and `body` containing the rest.
* `parseFile( path, callback( err, data ))` Parses file at `path`, calling the callback upon completion with `data` object containing `attribuets` and `body`, like the string parse method.

### Using

```javascript
var fm = require('json-front-matter');

var string = '{{{ "title" : "some title", "array" : [ 1, 2, 3 ] }}} bodybodybody';
var out = fm.parse( string );

console.log( out.body ) // 'bodybodybody'
console.log( out.attributes.title ) // 'some title'
console.log( out.attributes.array ) // [ 1, 2, 3 ]
```

Testing
---

Run `node tests/runTests.js` from project root -- testing uses `nodeunit`
