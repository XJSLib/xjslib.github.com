/*
** Rule
*/
function Rule( ) {
    var label;
    Array.toArray( arguments ).forEach( function ( arg ) {
        switch ( getTypeOf( arg ) ) {
            case 'object':
                if ( arg instanceof Option ) {
                    var name = arg.name;
                    if ( optionsByName[ name ] !== arg ) {
                        throw new Error( );
                    }
                    this[ name ] = true;
                } else {
                    this.applyOptions( arg );
                }
                break;
            case 'regexp':
                if ( label !== undefined ) {
                    throw new Error( );
                }
                label = arg.source
                break;
        }
    }, this );
    return this;
}
Object.defineProperties( Rule.prototype, {
    applyOptions: {
        value: function ( options, filteredNames ) {
            var names = Object.getOwnPropertyNames( options );
            if ( arguments.length >= 2 ) {
                if ( ! Array.isArray( filteredNames ) ) {
                    throw new Error( );
                }
                names = names.filter( function ( name ) {
                    return filteredNames.indexOf( name ) === -1;
                } );
            }
            names.forEach( function ( name ) {
                if ( ! optionsByName.hasOwnProperty( name ) ) {
                    throw new Error( );
                }
                if ( options[ name ] !== true ) {
                    throw new Error( );
                }
                this[ name ] = true;
            }, this );
        }
    },
    join: {
        value: false,
        enumerable: true
    }
} );