'use strict';
var fs = require('fs');
var Hashids = require('hashids'),
    hashids = new Hashids('there are two colors in my head');

module.exports = function(Capture) {
    var response;
    Capture.findByHash = function(hash, cb) {
        console.log(hash);
        var id = hashids.decode(hash);
        Capture.findById(id,
            function(err, instance) {
                if (!instance) {
                    response = 'The specified resource does not exist';
                    err = err || 'The specified resource does not exist';
                } else {
                    response = instance;
                }
                cb(err, response);
            });
    };
    /*
    Capture.data = function(hash, cb) {
        Capture.findByHash(hash,
            function(err, instance) {
                if (err) {
                    response = 'The specified resource does not exist';
                } else {
                    response = fs.readFileSync(
                        'captures/' + instance.captureid + '.json', {
                            encoding: 'utf8'
                        });
                }
                cb(err, response);
            });
    };
    */
    Capture.remoteMethod(
        'findByHash', {
            http: { path: '/findByHash', verb: 'get' },
            accepts: [{
                arg: 'hash',
                required: true,
                type: 'string',
                http: { source: 'query' }
            }],
            returns: { arg: 'data', type: 'array' }
        }
    );
};
