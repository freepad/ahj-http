# Users

## CRUD

# RPC
CREATE
[POST] /?method=createUser

READ
[GET] /?method=getUser&userId=1
[GET] /?method=getAllUser

UPDATE
[PATCH] /?method=updateUser&userId=1
[PUT] /?method=replaceUser&userId=1

DETELE
[DELETE] /?method=deleteUser&userId=1

# REST
[POST]   /api/users
[GET]    /api/users
[GET]    /api/users/:id
[PATCH]  /api/users/:id
[PUT]    /api/users/:id
[DELETE] /api/users/:id
