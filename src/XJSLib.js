Object.getOwnPropertyDescriptors = function ( object ) {
    var propertiesDescriptor = { };
    Object.getOwnPropertyNames( object ).forEach( function ( key ) {
        propertiesDescriptor[ key ] = Object.getOwnPropertyDescriptor( object, key );
    } );
    return propertiesDescriptor;
};

function inherits( Child, Parent ) {
    Child.prototype = Object.create( Parent.prototype, Object.getOwnPropertyDescriptors( Child.prototype ) );
    return Child;
}
Function.prototype.inherits = function ( Parent ) {
    return inherits( this, Parent );
};

Object.prototype.clone = function ( ) {
    return Object.create( Object.getPrototypeOf( this ), Object.getOwnPropertyDescriptors( this ) );
};

Array.toArray = function toArray( object ) {
    return [ ].slice.call( object );
};

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


function extend( that, object ) {
    Object.keys( object ).forEach( function ( key ) {
        that[ key ] = object[ key ];
    } );
    return that;
}
Object.prototype.extend = function ( object ) {
    return extend( this, object );
};

function newWithArguments( Constructor, args ) {
    return Constructor.apply( Object.create( Constructor.prototype ), args );
}

function join( array ) {
    return Array.isArray( array ) ? array.map( join ).join( '' ) : array;
}

Array.prototype.contains = function ( item ) {
    return this.indexOf( item ) !== -1;
};