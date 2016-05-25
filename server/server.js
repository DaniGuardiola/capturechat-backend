'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var cons = require('consolidate');
var path = require('path');

var app = module.exports = loopback();

app.set('view engine', 'html');
app.engine('html', cons.underscore);

app.start = function() {
    // start the web server
    return app.listen(function() {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
            console.log('Browse your REST API: %s%s', baseUrl, explorerPath);
        }
    });
};

/*
var ds = loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: path.join(__dirname, '../storage')
});

var container = ds.createModel('container');

app.model(container);
*/

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
    if (err) throw err;

    // start the server if `$ node server.js`
    if (require.main === module)
        app.start();
});
