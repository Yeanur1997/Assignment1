var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = http.Server(app)
var Article = require('./article.model') 

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbURL = 'mongodb+srv://Assignment1:yeanur1997@cluster0.8runx.mongodb.net/form?retryWrites=true&w=majority'
mongoose.connect(dbURL, {userNewUrlParser:true, useUnifiedTopology: true});
mongoose.connection.on('error',function(err){
    console.log(err)
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) 

// your server routes go here
app.get('/', function(request, response){
    
    response.sendFile(__dirname + '/index.html');
})

app.get('/cart', function(request, response){
    
    response.sendFile(__dirname + '/cart.html');
})
app.get('/shop', function(request, response){
    
    response.sendFile(__dirname + '/shop.html');
})

app.get('/article/newproducts', function(request, response){
    // console.log(request);
    response.sendFile(__dirname + '/newproducts.html');
})

app.post('/article/new', function (request, response){

    var newArticle = new Article(request.body)
    newArticle.save(function (err, data){
        if(err)
        return response.status(400).json({
            error: 'Product is missing->' +data
        })
        return response.status(200).json({
            message: 'Product added successfully ->' +data
        })
    })
})

app.get('/article/:id', function(request, response){
    Article.findbyId(request.params.id, function(err, data){
        response.render('article.ejs', {
            article: data
        })
    })
})
app.get('/articles/all', function (request, response) {
    console.log("test");
    Article.find({}, function (err, data) {
      response.render('allArticle.ejs', {
        articles: data
      })
    })
   })

server.listen(process.env.PORT || 3000, 
process.env.IP || 'localhost', function(){
  				console.log('Server running');
})
module.exports = {app, server, mongoose}

