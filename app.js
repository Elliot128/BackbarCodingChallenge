const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const crypto = require('crypto');

app.use('/dist',
    express.static(path.join(__dirname, 'dist'))
);

app.use(session({
    secret: 'session secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production'
            ? true
            : false
    },
}));

app.get('/', (req, res) => {
    req.session.code = 
        req.query.code ||
        req.session.code ||
        (crypto.randomBytes(16)).toString('hex');
    res.sendFile(
        path.join(__dirname, 'dist/index.html')
    );
});

const msgStore = {
    getMsgs: code => msgStore[code] || [],
    putMsg: (code, msg) => {
        if (!msgStore[code]) {
            msgStore[code] = []
        }
        msgStore[code].push(msg);
    }
};

app.get('/messages', (req, res) => {
    res.send(msgStore.getMsgs(req.session.code));
});

app.post('/messages/:msg', (req, res) => {
    msgStore.putMsg(req.session.code, req.params.msg)
    res.sendStatus(200);
});

app.get('/code', (req, res) => {
    res.send(req.session.code)
});

module.exports = app;
