'use strict';
module.exports = function(app) {
    // Install a '/ping' route that returns 'pong'
    app.get(/^\/(\w+)$/, function(req, res) {
        var hash = req.params[0];
        app.models.Capture.findByHash(hash, function(err, response) {
            if (err) {
                res.send('404');
            } else {
                var messages = response.messages;
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].text) {
                        messages[i].text = messages[i].text
                            .replace(/\n/g, '<br>')
                            .replace(/\s(?![^<]*>)/g, '&thinsp;');
                    }
                }
                res.render('chat', { 'messages': messages });
            }
        });
    });
};
