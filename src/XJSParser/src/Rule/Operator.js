/*
** Rule > Operator
*/
function Operator( ) {
    var operands = [ ];
    var args = Array.toArray( arguments ).filter( function ( arg ) {
        if ( Array.isArray( arg ) ) {
            operands = operands.concat( arg.map( function ( operand ) {
                return getTypeOf( operand ) === 'string' ? new Terminal( operand ) : operand;
            } ) );
            return false;
        } else {
            return true;
        }
    } );
    this.operands = operands;
    Rule.apply( this, args );
    return this;
}
Operator.inherits( Rule );