Object.getOwnPropertyDescriptors = function ( object ) {
    var propertiesDescriptor = { };
    Object.getOwnPropertyNames( object ).forEach( function ( key ) {
        propertiesDescriptor[ key ] = Object.getOwnPropertyDescriptor( object, key );
    } );
    return propertiesDescriptor;
};

Function.prototype.inherits = function ( Parent ) {
    this.prototype = Object.create( Parent.prototype, Object.getOwnPropertyDescriptors( this.prototype ) );
    return this;
};

Object.prototype.clone = function ( ) {
    return Object.create( Object.getPrototypeOf( this ), Object.getOwnPropertyDescriptors( this ) );
};

Array.toArray = ( function ( ) {
    var slice = [ ].slice;
    function toArray( object ) {
        return slice.call( object );
    }
    return toArray;
}( ) );

var getTypeOf = ( function ( ) {
    var toString = { }.toString;
    function getTypeOf( object ) {
        return toString.call( object )
        .replace( /\[object ([a-z]+)\]/i, '$1' )
        .toLowerCase( )
        .replace( 'argument', 'object' );
    }
    return getTypeOf;
}( ) );

function newWithArguments( Constructor, args ) {
    return Constructor.apply( Object.create( Constructor.prototype ), args );
}

function join( array ) {
    return Array.isArray( array ) ? array.map( join ).join( '' ) : array;
}

Array.prototype.contains = function ( item ) {
    return this.indexOf( item ) !== -1;
};