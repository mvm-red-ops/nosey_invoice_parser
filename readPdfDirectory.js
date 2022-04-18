let fs = require('fs')
const parsePdf = require('./parsePdf.js')

//get all pdfs from directory
function readDirectory(){
  fs.readdir('./pdfs', function(err, items) {
    console.log('processing...')
    //iterate through each pdf
    for (var i=0; i < items.length; i++) {
      const jsonExt = items[i].slice(0,-4)
      console.log('jsonExt...')
      console.log(jsonExt)

      //skip hidden .DS_S file
      if(jsonExt === '.DS_S') continue

      //parse the pdf from imported function
      parsePdf.execute(jsonExt)
    }
  });
}

readDirectory()
