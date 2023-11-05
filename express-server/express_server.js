const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('<h1>Home Pagee</h1>');
});

app.get('/post', (req, res) => {
	res.send('<h1>Post Pagee</h1>');
});

app.get('/user', (req, res) => {
	res.send('<h1>User Pagee</h1>');
});

app.use((req, res) => {
	res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(3000, () => {
	console.log('server running on http://localhost:3000');
});
