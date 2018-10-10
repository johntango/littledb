var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// allow Cross-Origin Resource Sharing (CORS)
var cors = require('cors');
app.use(cors());

// init the data store
db.defaults({ posts: []}).write();
app.post('/payload', function(req,res){
    var mes = JSON.parse(req.body);
    //res.send("got some JSON:"+mes);
    console.write("got a payload"+mes);
});

// list posts
app.get('/data', function(req, res){     

    res.send(db.get('posts').value());

});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3000/posts/ping/1/false
// ----------------------------------------------------
app.get('/posts/:title/:id/:published', function(req, res){

    var post = {
        "title" : req.params.title,
        "id"    : req.params.id,
        "published" : req.params.published
    };
    db.get('posts').push(post).write();
    console.log(db.get('posts').value());   
    res.send(db.get('posts').value());
});

// ----------------------------------------------------
// filter by published state - test using:
//      curl http://localhost:3000/published/true
// ----------------------------------------------------
app.get('/published/:boolean', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// update published value - test using:
//      curl http://localhost:3000/published/1/true
// ----------------------------------------------------
app.get('/published/:id/:boolean', function(req, res){

    // YOUR CODE

});

// ----------------------------------------------------
// delete entry by id - test using:
//      curl http://localhost:3000/delete/5
// ----------------------------------------------------
app.get('/delete/:id/', function(req, res){

    // YOUR CODE

});

// start server
// -----------------------
app.listen(3000, function(){
    console.log('Running on port 3000');
});
