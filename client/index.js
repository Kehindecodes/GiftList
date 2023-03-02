const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
	// TODO: how do we prove to the server we're on the nice list?
	const hash = new MerkleTree(niceList);
	const name = 'Oki kehinde';
	const nameIndex = niceList.findIndex((n) => n === name);
	const proof = hash.getProof(nameIndex);

	const { data: gift } = await axios.post(`${serverUrl}/gift`, {
		name: name,
		proof: proof,
	});
	console.log(gift);
}

main();
