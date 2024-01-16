
# User Authentication REST API

A REST API designed for user authentication that uses PostgreSQL and JWT token generation to authententicate users.




## API Reference

#### Register user

```http
  POST /api/v1/users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. User's username |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

#### Login user

```http
  POST /api/v1/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User's email |
| `password` | `string` | **Required**. User's password |

#### Login user

```http
  PUT /api/v1/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization token` | `string` | **Required**. User's authentication token |
| `id`      | `string` | **Required**. Id of user to update |

#### Login user

```http
  DELETE /api/v1/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization token` | `string` | **Required**. User's authentication token |
| `id`      | `string` | **Required**. Id of user to delete |




