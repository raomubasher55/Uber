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


## `/users/login` Endpoint.
### Method `POST`.
The request body should be a JSON object with the following fields:

- `email` (string, required): The email address of the user. Must be a valid email.
- `password` (string, required): The password for the user.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
The response will be a JSON object containing the authenticated user and an authentication token.

Success Response
Status Code: 200 OK
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
Status Code: 401 Unauthorized
`Body (Invalid Credentials):`
```json
{
  "error": "Invalid credentials"
}
```

### `GET /users/profile`

#### Description
Fetches the profile information of the authenticated user.

#### Authentication
This endpoint requires a valid JWT token for authentication. The token should be provided in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Response
- **Status Code:** 200 OK
- **Content:** JSON object containing the user's profile information.

#### Example Response


### GET `users/logout`

#### Description
Logs out the authenticated user by clearing the authentication token and adding it to the blacklist.

#### Authentication
This endpoint requires a valid JWT token for authentication. The token should be provided in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Response
- **Status Code:** 200 OK
- **Content:** A message indicating successful logout.

#### Example Response
```json
{
  "message": "Logged out successfully"
}
```

### Error Responses
Status Code: 401 Unauthorized
`Body (Invalid Token):`
```json
{
  "message": "Unauthorized: Invalid token"
}
```

`Body (No Token Provided):`
```json
{
  "message": "Unauthorized: No token provided"
}
```




## `/captains/register` Endpoint.
### Method `POST`.
The request body should be a JSON object with the following fields:

- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email and at least 5 characters long.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of `motorcycle`, `car`, or `auto`.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response
The response will be a JSON object containing the created captain and an authentication token.

Success Response
Status Code: 201 Created
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
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

## `/captains/login` Endpoint.
### Method `POST`.
The request body should be a JSON object with the following fields:

- `email` (string, required): The email address of the captain. Must be a valid email.
- `password` (string, required): The password for the captain.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
The response will be a JSON object containing the authenticated captain and an authentication token.

Success Response
Status Code: 200 OK
```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": null,
      "lng": null
    }
  },
  "token": "auth_token"
}
```

### Error Responses
Status Code: 401 Unauthorized
`Body (Invalid Credentials):`
```json
{
  "error": "Invalid credentials"
}
```



### `GET /captains/profile`

#### Description
Fetches the profile information of the authenticated captain.

#### Authentication
This endpoint requires a valid JWT token for authentication. The token should be provided in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Response
- **Status Code:** 200 OK
- **Content:** JSON object containing the captain's profile information.

#### Example Response
```json
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null,
  "status": "inactive",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": null,
    "lng": null
  }
}
```

### Error Responses
Status Code: 401 Unauthorized
`Body (Invalid Token):`
```json
{
  "message": "Unauthorized: Invalid token"
}
```

`Body (No Token Provided):`
```json
{
  "message": "Unauthorized: No token provided"
}
```

### `GET /captains/logout`

#### Description
Logs out the authenticated captain by clearing the authentication token and adding it to the blacklist.

#### Authentication
This endpoint requires a valid JWT token for authentication. The token should be provided in the `Authorization` header as a Bearer token or in the `token` cookie.

#### Response
- **Status Code:** 200 OK
- **Content:** A message indicating successful logout.

#### Example Response
```json
{
  "message": "Logged out successfully"
}
```

### Error Responses
Status Code: 401 Unauthorized
`Body (Invalid Token):`
```json
{
  "message": "Unauthorized: Invalid token"
}
```

`Body (No Token Provided):`
```json
{
  "message": "Unauthorized: No token provided"
}
```