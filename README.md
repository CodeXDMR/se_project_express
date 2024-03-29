# WTWR (What to Wear?): Back End
This back-end project is focused on creating a server for the WTWR application.  Authorization takes place via middleware which utilizes jsonwebtoken.  This authorizes users to log into their account so that they can post, delete and like or unlike items.

## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

### Testing
Postman and MongoDB compass were used to test the API and user/item databases.<br/>
[Postman Screen Shot](./readme/graphics/Postman.png)<br/>
[MongoDB Screen Shot](./readme/graphics/MongoDB.png)


### Security
Helmet is used to manage HTTP response headers.

