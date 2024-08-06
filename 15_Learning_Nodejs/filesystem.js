const fs = require('fs')

// all of fs modules are asynchronous by default
fs.rename('before.json', 'after.json', err => {
	if (err)
		return console.error(err)
})
// Unless we append Sync to it
try {
	fs.renameSync('before.json', 'after.json')
} catch (err) {
	console.error(err)
}

// it again using promise-based API.
const fs = require('fs/promises');

async function example() {
	const fileName = '/Users/joe/test.txt';
	try {
		const data = await fs.readFile(fileName, 'utf8');
		console.log(data);
		const content = 'Some content!';
		await fs.writeFile(fileName, content);
		console.log('Wrote some content!');
		const newData = await fs.readFile(fileName, 'utf8');
		console.log(newData);
	} catch (err) {
		console.log(err);
	}
}
example();
