const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const myfilepath = path.join(__dirname, 'Inventory', 'samplepc1234.xlsx');

function readInventoryFile(filepath) {
    const workbook = xlsx.readFileSync(filepath);
    const sheetNames = workbook.SheetNames;
    const data = workbook.Sheets[sheetNames[0]];
    console.log(data);

    //Here is where we use known cell locations of the specs needed to build the systems file
}


readInventoryFile(myfilepath);
//console.log('yo');

