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
        secure: true
    },
}));

app.get('/', (req, res) => {
    req.session.code = req.query.code 
        ? req.query.code 
        : (crypto.randomBytes(16)).toString('hex');
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

module.exports = app;
