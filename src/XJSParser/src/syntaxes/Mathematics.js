XJSParser.syntaxes.Mathematics = new ProductionSet( function ( operators, options ) {
    'use strict';
    var And = operators.And;
    var Or = operators.Or;
    var Repeat = operators.Repeat;
    var Rule = operators.Production;
    var Optionnal = operators.Optionnal;
    var s = Rule( 'OptionnalSpaces' );
    return [
        {
            name: 'Digit',
            rules: Or( [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9'
            ] )
        },
        {
            name: 'Number',
            rules: Repeat( And( [
                Rule( 'Digit' )
            ] ), '+' ),
            join: true
        },
        {
            name: 'Expression',
            start: true,
            rules: And( [
                Rule( 'AdditiveExpression' )
            ] )
        },
        {
            name: 'AdditiveExpression',
            rules: Or( [
                And( [
                    Rule( /left/, 'MultiplicativeExpression' ),
                    Or( /operator/, [
                        '+',
                        '-'
                    ] ),
                    Rule( /right/, 'AdditiveExpression' )
                ] ),
                Rule( 'MultiplicativeExpression' )
            ] )
        },
        {
            name: 'MultiplicativeExpression',
            rules: Or( [
                And( [
                    Rule( /left/, 'ExponentialExpression' ),
                    Or( /operator/, [
                        '*',
                        '/'
                    ] ),
                    Rule( /right/, 'MultiplicativeExpression' )
                ] ),
                Rule( 'ExponentialExpression' )
            ] )
        },
        {
            name: 'ExponentialExpression',
            rules: Or( [
                And( [
                    Rule( /left/, 'UnaryExpression' ),
                    '^',
                    Rule( /right/, 'ExponentialExpression' )
                ] ),
                Rule( 'UnaryExpression' )
            ] )
        },
        {
            name: 'UnaryExpression',
            rules: Or( [
                And( [
                    Or( [
                        '+',
                        '-'
                    ] ),
                    Rule( 'UnaryExpression' )
                ] ),
                Rule( 'PrimaryExpression' )
            ] )
        },
        {
            name: 'PrimaryExpression',
            rules: Or( [
                Rule( 'FunctionCall' ),
                And( [
                    '(',
                    Rule( 'Expression' ),
                    ')'
                ] ),
                Rule( 'Number' )
            ] )
        },
        {
            name: 'FunctionName',
            rules: Repeat( Or( 'abcdefghijklmnopqrstuvwxyz'.split( '' ) ), '+' ),
            join: true
        },
        {
            name: 'FunctionCall',
            rules: Or( [
                And( [
                    Rule( /name/, 'FunctionName' ),
                    '(',
                    Rule( /expression/, 'Expression' ),
                    ')'
                ] ),
                And( [
                    '|',
                    Rule( /expression/, 'Expression' ),
                    '|'
                ] )
            ] )
        },
        {
            name: 'OptionnalSpaces',
            rules: Repeat( Or( [
                ' ',
                '\r',
                '\n'
            ] ), '*' ),
            join: true
        }
    ];
} );