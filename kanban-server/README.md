# Kanban Ryan
```
Create Kanban Web app, using express, vue, axios
* RESTful endpoint with CRUD method
* JSON formatted response
* Web Server response
* Create, Edit, and Delete your Todo List
```

# Usage
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
Run `npm run serve` to start the client.
```

# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

# ENDPOINT

## POST /login

> Login User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{ 
  "email": "<User's email>",
  "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
  "accessToken": <token>
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Invalid Email or Password"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /register

> Register User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{ 
  "email": "<User's email>",
  "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
  "email": "<User's email>",
  "password": "<User's password>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" :  "VALIDATION_ERROR",
  "message": "Email required, Password required, Email has been used"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## POST /googleLogin

Request Header

```Not Needed```

Request Body

```javascript
{
  "id_token": "<your id_token>"
}
```

_Response(200)
```javascript
{
  "accessToken": <token>
}
```
OR

_Response(201)
```javascript
{
  "accessToken": <token>
}
```

_Response(401)
```javascript
{
  "message": "<Invalid Email/Password>" ,
}
```

## POST /tasks

> Add Kanban Task

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
{
  "title": "<Task's title>"
}
```
_Response(201)_
```javascript
{
  "id": "<Task's ID>",
  "title": "<Task's title>",
  "category": "<Task's category>"
  "UserId": "<Task's user id>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Title cannot be empty 
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /tasks

> Get Kanban Task

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Task's ID>",
  "title": "<Task's title>",
  "category": "<Task's category>",
  "UserId": "<Task's user id>",
  "email": "<User's email>",
  "password": "<User's password>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## GET /tasks/:id

> Get Kanban Task

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "id": "<Task's ID>",
  "title": "<Task's title>",
  "category": "<Task's category>",
  "UserId": "<Task's user id>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## PUT /tasks/:id

> Edit Kanban Task

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
{
  "title": "<Task's title>"
}
```

_Response(200)_
```javascript
{
  "id": "<Task's ID>",
  "title": "<Task's title>",
  "category": "<Task's category>",
  "UserId": "<Task's user id>"
}
```
_Response(400 - Bad Request)_
```javascript
{
  "Error" : "VALIDATION_ERROR",
  "message": "Title cannot be empty 
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## PATCH /tasks/:id

> Update Category Kanban Task

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```javascript
{
  "category": "<Task's category>"
}
```

_Response(200)_
```javascript
{
  "id": "<Task's ID>",
  "title": "<Task's title>",
  "category": "<Task's category>",
  "UserId": "<Task's user id>"
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

## DELETE /tasks/:id

> Delete Kanban Task

_Request Header_
```javascript
{
  "token": <token>
}
```

_Request Body_
```Not Needed```

_Response(200)_
```javascript
{
  "message":  "<Task success to delete>",
}
```
_Response(401)
```javascript
{
  "message": "<Invalid token>" , 
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```