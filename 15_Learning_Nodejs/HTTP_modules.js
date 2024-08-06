// Perform a GET request

const axios = require('axios')

axios
	.get('https://example.com/todos')
	.then(res => {
		console.log(`statusCode: ${res.status}`)
		console.log(res)
	})
	.catch(error => console.error(error))

// same but with the standard Node.js module (more verbose)
const http = require('https')

const options = {
	hostname: 'example.com',
	port: 443,
	path: '/todos',
	method: 'GET',
}

const req = http.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`)

	res.on('data', d => {
		process.stdout.write(d)
	})
})

req.on('error', error => {
	console.error(error)
})

req.end()

// POST request using axios
axios
	.post('https://whatever.com/todos', {
		todo: 'Buy the milk',
	})
	.then(res => {
		console.log(`statusCode: ${res.status}`);
		console.log(res);
	})
	.catch(error => {
		console.error(error);
	});

// using Nodejs modules
const data = JSON.stringify({
	todo: 'Buy the milk',
});

const options1 = {
	hostname: 'whatever.com',
	port: 443,
	path: '/todos',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length,
	},
};

const req1 = https.request(options1, res => {
	console.log(`statusCode: ${res.statusCode}`);

	res.on('data', d => {
		process.stdout.write(d);
	});
});

req1.on('error', error => {
	console.error(error);
});

req.write(data);
req.end();






