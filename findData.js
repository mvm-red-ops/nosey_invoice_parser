function organize (array){
    
    let rows = []

    for(let i = 0; i < array.length; i+=5){
      let curr = array[i];
      console.log(curr)
      let record = []
      for(let h = 0; h < 5; h++){
        record[h] = array[i + h]
      }
      rows.push(record)
  

    }
    console.log(rows)
    return rows

}


module.exports = {
  organize
}