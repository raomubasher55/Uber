## Backend API Documentation

## `/users/register` Endpoint.
###  Method `POST`.
The request body should be a JSON object with the following fields:

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email and at least 5 characters long.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```
## Response
The response will be a JSON object containing the created user and an authentication token.

Success Response
Status Code: 201 Created
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
   },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "token": "auth_token"
}
```
### Error Responses
Status Code: 400 Bad Request
`Body (Validation Error):`
```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    },
    ...
  ]
}
```

`Body (Email Already Taken):`
```json
{
  "error": "Email already taken"
}
```
