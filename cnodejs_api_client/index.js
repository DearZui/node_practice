'use strict'

const rawRequest = require('request');

class CNodeJs {
    constructor(options) {
        this.options = options = options || {};
        options.token = options.token || null;
        options.url = options.url || 'https://cnodejs.org/api/v1/';
    }
    
    baseParas(params) {
        params = Object.assign({}, params || {});
    }
}