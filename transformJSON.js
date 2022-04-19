let fs = require('fs')
const createCSV = require('./createCSV')
const helpers = require('./findData.js')


function transformJSON(){
  const csvData = []
  fs.readdir('./json', function(err, items) {
    let results = { clean: []}
    // iterate through each json file
    for (var i=2; i < 3; i++) {
      const json = require(`./json/${items[i]}`)
      var pages = json["Pages"]
      
      let clean = []
      for(let i = 0; i < pages.length; i++){
        results = helpers.findData(pages[i], i)
        clean = results && results.clean ?  [...clean, ...results.clean] : [...clean]
      }



      const csvData = helpers.organize(clean)

      let filename = items[i].split(' ')
      let month = filename[filename.length -1].split('.')[0]
       createCSV(csvData, month)
    }


  })
}

transformJSON()


//states
// const usa = {}

// {
//   states:  {
//     {
//       name: 'California',
//     abbreviation: ['CA']
//     },
//     {
//       name: 'New York',
//       abbreviation: ['NY']
//    }
//   }
// }

// usa.states 
// usa['states'][0]['name'] ='California'

// {
//   name: 'California',
// abbreviation: ['CA']
// }



// {[
//   ,
//   {
//     name: 'New York',
//     abbreviation: ['NY']
//  }]
// }





























