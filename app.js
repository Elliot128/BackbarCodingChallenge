const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const crypto = require('crypto');

const appSession = session({
    secret: 'session secret',
    saveUninitialized: true,
    resave: true,
});

if (process.env.NODE_ENV === 'production') {
    appSession.cookie = {
        secure: true,
    };
    app.set('trust proxy', 1);
}

const msgStore = {
    getMsgs: code => msgStore[code] || [],
    putMsg: (code, msg) => {
        if (!msgStore[code]) {
            msgStore[code] = [];
        }
        msgStore[code].push(msg);
    }
};

// statics
app.use('/dist',
    express.static(path.join(__dirname, 'dist'))
);

app.use(appSession);

app.get('/', (req, res) => {
    req.session.code = 
        req.query.code ||
        req.session.code ||
        (crypto.randomBytes(16)).toString('hex');
    res.sendFile(
        path.join(__dirname, 'dist/index.html')
    );
});

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
