function findData(blob, page){
  const platforms = ['Roku', 'Plex', 'Samsung', 'Samsung-mx', 'Samsung-br', 'Vizio', 'Xumo', 'Connector.', '(VOD2)']

  let count = 0
  let irrelevant = true;
  const clean = []

    
  if(!blob.Texts) return
  let data = blob.Texts;
  let text;

    while(irrelevant){
      text = data[count]
      if(!text["R"]) continue
      else text = text["R"][0]["T"]

      console.log(`irrelevant text ${irrelevant}`)
      
      if(!text.includes('Quantity')) count++
      else irrelevant = false
    }

  

   for(let i = count +1; i <  data.length - 1; i++){

     let text = data[i]["R"][0]["T"]
     console.log(`text: ${text}`)

    

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
      let textNext = data[i+1]["R"][0]["T"]

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
    console.log(`curr: ${curr}`)
  }
  return {clean: clean, pastPage: page}
}

function organize (array){
    
    let rows = []
    let idx = array.indexOf('Quantity')

    for(let i = idx + 1; i < array.length; i+=5){
      let curr = array[i];

      let record = []
      for(let h = 0; h < 5; h++){
        record[h] = array[i + h]
      }
      rows.push(record)
  

    }
    // console.log(rows)
    return rows

}


module.exports = {
  organize,findData
}