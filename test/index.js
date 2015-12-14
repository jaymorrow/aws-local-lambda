'use strict';

var Lambda = require('../index');

Lambda({
    handler: './test-helpers/lambda.handler',
    gateway: {
        integration: './test-helpers/integration.json'
    }
});