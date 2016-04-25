var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
        id: 1,
        description: 'Meet mom for lunch',
        completed: false
    }, {
        id: 2,
        description: 'Go to market',
        completed: false
    }, {
        id: 3,
        description: 'Feed the cat',
        completed: true
    }

];


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


app.listen(PORT, function() {
    console.log("todo-api  server is runing on port:" + PORT);
});