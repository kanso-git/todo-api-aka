var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function(req, res) {
    res.json(todos);
})

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
    var _id = parseInt(req.params.id);
    if (typeof _id === 'number' && _id <= todos.length -1) {
        console.log("request Todo is found !!");
        res.json(todos[req.params.id]);
    } else {
        console.log("Erro !! requested Todo not found ");
        res.sendStatus(404);
    }

})


// POST todos
app.post('/todos', function(req,res){
    var body = req.body;
    body.id=todoNextId;    
    todos.push(body);
    todoNextId = todoNextId +1;
    res.json(body);
});

app.listen(PORT, function() {
    console.log("todo-api  server is runing on port:" + PORT);
});