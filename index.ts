import express from 'express';
import { isNumber } from 'util';

const app = express();

app.use(express.json());

app.get('/api', (request: express.Request, response: express.Response) => {
    response.send('hello'); 
});

const todos: string[] = ['a', 'b', 'c', 'd'];

app.get('/api/todos', (request: express.Request, response: express.Response) => {
    response.send(todos); 
});

app.get('/api/todos/new', (request: express.Request, response: express.Response) => {
    const item = request.query.item;
    todos.push(item);
    response.send(todos);
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
    const parsed = parseInt(entry, 10);
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

app.listen(3000); // spinning up a server
console.log('Listening on port 3000');
