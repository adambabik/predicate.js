/*jshint node: true, browser: true, expr: true */

/*
 * predicate.js
 * https://github.com/dreame4/predicate.js
 *
 * Copyright (c) 2012 Adam Babik
 * Licensed under the MIT license.
 */

;(function(root) {

    'use strict';

    // @TODO: Fallback if Array#isArray is undefined
    var isArray = function(p) {
        return Array.isArray(p);
    };

    var isObject = function(item) {
        return typeof item === 'object' && item !== null && !isArray(item);
    };

    var isConditionalOperator = function(prop) {
        return prop.slice(-1) === '?';
    };

    var isArrayOperator = function(prop) {
        return prop[0] === '@';
    };

    /**
     * sumOperator
     * 
     * @param {array} arr               Array on which operator will be executed
     * @param {string} predicate        Predicate bounded with operator 
     *
     * @returns {number}
     */
    var sumOperator = function(arr, p) {
        p = p.replace(/@\w+\(/, '').replace(/\)/, '');

        var operatorPredicate = predicate(p),
            sum = 0;

        var value;
        for(var i = arr.length - 1; i >= 0; i--) {
            value = operatorPredicate(arr[i]);

            if(typeof value === 'number' && !isNaN(value)) {
                sum += value;
            } else { // try to fix value
                value = parseInt(value, 10);
                if(typeof value === 'number' && !isNaN(value)) {
                    sum += value;
                }
            }
        }

        return sum;
    };

    var iterator = function(obj, props) {
        var result = obj[props.shift()],
            p;

        while(props.length > 0) {
            p = props.shift();

            // result is an array and next operator is an array operator
            if(isArray(result) && isArrayOperator(p)) {
                switch(true) {
                    default:
                        result = sumOperator(result, p);
                        break;
                }

                break;
            } 
            // property is not an object
            else if(!isObject(result)) {
                if(isConditionalOperator(p)) {
                    result = null;
                    break;
                } 
                // other case, throw an error
                else {
                    throw new Error('Previous property is not a proper value');
                }
            }

            if(isConditionalOperator(p)) {
                p = p.slice(0, p.length-1);
            }

            result = result[p];
        }

        return result;
    };

    var predicate = function(predicate) {
        if(typeof predicate !== 'string') {
            throw new Error('Predicate must be a string');
        }

        if(predicate === '') {
            throw new Error('Predicate cannot be an empty string');
        }

        var arrayPartial = /sum\([\w\.]+\)/,
            splitedWithArrayOp = predicate.split('.@'),
            props = [];

        splitedWithArrayOp.forEach(function(partial, idx) {
            if(arrayPartial.test(partial)) {
                props.push('@'+partial);
            } else {
                props = props.concat(partial.split('.'));
            }
        });

        return function(obj) {
            // call Array#slice on the second argument to copy an array
            return iterator(obj, props.slice());
        };
    };

    if (typeof module === 'object') {
        module.exports = predicate;
    } else if(root === window) {
        if (typeof window.predicate === 'undefined') {
            window.predicate = predicate;
        } else {
            // Huh? Something is already here.
            console.warn('Cannot initialize predicate.js. `window.predicate` is already taken.');
        }
    }

}((1,eval)('this')));