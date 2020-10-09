const express = require('express', '4.17.1');
const app = express();
const myparse = require('./parse');
const port = 3000;


console.log(JSON.stringify(myparse.systems));

app.get('/', (req, res) => {
	res.send('Hello World!');
});


app.listen(port, () => {
	console.log('Listening at http://localhost:${port}');
});
