var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios');


// Mount the middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

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

app.get('/details/:name', function(req,res) {
  var movieTitle = req.params.name

  // var data = axios
  //   .get(`http://www.omdbapi.com/?apikey=298232f2&t=${movieTitle}`)
  //   .then(function(response) {
  //     var movieResults = JSON.parse(response)
  //     console.log(movieResults)
  //     res.render(movieResults)
  //   })
  //   .catch(error => {
  //     console.log('error!')
  //     console.error(error)
  //   })

  // res.send(data)
})

app.listen(3000, function(){
  console.log("Listening on port 3000")
});
