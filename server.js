const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const distPath = __dirname + '/dist';

app.use(express.static(distPath));

//BrowserHistory fix - whenewer user types any path, always show index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(port);
console.log('Server started on port: ' + port);