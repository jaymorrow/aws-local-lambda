'use strict';

function ContextError(err) {
    return {
        name: err.name,
        message: err.message,
        stack: ''
    };
}

function Context(response) {
    if (!(this instanceof Context)) {
        return new Context(response);
    }

    Object.defineProperty(this, 'response', {
        __proto__: null,
        value: response
    });

    return this;
}

Context.prototype.succeed = function(data) {
    this.response.end(JSON.stringify(data, null, 4));
};

Context.prototype.fail = function(err) {
    if (typeof err === 'error') {
        err = ContextError(err);
    }

    this.response.end(JSON.stringify(err, null, 4));
};

Context.prototype.done = function(err, data) {
    if (err) {
        return this.fail(err);
    }

    this.succeed(data);
};

module.exports = Context;