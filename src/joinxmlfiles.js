/**
* Merges a set of local XML files from a single directory into a single parsable DOM object
* xmldom documentation: https://github.com/xmldom/xmldom
* @param {string} dir - directory of XML files
*/

const fs = require('fs');
const {
    DOMParser,
    DOMImplementation,
} = require('@xmldom/xmldom');

const joinxmlfiles = (...args) => {
    const dir = args[0] || process.argv[2];
    // Create empty document object to receive merged files
    const xmlJoined = new DOMImplementation().createDocument();
    const fileNames = fs.readdirSync(dir);
    fileNames.forEach(fileName => {

        // Process file only if it's not zero length and it does end .xml
        const stats = fs.statSync(`${dir}${fileName}`);
        const fSize = stats["size"];
        if (fSize > 0 && fileName.match(/\.xml$/)) {
            const fileString = fs.readFileSync(`${dir}${fileName}`, 'utf-8');
            const parser = new DOMParser();
            const xmlFile = parser.parseFromString(fileString, 'text/xml');
            // Gets each child node of type 1 (Element) and appends it to the document object
            const xNodes = xmlFile.childNodes;
            for (i = 0; i < xNodes.length; i++) {
                if (xNodes[i].nodeType == 1) {
                    xmlJoined.appendChild(xNodes[i]);
                }
            }
        }
    });
    return xmlJoined;
};

module.exports = joinxmlfiles;
