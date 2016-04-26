var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
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
    var idToFind = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos, {
        id: idToFind
    });

    if (_.isObject(matchedTodo)) {
        console.log("request Todo is found !!");
        res.json(matchedTodo);
    } else {
        console.log("Erro !! requested Todo not found ");
        res.sendStatus(404);
    }

})

// POST todos
app.post('/todos', function(req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    if (_.isBoolean(body.completed) && _.isString(body.description) && body.description.trim().length > 0) {
        body.id = todoNextId;
        body.description = body.description.trim();
        todos.push(body);
        todoNextId = todoNextId + 1;
        res.json(body);
    } else {
        res.sendStatus(400).send();
    }

});


// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
    var idToFind = parseInt(req.params.id);
    var matchedTodo = _.findWhere(todos, {
        id: idToFind
    });

    if (_.isObject(matchedTodo)) {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    } else {
        res.status(404).send({
            "error": "no todo found to delete with id[" + idToFind + "]"
        });
    }

})

// PUT /todos/id

app.put('/todos/:id', function(req, res) {
    var validAttributes = {};
    var idToFind = parseInt(req.params.id);
    var body = _.pick(req.body, 'description', 'completed');

    var matchedTodo = _.findWhere(todos, {
        id: idToFind
    });
    if (!_.isObject(matchedTodo)) {
        return res.status(404).send({
            "error": "no todo found to update with id[" + idToFind + "]"
        });
    }

    if (body.hasOwnProperty('completed')) {
        if (_.isBoolean(body.completed)) {
            validAttributes.completed = body.completed;
        } else {
            return res.status(400).send();
        }
    }

    if (body.hasOwnProperty('description')) {
        if (_.isString(body.description) && body.description.trim().length > 0) {
            validAttributes.description = body.description;
        } else {
            return res.status(400).send();
        }
    }

    if (!_.isEmpty(validAttributes)) {
        //perform the update  arrays are passed by reference even in Javascript
        _.extend(matchedTodo, validAttributes);
    }
    res.json(matchedTodo);

});

app.listen(PORT, function() {
    console.log("todo-api  server is runing on port:" + PORT);
});