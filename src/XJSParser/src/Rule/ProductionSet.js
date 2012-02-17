/*
** Rule > ProductionSet
*/
function ProductionSet( callback ) {
    var byName = { };
    var byIndex = callback( Object.create( operators, {
        Production: {
            value: function ( ) {
                // ++
                return ProductionReference.apply(Object.create(ProductionReference.prototype), Array.toArray( arguments).concat( byName ) );
            }
        }
    } ), optionsByName );
    if ( ! Array.isArray( byIndex ) ) {
        throw new Error( );
    }
    var start;
    byIndex = byIndex.map( function ( production ) {
        production = new Production( production );
        var name = production.name;
        if ( byName.hasOwnProperty( name ) ) {
            throw new Error( );
        }
        byName[ name ] = production;
        if ( production.start === true ) {
            if ( start !== undefined ) {
                throw new Error( );
            }
            start = production;
        }
        return production;
    } );
    if ( start === undefined ) {
        throw new Error( );
    }
    this.byIndex = byIndex;
    this.byName = byName;
    this.start = start;
}
Object.defineProperties( ProductionSet.prototype, {
    exec: {
        value: function ( iterator, options ) {
            var result = this.start.exec( iterator, options );
            return iterator.done ? result : null;
        }
    }
} );
ProductionSet.inherits( Rule );