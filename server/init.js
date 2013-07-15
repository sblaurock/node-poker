var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(["router"]);