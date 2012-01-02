function XJSParser( language ) {
    var syntax;
    Object.defineProperties( this, {
        language: {
            get: function ( ) {
                return language;
            },
            set: function ( value ) {
                if ( getTypeOf( value ) !== 'string' ) {
                    throw new TypeError( );
                }
                if ( ! XJSParser.syntaxes.hasOwnProperty( language ) ) {
                    throw new Error( );
                }
                syntax = XJSParser.syntaxes[ language ];
                language = value;
            }
        },
        syntax: {
            get: function ( ) {
                return syntax;
            }
        }
    } );
    this.language = language;
}
XJSParser.syntaxes = { };
Object.defineProperties( XJSParser.prototype, {
    parse: {
        value: function ( src ) {
            return this.syntax.exec.apply( this.syntax, arguments );
        }
    }
} );