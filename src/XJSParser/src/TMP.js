    

    
    
    

    

    

    
    
    
    
    // ++
    var operators = {
        Or:function(){return Or.apply(Object.create(Or.prototype),arguments)},
        And: function(){return And.apply(Object.create(And.prototype),arguments)},
        Repeat: function(){return Repeat.apply(Object.create(Repeat.prototype),arguments)},
        Optionnal: function(){return Optionnal.apply(Object.create(Optionnal.prototype),arguments)}
    }
    
    function Option( option ) {
        this.name = option.name;
        this.format = option.format;
        this.global = option.global;
    }
    
    var optionsByIndex = [
        {
            name: 'removeEmpty',
            format: function ( result ) {
                return Array.isArray( result ) ? result.filter( function ( item ) {
                    return item !== '' && ( ! Array.isArray( item ) || item.length !== 0 );
                } ) : result;
            },
            global: true
        },
        {
            name: 'join',
            format: function ( result ) {
                return join( result );
            }
        }
    ];
    var optionsByName = { };
    optionsByIndex = optionsByIndex.map( function ( option ) {
        return optionsByName[ option.name ] = new Option( option );
    } );
    // --
