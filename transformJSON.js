let fs = require('fs')
const createCSV = require('./createCSV')
const findData = require('./findData.js')


const platforms = ['Roku', 'Plex', 'Samsung', 'Samsung-mx', 'Samsung-br', 'Vizio', 'Xumo']
function transformJSON(){
  const csvData = []
  fs.readdir('./json', function(err, items) {
    // iterate through each json file
    for (var i=0; i < 1; i++) {
      const json = require(`./json/${items[i]}`)
      var body = json["Pages"][1]["Texts"]
      
      const clean = []
      let count = 0
      let irrelevant = true;

      while(irrelevant){
        let text = body[count]["R"][0]["T"]
        if(text.includes('Quantity')) irrelevant = false
        else count++
      }

      for(let i = count +1; i <  body.length - 1; i++){
        let text = body[i]["R"][0]["T"]

        if(text.includes('%20')){
          text = text.split('%20').join(' ')
        }
        if(text.includes('%2C')){
          text = text.split('%2C').join('')
        }
        if(text.includes('%3A')){
          text = text.split('%3A').join(':')
        }

        
        
        if(text.includes(':') ){
          let textNext = body[i+1]["R"][0]["T"]

          if(textNext.includes('%20')){
            textNext = textNext.split('%20').join(' ')
          }
          if(textNext.includes('%2C')){
            textNext = textNext.split('%2C').join('')
          }
          if(textNext.includes('%3A')){
            textNext = textNext.split('%3A').join(':')
          }
          let word_array = textNext.split(' ')
          let last_word = word_array[word_array.length -1]



          if(textNext.includes('Nosey') || platforms.includes(last_word)){
            clean.push(`${text} ${textNext}`)
            i++
          } 
          else {
              clean.push(text)
          }

        } else {
          clean.push(text)
        }

        count++
      }
      for(let i = 0; i < clean.length; i++){
        let curr = clean[i]
        
      }

      const csvData = findData.organize(clean)

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





























