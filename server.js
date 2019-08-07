const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
    console.log(`Nodejs version ${process.version}`);
});
