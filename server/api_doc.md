# brand API Documentation

## Endpoints :

List of available endpoints:

- `POST /signIn`
- `POST /signUp`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `DELETE /products/:id`
- `POST /category`

&nbsp;

## 1. POST /signIn

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username / password required"
}
```

&nbsp;

## 2. POST /signUP

Request:

- body:

```json
{
    "username":"string",
  "email": "string",
  "password": "string",
  "role":"string",
  "phoneNumber":"string",
  "address":"string"

}
```

_Response (201 - Created)_

```json
{
  "username": "1user",
    "email": "1user@gmail.com",
    "role": "admin",
    "phoneNumber": "08787878733",
    "address": "BFFB"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username / password required"
}
OR
...
```

&nbsp;

## 3. POST /product

Request:

- headers: 
```json

```

- body:

```json
{
    "name": "bukutest",
    "description": "ini bukunya",
    "price": 10000,
    "stock": 90,
    "imgUrl": "www.google.com",
    "categoryId": 1,
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
    "name": "newbrand",
    "description": "branduhuy",
    "price": 10000,
    "stock": 90,
    "imgUrl": "www.google.com",
    "categoryId": 1,
    "authorId": 1,
    "updatedAt": "2022-10-06T09:44:18.403Z",
    "createdAt": "2022-10-06T09:44:18.403Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "errorCode": 401,
    "message": "access_token null"
}
or
{
    "errorCode": 401,
    "message": "stock cannot be less than 1"
}
or
{
    "errorCode": 401,
    "message": "stock cannot be more than 999.999.999"
}
or
{
    "errorCode": 401,
    "message": "stock cannot be less than 1"
}
or
{
    {
    "errorCode": 401,
    "message": "stock cannot be more than 999"
}
}
```

&nbsp;

## 4. GET /products

Description:
- Get all product from database

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
        "id": 1,
        "name": "bukutest",
        "description": "ini bukunya",
        "price": 10000,
        "stock": 90,
        "imgUrl": "www.google.com",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2022-10-06T03:42:44.907Z",
        "updatedAt": "2022-10-06T03:42:44.907Z",
        "user": {
            "username": "1user",
            "email": "1user@gmail.com"
        },
        "category": {
            "id": 1,
            "name": "categori1",
            "createdAt": "2022-10-06T03:42:40.196Z",
            "updatedAt": "2022-10-06T03:42:40.196Z"
        }
    }
  ...,
]
```

&nbsp;

## 5. DELETE /products/:id

Description:
- Delete product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "product has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "product not found"
}
```

&nbsp;

## 6. GET /products/:id

Description:
- GET product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  [
    {
        "id": 1,
        "name": "bukutest",
        "description": "ini bukunya",
        "price": 10000,
        "stock": 90,
        "imgUrl": "www.google.com",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2022-10-06T03:42:44.907Z",
        "updatedAt": "2022-10-06T03:42:44.907Z",
        "user": {
            "username": "1user",
            "email": "1user@gmail.com"
        },
        "category": {
            "id": 1,
            "name": "categori1",
            "createdAt": "2022-10-06T03:42:40.196Z",
            "updatedAt": "2022-10-06T03:42:40.196Z"
        }
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "product not found"
}
```

&nbsp;

## 7. POST /categories

Request:

- body:

```json
{
    "name":"string",
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "errorCode": 400,
    "message": "nama kategori is required"
}


&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
