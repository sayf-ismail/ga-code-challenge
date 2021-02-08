var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

// Mount the middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

// favorites are requested upon index.html loading
app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// Information
app.get('/favorites/:name', function(req, res){
  var movieTitle = req.params.name
  
  var data = fs.readFileSync('./data.json')
  var words = JSON.parse(data)
  words.push(movieTitle)
  var favMovieList = JSON.stringify(words)
  console.log(favMovieList)
  fs.writeFile('./data.json', favMovieList, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
  res.redirect('/')
})

app.listen(port, function(){
  console.log(`Listening on port: ${port}`)
});
