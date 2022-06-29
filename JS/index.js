const express = require('express', '4.17.1');
const fs = require('fs');
dbtools = require('./dbtools');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
	res.send('Homepage');
});

app.get('/systems', async function(req, res) {
	result = await dbtools.getAllSystems(dbtools.collection);
	console.log(result);
	res.send(result);

});


app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
