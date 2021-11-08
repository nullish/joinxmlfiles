const fs = require('fs');
    const path = require('path');
    const {
        DOMParser,
        DOMImplementation
    } = require('@xmldom/xmldom');
    
/* ***** TODO

- Detect child type to dynamically select xml type nodes vs process instructions
	Do by checking if nodeType = 1 (Element)
- Elegant write out to file

******
*/

/* **
	* @param {string} dir - directory of XML files

	xmldom documentation: https://github.com/xmldom/xmldom

*/

const joinxmlfiles = (...args) => {
    const dir = args[0] || process.argv[2]
    let xmlJoined = new DOMImplementation().createDocument();
    const fileNames = fs.readdirSync(dir);
    fileNames.forEach(fileName => {

        // Process XML file only if it's not zero length
        const stats = fs.statSync(`${dir}${fileName}`);
        const fSize = stats["size"];
        if (fSize > 0 && fileName.match(/\.xml$/)) {
            const fileString = fs.readFileSync(`${dir}${fileName}`, 'utf-8');
            // console.log(fileString);
            const parser = new DOMParser();
            const xmlFile = parser.parseFromString(fileString, 'text/xml');
            for (i = 0; i < xmlFile.childNodes.length; i++) {
                if (xmlFile.childNodes[i].nodeType == 1) {
                    xmlJoined.appendChild(xmlFile.childNodes[i]);
                }
            }
        }
    });
    return xmlJoined;
}

module.exports = joinxmlfiles