requirejs.config({
    paths: {
        'prototype': 'lib/prototype'
    },
    shim: {
        'prototype': {
            exports: 'Prototype'
        }
    }
});

require(["router"]);