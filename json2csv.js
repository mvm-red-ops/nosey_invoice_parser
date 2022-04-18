let converter = require('json-2-csv');
var json = require('./json/output.json') 


let jsonCallback = function (err, csv){
  if (err) throw err;
  if( csv ) writeCSV(csv)
}

converter.json2csv([json], jsonCallback)

function writeCSV(csvData){
  fs.writeFile("./csv/csvFile.csv", JSON.stringify(pdfData), function(err, result) {
    if(err) console.log('error', err);
  });
}