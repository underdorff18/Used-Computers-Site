const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const chokidar = require('chokidar');
const System = require('./system');

const myfilepath = path.join(__dirname, 'Inventory', 'samplepc1234.xlsx');

function readInventoryFile(filepath) {
    let workbook = xlsx.readFileSync(filepath);
    let sheetNames = workbook.SheetNames;
    let sheetData = workbook.Sheets[sheetNames[0]];

    //Here is where we use known cell locations of the specs needed to build the systems file
    let serialNum = sheetData.D1.v;
    let model = sheetData.D2.v;
    let OS = sheetData.D3.v;
    let price = sheetData.D4.v;
    let specs = [sheetData.D5.v, sheetData.D6.v, sheetData.D7.v, sheetData.D8.v];

    return new System(serialNum, model, OS, price, specs);
}


console.log(readInventoryFile(myfilepath));

var inventoryWatcher = chokidar.watch(path.join(__dirname, "Inventory"), {ignored: /^\./, persistent: true});

// inventoryWatcher
//     .on('add', function(path) {
//         fs.appendFile('systems.json', ', ')
//     })
//