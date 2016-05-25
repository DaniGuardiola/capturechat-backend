/* global minEmoji */
'use strict';
(function() {
    var captureid;

    function getData(captureid) {
        var promise = new Promise(function(resolve) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(JSON.parse(xhr.responseText).data));
                    //resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.open('GET', 'http://0.0.0.0:3000/api/captures/data?id=' +
                captureid, true);
            xhr.send();
        });
        return promise;
    }

    function getChat() {
        return document.querySelector('#chat');
    }

    function loadMessages(messages) {
        var chat = getChat();
        var msg, row, element, text, time, textOutput,
            lastElement, lastDirection;
        for (var i = 0; i < messages.length; i++) {
            msg = messages[i];
            row = document.createElement('div');
            row.classList.add('row');
            element = document.createElement('div');
            element.classList.add('message');
            row.appendChild(element);
            if (msg.type === 'chat') {
                textOutput = minEmoji(msg.text.replace(/\n/g, '<br>')
                    .replace(/\s/g, '&thinsp;'));

                text = document.createElement('span');
                text.textContent = textOutput;
                text.classList.add('time');
                element.appendChild(text);

                time = document.createElement('span');
                time.textContent = msg.time;
                time.classList.add('time');
                element.appendChild(time);
            }
            if (msg.direction === 'out') {
                element.classList.add('out');
                row.classList.add('out');
            } else {
                element.classList.add('in');
                row.classList.add('in');
            }
            chat.appendChild(row);
            if (!lastElement) {
                element.classList.add('before');
            } else if (lastDirection !== msg.direction) {
                element.classList.add('before');
            }
            lastElement = element;
            lastDirection = msg.direction;
        }
    }

    function loadEmojis() {
        var elements = document.querySelectorAll('.message .text');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = minEmoji(elements[i].innerHTML);
        }
    }

    function init() {
        loadEmojis();
    }

    window.addEventListener('load', init);
}());
