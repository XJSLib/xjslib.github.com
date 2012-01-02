/*
** Rule > Operator > Repeat
*/
function Repeat( ) {
    var numbers = [ ];
    var strings = [ ];
    var args = Array.toArray( arguments ).filter( function ( arg ) {
        switch ( getTypeOf( arg ) ) {
            case 'number':
                numbers.push( arg );
                return false;
            case 'object':
                if ( arg instanceof Rule ) {
                    if ( operand === undefined ) {
                        operand = arg;
                    } else {
                        throw new Error( );
                    }
                    return false;
                } else {
                    return true;
                }
            case 'string':
                strings.push( arg );
                return false;
            default:
                return true;
        }
    } );
    var operand;
    var min;
    var max;
    stringsLengthSwitch:switch ( strings.length ) {
        // if there are 2 strings
        case 2:
            // one of the string has to be an operand
            if ( operand !== undefined ) {
                throw new Error( );
            }
            // if they are equal
            if ( strings[ 0 ] === strings[ 1 ] ) {
                // take one out and set it as operand
                operand = new Terminal( strings.pop( ) );
            } else {
                // if they aren't equal, determine which can be a quantifier
                var isNotQuantifier = strings.map( function ( string ) {
                    return string !== '?' && string !== '*' && string !== '+';
                } );
                // if the first one isn't a quantifier
                if ( isNotQuantifier[ 0 ] ) {
                    // if the second isn't either, throw an error
                    if ( isNotQuantifier[ 1 ] ) {
                        throw new Error( );
                    // otherwise, remore the first one and set it as operand
                    } else {
                        operand = new Terminal( strings.shift( ) );
                    }
                // if the second one isn't a quantifier
                } else if ( isNotQuantifier[ 1 ] ) {
                    // then remove it from string and set it as operand
                    operand = new Terminal( strings.pop( ) );
                } else {
                    // if both are quantifier, throw an error
                    throw new Error( );
                }
            }
            // the is now only one string left (the other was set as operand)
            // so fall to case 1
        // if there is one string
        case 1:
            switch ( numbers.length ) {
                // if there are no numbers
                case 0:
                    // set min and max depending on the quantifier the string is
                    switch ( strings[ 0 ] ) {
                        case '?':
                            min = 0;
                            max = 1;
                            break;
                        case '*':
                            min = 0;
                            max = Infinity;
                            break;
                        case '+':
                            min = 1;
                            max = Infinity;
                            break;
                        default:
                            throw new Error( );
                    }
                    // we don't want to fall to the strings.length === 0 case
                    break stringsLengthSwitch;
                // if there are 1 or 2 numbers, it means the string has to be an operand
                case 1:
                case 2:
                    if ( operand !== undefined ) {
                        throw new Error( );
                    }
                    operand = new Terminal( strings[ 0 ] );
                    // we break without a label and will fall to case strings.length === 0
                    break;
                default:
                    throw new Error( );
            }
        // if there are no strings
        case 0:
            switch ( numbers.length ) {
                // if there are no numbers
                case 0:
                    // just set the default values
                    min = 0;
                    max = Infinity;
                    break;
                // if there is one number
                case 1:
                    // set it as min
                    min = +numbers[ 0 ];
                    if ( min >= Infinity ) {
                        throw new Error( );
                    }
                    max = Infinity;
                    break;
                // if there are two numbers
                case 2:
                    // set the first as min and the second as max
                    min = +numbers[ 0 ];
                    max = +numbers[ 1 ];
                    if ( min === max ) {
                        throw new Error( );
                    } else if ( min > max ) {
                        throw new Error( );
                    }
                    break;
            }
            break;
        // if there are more than 2 strings
        default:
            // throw an error
            throw new Error( );
    }
    // if no operand has been found
    if ( operand === undefined ) {
        throw new Error( );
    }
    // write min, max and operant to this
    this.min = min;
    this.max = max;
    this.operand = operand;
    // forward unused arguments to Rule
    Rule.apply( this, args );
    return this;
}
Repeat.inherits( Operator );
Object.defineProperties( Repeat.prototype, {
    exec: {
        value: function ( iterator, options ) {
            var cloneOfIterator = iterator.clone( true );
            var results = [ ];
            var result;
            var operand = this.operand;
            for ( var i = 0, l = this.max; i <= l; ++i ) {
                result = operand.exec( cloneOfIterator, options );
                if ( result === null ) {
                    break;
                } else {
                    results = results.concat( result );
                }
            }
            if ( results.length < this.min ) {
                return null;
            } else {
                iterator.index = cloneOfIterator.index;
                return results;
            }
        }
    }
} );