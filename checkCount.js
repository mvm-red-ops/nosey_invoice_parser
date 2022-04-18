let fs = require('fs')

fs.readdir('./json', function(err, items) {
  console.log('json count: ', items.length)
})
fs.readdir('./pdfs', function(err, items) {
  console.log('pdf count: ', items.length)
})
fs.readdir('./csv', function(err, items) {
  console.log('csv count: ', items.length)
})
