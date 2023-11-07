const http = require('http');
const express = require('express');
const app = express();
const port = 4000;

app.listen(port, () => console.log('Server listening on port 4000.'));

app.get('getNewsData', (req, res) => {

})