let fs = require('fs')
const { convertArrayToCSV } = require('convert-array-to-csv');

const headers = ['Description',  'Rate', 'Amount', 'Month', 'Quantity'];

function createCSV(data, month){
  const csvFromArrayOfArrays = convertArrayToCSV(data, {
    header: headers,
    separator: ','
  });
  const filename = `./csv/${month}_nosey_invoice.csv`
  fs.writeFile(filename, csvFromArrayOfArrays, (err) => {
    if (err) throw err;
    console.log('Saved')
  })
}

module.exports = createCSV
