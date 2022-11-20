const fs = require('fs');
const Path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dbtools = require('./dbtools');
const xlsx = require('xlsx');
const chokidar = require('chokidar');
const System = require('./system');
const { all } = require('express/lib/application');

//const myfilepath = Path.join(__dirname, 'Inventory', 'samplepc1234.xlsx');

function readInventoryFile(filepath) {
    let workbook = xlsx.readFileSync(filepath);
    let sheetNames = workbook.SheetNames;
    let sheetData = workbook.Sheets[sheetNames[0]];

    //Here is where we use known cell locations of the specs needed to build the systems file
    let serialnum = sheetData.D1.v;
    let model = sheetData.D2.v;
    let OS = sheetData.D3.v;
    let price = sheetData.D4.v;
    let specs = [sheetData.D5.v, sheetData.D6.v, sheetData.D7.v, sheetData.D8.v];

    return new System(serialnum, model, OS, price, specs);
}


var inventoryWatcher = chokidar.watch(Path.join(__dirname, "Inventory"), {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: true,
});
console.log(`Watching directory for changes...` )

inventoryWatcher
    .on('add', function(filepath) {
        dbtools.insertSystem(readInventoryFile(filepath));
    })
    .on('change', function(filepath) {
        dbtools.updateSystem(readInventoryFile(filepath));
    })
    .on('unlink', function(filepath) {
        dbtools.deleteSystem(parseInt(Path.basename(filepath, '.xlsx')));
    })
    .on('error', function(error) {
        console.error('Error happened', error);
    });
