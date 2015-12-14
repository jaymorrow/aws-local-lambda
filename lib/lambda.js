'use strict';

var extend = require('extend');
var ApiGateway = require('aws-local-apigateway');
var Context = require('./context');
var path = require('path');
var cwd = process.cwd();

var defaults = {
    handler: 'index.handler',
    gateway: ApiGateway.defaults
}

function getHandler(handler) {
    var split = handler.lastIndexOf('.');
    var file = handler.substring(0, split);
    var method = handler.substring(split + 1);

    return require(path.resolve(cwd, file))[method];
}

function Lambda(options) {
    if (!(this instanceof Lambda)) {
        return new Lambda(options);
    }

    options = extend(true, {}, defaults, options || {});
    options.gateway.response = this.response.bind(this);
    this.lambda = getHandler(options.handler);

    var gateway = new ApiGateway(options.gateway);
    gateway.open();

    return this;
}

Lambda.prototype.response = function(res, data) {
    var event = data.requestMap;
    var context = Context(res);

    this.lambda(event, context);
};

module.exports = Lambda;