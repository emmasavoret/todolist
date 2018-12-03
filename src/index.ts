import express from 'express';
// import * as t from './todo.interface';
// import Todo = t.Todo;
import { Todo } from './todo.interface';

const app = express();

app.use(express.json());

app.get('/api', (request: express.Request, response: express.Response) => {
    response.send('hello'); 
});

const todos: Todo[] = [
    {
        text: 'Learn about todo list', 
        done: true
    }, 
    {
        text: 'Make todo list', 
        done: false
    },
    {
        text: 'Conquer the world', 
        done: false
    },
    {
        text: 'Have Fun', 
        done: true
}];

app.get('/api/todos', (request: express.Request, response: express.Response) => {
    response.send(todos); 
});

// app.get('/api/todos/new', (request: express.Request, response: express.Response) => {
//     const item = request.query.item;
//     todos.push(item);
//     response.send(todos);
// }); 
// Not pure to be able to add values using GET

app.post('/api/todos', (request: express.Request, response: express.Response) => {   
    const imput = request.body;
    const text = imput.name;
    const newTodo = {
        text: text,
        done: false
    };
    todos.push(newTodo);
    response.send(newTodo);
});

app.get('/api/todos/:position', (request: express.Request, response: express.Response) => {
    const position = request.params.position;

    // guard pattern
    if (isNaN(position)) {
        response.status(400).send('Not a valid position');
        return;
    }

    if (position < 0) {
        response.status(400).send('Not a valid position');
        return;
    }

    // because it is protecting the rest of that function against a bad input
    const result = todos[position];
    response.send(result);
});

app.delete('/api/todos/:entry', (request: express.Request, response: express.Response) => {
    const entry = request.params.entry;
    const parsed = parseInt(entry, 10); //reads a number from a string
    if (isNaN(parsed)) {
        response.status(400).send('Not a valid position');
    } else {
        if (parsed < 0) {
            response.status(400).send('Not a valid position');
        } else {
            todos.splice(entry,1);
            response.send(todos);  
        }
    }
});

app.post('/api/todos/:id/done', (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const parsed = parseInt(id, 10);
    const imput = request.body;
    console.log(imput,imput.done !== true,imput.done !== false,imput.done !== true || imput.done !== false);
    if ( imput.done !== true && imput.done !== false ) {
        response.status(400).send('Not a valid property');
        return;
    }

    //todos[parsed].done = !!imput.done // bang bang (!!) (not not) turns into boolean
    todos[parsed].done = imput.done;
    const status = todos[parsed].done;
    response.send(status);  
});


app.put('/api/todos/:id', (request: express.Request, response: express.Response) => {
    const id: number = request.params.id;
    
    const todosLenght = todos.length;
    const todosMaxPosition = todosLenght - 1;
    if ( id > todosMaxPosition) {
        response.status(404).send('Not a valid position');
        return;
    }
    const replacement = request.body;
    if (typeof replacement.text !== "string") {
        response.status(400).send('"text" must be a string');
        return;
    } 
    if (typeof replacement.done === "undefined"){
        replacement.done = false;
    }
    if (typeof replacement.done !== "boolean"){
        response.status(400).send('"done" must be a boolean, was ' +typeof replacement.done);
        return;
    }
    todos[id] = replacement;
    response.send(todos[id]);
});

app.listen(3000); // spinning up a server
console.log('Listening on port 3000');
