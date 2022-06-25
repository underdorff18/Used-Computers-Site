const express = require('express', '4.17.1');
const fs = require('fs');
const app = express();
//const myparse = require('./parse');
const port = 3000;


app.get('/', (req, res) => {
	res.send('Homepage');
});

app.get('/systems.json', (req, res) => {
	fs.readFile('systems.json', 'utf8', (err, data) => {
		if (err) throw err;
		res.json(JSON.parse(data));
	});
});


app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
