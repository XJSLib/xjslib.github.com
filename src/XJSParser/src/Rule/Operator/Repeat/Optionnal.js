/*
** Rule > Operator > Repeat > Optionnal
*/
function Optionnal( ) {
    var operand;
    var args = Array.toArray( arguments ).filter( function ( arg ) {
        switch ( getTypeOf( arg ) ) {
            case 'number':
                throw new Error( );
            case 'string':
                if ( operand !== undefined ) {
                    throw new Error( );
                }
                operand = new Terminal( arg );
                return false;
            case 'object':
                if ( arg instanceof Rule ) {
                    if ( operand !== undefined ) {
                        throw new Error( );
                    }
                    operand = arg;
                    return false;
                } else {
                    return true;
                }
            default:
                return true;
        }
    } );
    if ( operand === undefined ) {
        throw new Error( );
    }
    this.min = 0;// +++
    this.max = 1;
    this.operand = operand;
    Rule.apply( this, args );
    return this;
}
Optionnal.inherits( Repeat );