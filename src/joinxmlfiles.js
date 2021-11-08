/*  **** TODO *****

Processes lastChild node, but is duplicating. Resolve.

*/

const fs = require('fs');
const path = require('path');
const { DOMParser, DOMImplementation } = require('@xmldom/xmldom');

/* **
	* @param {string} dir - directory of XML files
	* @param {boolean} writeout - TRUE if output should be written to a file.

	xmldom documentation: https://github.com/xmldom/xmldom

*/
const joinxmlfiles = (...args) => {
	// Joins multiple XML files
	const dir = args[0] || process.argv[2]
	const rawData = getDataFromFiles(dir);
	// Act on argument to suppress file output
	/*
	if (args[1] !== "no-file") {
		writeFile(dir, rawData);
	}
	*/
	console.log(rawData);
	return rawData;
}

const getDataFromFiles = (dir) => {
	let xmlJoined = new DOMImplementation().createDocument();
	const fileNames = fs.readdirSync(dir);
	fileNames.forEach(fileName => {
		
		// Process XML file only if it's not zero length
		const stats = fs.statSync(`${dir}${fileName}`);
		const fSize = stats["size"];
		if (fSize > 0 && fileName.match(/\.xml$/)) {
			const fileString = fs.readFileSync(`${dir}${fileName}`, 'utf-8');
			console.log(fileString);
			const parser = new DOMParser();
			const xmlFile = parser.parseFromString(fileString, 'text/xml');
			const xmlBody = xmlFile.lastChild;
			xmlJoined.appendChild(xmlBody);
		}
	});
	return xmlJoined.toString();
}

function writeFile (dir, manifest) {
	// Receives a string and writes it to file in local file system
	const fileName = 'manifest.json'
	const filePath = path.join(dir, fileName)
	fs.writeFileSync(filePath, manifest)
}

joinxmlfiles();
module.exports = joinxmlfiles