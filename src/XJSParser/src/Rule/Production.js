/*
** Rule > Production
*/
function Production( production ) {
    if ( ! production.hasOwnProperty( 'name' ) ) {
        throw new Error( );
    }
    var name = production.name;
    if ( getTypeOf( name ) !== 'string' ) {
        throw new Error( );
    }
    this.name = name += '';
    if ( ! production.hasOwnProperty( 'rules' ) ) {
        throw new Error( );
    }
    var rules = production.rules;
    if ( getTypeOf( rules ) === 'string' ) {
        rules = new Terminal( rules );
    } else if ( ! rules instanceof Rule ) {// ++
        throw new Error( );
    }
    this.rules = rules;
    if ( production.hasOwnProperty( 'start' ) ) {
        if ( production.start !== true ) {
            throw new Error( );
        }
        this.start = true;
    }
    this.applyOptions( production, [ 'name', 'rules', 'start' ] );
    return this;
}
Production.inherits( Rule );
Object.defineProperties( Production.prototype, {
    exec: {
        value: function ( iterator, options ) {
            var result = this.rules.exec( iterator, options );
            return result === null ? null : new XJSToken( this.name ).appendChildren( result );
        }
    },
    start: {
        value: false,
        enumerable: true,
        writable: true
    }
} );