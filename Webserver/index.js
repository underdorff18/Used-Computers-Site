const express = require('express', '4.17.1');
const fs = require('fs');
const Path = require('path');
dbtools = require(Path.join(__dirname, '..', 'ExcelReader', 'dbtools.js'));

const app = express();
const port = 3000;


app.get('/', (req, res) => {
	res.sendFile(Path.join(__dirname, "..", "systems.html"));
});

app.get('/index.js', (req, res) => {
	res.sendFile(Path.join(__dirname, "..", "index.js"));
})

app.get('/styles.css', (req, res) => {
	res.sendFile(Path.join(__dirname, "..", "styles.css"))
})

app.get('/systems', async function(req, res) {
	result = await dbtools.getAllSystems();
	console.log(result);
	res.json(result);

});


app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
