
# 📰Blog API

This API is used to provide the authenticate user to post any blog and share their experiences to other.

Authentication:

Implemented JWT-based  token system for the authentication to secure the API. It ensures that authenticate user only update and post the blog on to server.


## 🚀Installation

clone this project.

```bash
  
```
Go to the project directory

```bash 
  cd my-project
```
Install dependencies

```bash
  npm install 
```
Start server

```bash
  node app.js 
```

    
## API Reference

#### Create new user

```http
  GET /user/register
```



#### Login user

```http
  GET /user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `login data`      | `JSON` | **Required**- {username,password}|

#### Send otp 

```http
  GET /user/sendotp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `JSON` | **Required**- {email}|



#### Change Password

```http
  GET /user/changepassword
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{username,otp}`      | `JSON` | **Required**- {username,newpassword,otp}|





#### Get all blogs

```http
  GET /user/getallblog
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|    nothing   | `JSON` | **Required**- {NULL}|


#### Create new Blog 

```http
  GET /user/createblog
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title,blog-content`      | `JSON` | **Required**- {JWT token}|

#### update Blog 

```http
  GET /user/updateblog
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:id`      | `JSON` | **Required**- {JWT- token}|

## Authors

- [@jay shankar srivastava](https://github.com/jaysrivastava4455)


## Tech Stack



**Server:** Node.js, Express.js,mongo db .


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Feedback

If you have any feedback, please reach out to us at https://instagram.com/i_m_jay_srivastava/


