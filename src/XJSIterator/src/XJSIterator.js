var XJSIterator = ( function ( ) {
    'use strict';
    // constructor
    function XJSIterator( items ) {
        if ( ! this instanceof XJSIterator ) {
            return new XJSIterator( items );
        } else {
            items = Array.prototype.slice.apply( items );// ++ Array.toArray?
            var index = 0;
            Object.defineProperties( this, {
                index: {
                    get: function ( ) {
                        return index;
                    },
                    set: function ( value ) {
                        index = +value;// ++ return something?
                    },
                    enumerable: true
                },
                items: {
                    value: Object.freeze( items ),
                    enumerable: true
                }
            } );
            return Object.freeze( this );
        }
    }
    // prototype
    Object.freeze( Object.defineProperties( XJSIterator.prototype, {
        clone: {
            value: function ( sameIndex ) {
                var clone = new this.constructor( this.items );
                if ( sameIndex || arguments.length < 1 ) {
                    clone.index = this.index;
                }
                return clone;
            },
            enumerable: true
        },
        done: {
            get: function ( ) {
                return this.index >= this.length;
            },
            enumerable: true
        },
        forEach: {
            value: function ( callback, that ) {
                var index;
                do {
                    index = this.index;
                    callback.call( that, this.item, index, this );
                    if ( this.index === index ) {
                        this.increment( );
                    }
                } while ( ! this.done );
            },
            enumerable: true
        },
        increment: {
            value: function ( number ) {
                if ( arguments.length < 1 ) {
                    ++this.index;
                } else {
                    this.index += number >>> 0;
                }
                return this;
            },
            enumerable: true
        },
        item: {
            get: function ( ) {
                return this.items[ this.index ];
            },
            enumerable: true
        },
        length: {
            get: function ( ) {
                return this.items.length;
            },
            enumerable: true
        },
        next: {
            value: function ( number ) {
                return this.increment( ).item;
            },
            enumerable: true
        }
    } ) );
    // expose
    return Object.freeze( XJSIterator );
} )( );