# JoinXMLfiles

Merges xml files from a single local directory.

The function receives one argument, the path to a folder, and returns a DOM object.

## Usage

```JavaScript
const joinxmlfiles = require('joinxmlfiles');
const mergedOutput = joinxmlfiles('./directory/of/xmlfiles/');
console.log(mergedOuput.toString()); // Ouputs merged result as string
```