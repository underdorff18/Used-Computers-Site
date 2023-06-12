const fs = require('fs');
const Path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dbtools = require('./dbtools');
const xlsx = require('xlsx');
const chokidar = require('chokidar');
const System = require('./system');
const { all } = require('express/lib/application');

//const myfilepath = Path.join(__dirname, 'Inventory', 'samplepc1234.xlsx');

//given a full path to a file, this function will produce a system object or an object with an error key 
//if formatted incorrectly
function readInventoryFile(filepath) {  
    //Checking for correct file type
    const fileinfo = Path.parse(filepath);
    if (fileinfo.ext !== ".xlsx") {
        return {error: "Given file is not xlsx format"}
    }

    let workbook = xlsx.readFileSync(filepath);
    let sheetNames = workbook.SheetNames;
    let sheetData = workbook.Sheets[sheetNames[0]];

    let system;

    //Here is where we use known cell locations of the specs needed to build the systems file
    try {
        system = new System(
            sheetData.D1.v, 
            sheetData.D2.v, 
            sheetData.D3.v, 
            sheetData.D4.v, 
            [sheetData.D5.v, sheetData.D6.v, sheetData.D7.v, sheetData.D8.v]);
    }
    catch (error) {
        console.error(error);
    }

    //Checking if file is formatted correctly
    if (!system) {
        return {error: "One or more necessary values are not defined"}
    }
    if (parseInt(fileinfo.name) !== system.serialnum) {
        return {error: "filename does not match serial number"};
    }

    return system;
}

//This function reads all files in the given directory, and updates the database to match
async function syncDirToDatabase(directory) {
    dbtools.deleteAllSystems(); 
    let files = fs.readdirSync(directory);
    let systemsArr = [];
    files.forEach((val, index) => {
        let result = readInventoryFile(Path.join(directory, val))
        if (result.error) {
            console.log(`syncDirToDatabase: error with ${val}: ${result.error}`);
        }
        else {
            console.log('here');
            console.log(result);
            console.log(val);
            systemsArr.push(val);
            dbtools.insertSystem(result);
        }
    })

    console.log("Database synced. Current contents: ");
    console.log(systemsArr);

}


var inventoryWatcher = chokidar.watch(Path.join(__dirname, "Inventory"), {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: true,
    ignoreInitial: true
});
console.log(`Watching directory for changes...` )

syncDirToDatabase(Path.join(__dirname, "Inventory"));

inventoryWatcher
    .on('add', function(filepath) {
        const system = readInventoryFile(filepath);
        if (system.error) {
            console.error(system.error);
        }
        else {
            dbtools.insertSystem(system);    
        }
        
    })
    .on('change', function(filepath) {
        const system = readInventoryFile(filepath);
        if (system.error) {
            console.error(system.error);
        }
        else {
            dbtools.updateSystem(system);   
        }
    })
    .on('unlink', function(filepath) {
        if (Path.extname(filepath) !== ".xlsx") {
            console.log("inventoryWatcher: a non xlsx file has been deleted");
        }
        else {
            dbtools.deleteSystem(parseInt(Path.basename(filepath, '.xlsx')));
        }
    })
    .on('error', function(error) {
        console.error('Error happened', error);
    });
