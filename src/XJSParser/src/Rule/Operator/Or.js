/*
** Rule > Operator > Or
*/
function Or( ) {
    Operator.apply( this, arguments );
    return this;
}
Or.inherits( Operator );
Object.defineProperties( Or.prototype, {
    exec: {
        value: function ( iterator, options ) {
            var result;
            var some = this.operands.some( function ( operand ) {
                result = operand.exec( iterator, options );
                return result !== null;
            } );
            return some ? result : null;
        }
    }
} );