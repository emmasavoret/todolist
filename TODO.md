# Homework

## 1. POST to set `done`
Add a new POST endpoint at `/api/todos/:id/done` which accepts a body of either `true` or `false` (no quotes).
It should set the "done" property of the Todo at that ID to true or false depending on the body,
and return a status of 200 and a body of `true` or `false` (whatever the new value is).

### Example
```
POST
http://localhost:3000/api/todos/2
true
```
returns
```
Status: 200 OK
true
```
and now the third item is `done: true`.

## 2. PUT to update an entire item
Add a new PUT endpoint at `/api/todos/:id`. Its body should look like this:
```
{
  "text": "Some text",
  "done": true
}
// or
{
  "text": "Some text"
}
```
1. *If* there is an item at that position, it gets replaced with the new value, and the new value is returned.
The `done` property is optional, and if it is missing, it gets set to `false` by default.
(Think about what a missing property looks like in an object - what is its value? How do you test if that is the case?)

2. If there is no item at that position, the API returns a `404` status code and a useful error message. 
(How do you check if there is an item in the current list?)
