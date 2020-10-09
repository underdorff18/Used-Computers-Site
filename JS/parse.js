const fs = require('fs');
const path = require('path');

var systems;
fs.readFile('testinput.json', 'utf8', (err, data) => {
	if (err) throw err;
	console.log(data);
	systems = JSON.parse(data);
});

exports.systems = systems;
