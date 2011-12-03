var XJSStringIterator = ( function ( ) {
    'use strict';
    // constructor
    function XJSStringIterator( string ) {
        string = string.toString( );
        if ( this instanceof XJSStringIterator ) {
            Object.defineProperties( this, {
                string: {
                    value: string,
                    enumerable: true
                },
                newLinesStartIndex: {
                    get: function ( ) {
                        calculateNewLinesIndex( );
                        return newLinesStartIndex;
                    },
                    enumerable: true
                },
                newLinesEndIndex: {
                    get: function ( ) {
                        calculateNewLinesIndex( );
                        return newLinesEndIndex;
                    },
                    enumerable: true
                },
                lineIndex: {
                    get: function ( ) {
                        var linesEndIndex = this.linesEndIndex;
                        var index = this.index;
                        for ( var length = linesEndIndex.length; lineIndex < length; ++lineIndex ) {
                            if ( linesEndIndex[ lineIndex ] >= index ) {
                                break;
                            }
                        }
                        return lineIndex;
                    },
                    enumerable: true
                }
            } );
            var newLinesStartIndex = [ ];
            var newLinesEndIndex = [ ];
            var calculateNewLinesIndex = function ( ) {
                string.replace( /\r\n|\r|\n/g, function ( match, index ) {
                    newLinesStartIndex.push( index );
                    newLinesEndIndex.push( index + match.length );
                    return match;
                } );
                Object.freeze( newLinesStartIndex );
                Object.freeze( newLinesEndIndex );
                calculateNewLinesIndex = function ( ) { };
            };
            var lineIndex = 0;
            return XJSIterator.call( this, string.split( '' ) );
        } else {
            return new XJSStringIterator( string );
        }
    }
    // prototype
    XJSStringIterator.prototype = Object.create( XJSIterator.prototype, {
        clone: {
            value: function ( sameIndex ) {
                var clone = new this.constructor( this.string );
                if ( sameIndex || arguments.length < 1 ) {
                    clone.index = this.index;
                }
                return clone;
            },
            enumerable: true
        },
        constructor: {
            value: XJSStringIterator
        },
        indexInLine: {
            get: function ( ) {
                return this.index - this.lineStartIndex;
            },
            enumerable: true
        },
        line: {
            get: function ( ) {
                var lineIndex = this.lineIndex;
                return this.string.substring( this.linesStartIndex[ lineIndex ], this.linesEndIndex[ lineIndex ] );
            },
            enumerable: true
        },
        lineStartIndex: {
            get: function ( ) {
                return this.linesStartIndex[ this.lineIndex ];
            },
            enumerable: true
        },
        lineEndIndex: {
            get: function ( ) {
                return this.linesEndIndex[ this.lineIndex ];
            },
            enumerable: true
        },
        linesStartIndex: {
            get: function ( ) {
                return Object.freeze( [ 0 ].concat( this.newLinesEndIndex ) );
            },
            enumerable: true
        },
        linesEndIndex: {
            get: function ( ) {
                return Object.freeze( this.newLinesEndIndex.concat( this.length ) );
            },
            enumerable: true
        },
        substr: {
            value: function ( index, length ) {
                return this.string.substr( index, length );
            },
            enumerable: true
        },
        substrFromIndex: {
            value: function ( length ) {
                return this.substr( this.index, length );
            },
            enumerable: true
        }
    } );
    // expose
    return XJSStringIterator;
} )( );