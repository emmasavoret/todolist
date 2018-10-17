import express from 'express';

const app = express();

app.get('/api', (request: express.Request, response: express.Response) => {
    response.send('hello'); 
});

const todos: string[] = [];

app.get('/api/todos', (request: express.Request, response: express.Response) => {
    response.send(todos);
});

app.get('/api/todos/new', (request: express.Request, response: express.Response) => {
    const item = request.query.item;
    todos.push(item);
    response.send(todos);
});

app.listen(3000); // spinning up a server
console.log('Listening on port 3000');
