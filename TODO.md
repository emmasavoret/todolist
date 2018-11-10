1. When I POST to /api/todos
   With a body of { "name": "Figure out how to do this" }
   Then a new list item with the name value should be created
   and the response should be the name value ("Figure out how to do this")