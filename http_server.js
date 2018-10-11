var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var bodyParser = require('body-parser');
// configure express to catch Webhooks POST from GitHub
// configure express to serve static files from public directory
// ------------------------------------------------------------------


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// allow Cross-Origin Resource Sharing (CORS)
var cors = require('cors');
app.use(cors());

// init the data store
db.defaults({ posts: []}).write();

app.post('/payload', function(req,res){
    var data = req.body;
    console.log("got a GitHub payload \n"+JSON.stringify(data));
    res.status(200);
    res.send();
});

// list posts
app.get('/data', function(req, res){     

    res.send(db.get('posts').value());
    console.write('Hello from server');
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
    console.log('I Running on port 3000');
});
