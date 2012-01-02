/*
** Rule > ProductionReference
*/
function ProductionReference( ) {
    var name;
    var productions;
    var args = Array.toArray( arguments ).filter( function ( arg ) {
        switch ( getTypeOf( arg ) ) {
            case 'string':
                if ( name !== undefined ) {
                    throw new Error( );
                }
                name = arg + '';
                return false;
            case 'object':
                if ( productions !== undefined ) {
                    throw new Error( );
                }
                productions = arg;
                return false;
            default:
                return true;
        }
    } );
    var production;
    Object.defineProperties( this, {
        production: {
            get: function ( ) {
                if ( production !== undefined ) {
                    return production;
                } else {
                    if ( productions.hasOwnProperty( name ) ) {
                        return production = productions[ name ];
                    } else {
                        throw new Error( );
                    }
                }
            }
        }
    } );
    Rule.apply( this, args );
    return this;
}
ProductionReference.inherits( Rule );
Object.defineProperties( ProductionReference.prototype, {
    exec: {
        value: function ( iterator, options ) {
            return this.production.exec( iterator, options );
        }
    }
} );