/*
** Rule > Operator > And
*/
function And( ) {
    Operator.apply( this, arguments );
    return this;
}
And.inherits( Operator );
Object.defineProperties( And.prototype, {
    exec: {
        value: function ( iterator, options ) {
            var cloneOfIterator = iterator.clone( true );
            var results = [ ];
            var every = this.operands.every( function ( operand ) {
                var result = operand.exec( cloneOfIterator, options );
                if ( result === null ) {
                    return false;
                } else {
                    results = results.concat( result );
                    return true;
                }
            } );
            if ( every ) {
                iterator.index = cloneOfIterator.index;
                return results;
            } else {
                return null;
            }
        }
    }
} );
