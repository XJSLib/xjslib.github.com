( function ( ) {
    var FS = require( 'fs' );
    var PATH = require( 'path' );
    
    var fileName = 'JakeFile.json';
    var cwd = process.cwd( ) + '/';
    var filePath = cwd + fileName;
    
    if ( ! PATH.existsSync( filePath ) ) {
        console.log( 'Missing file ' + filePath + '!' );
        process.exit( );
    }
    if ( ! FS.statSync( filePath ).isFile( ) ) {
        console.log( filePath + ' is not a file!' );
        process.exit( );
    }
    
    var nodeList;
    try {
        nodeList = new Function( 'return (' + FS.readFileSync( filePath ) + ');' )( );
    } catch ( error ) {
        console.log( error.toString( ) + ' in file ' + filePath + '!' );
        process.exit( );
    }
    
    if ( ! Array.isArray( nodeList ) ) {
        console.log( 'File ' + fileName + ' must contain an array litteral!' );
        process.exit( );
    }
    if ( nodeList.length === 0 ) {
        console.log( 'File ' + fileName + ' must contain an array litteral containing at least one object!' );
        process.exit( );
    }
    
    var nodesByPath = { };
    nodeList.forEach( function ( node ) {
        nodesByPath[ node.path ] = node;
    } );
    
    function makeNonDescribedFile( path ) {
        if ( ! PATH.existsSync( cwd + path ) ) {
            console.log( 'File ' + cwd + path + ' missing!' );
            process.exit( );
        }
        if ( ! FS.statSync( cwd + path ).isFile( ) ) {
            console.log( '' + cwd + path + ' is not a file missing!' );
            process.exit( );
        }
        var content = FS.readFileSync( cwd + path );
        nodesByPath[ path ] = {
            content: content
        };
        return content;
    }
    function makeDescribedFile( path ) {
        var node = nodesByPath[ path ];
        if ( node.hasOwnProperty( 'content' ) ) {
            return node.content;
        } else {
            var dependencies = { };
            node.dependencies.forEach( function ( path ) {
                dependencies[ path ] = make( path );
            } );
            return node.content = node.build( dependencies );
        }
    }
    function make( path ) {
        return nodesByPath.hasOwnProperty( path ) ? makeDescribedFile( path ) : makeNonDescribedFile( path );
    }
    console.log(make('script.js'));
}( ) );