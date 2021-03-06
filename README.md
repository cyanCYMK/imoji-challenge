# imoji-challenge
imoji server coding exercise

## Prerequisites
* Install [mongoDB](http://docs.mongodb.org/manual/installation/)
* Install [node](https://nodejs.org/download/)
* Obtain `auth.js` file from administrator and place in `server/config/`
* From root directory:
  * Run `npm install`
  * Run `node server/app.js`

## API Endpoints

### GET /birdie/rest/topics
Gets all trending topics

#### Example response:
```
[
    {
        "_id": "551c4bc4d5ad1ac91953e9f6",
        "name": "apricot",
        "__v": 0
    },
    {
        "_id": "551c4bc8d5ad1ac91953e9f7",
        "name": "banana",
        "__v": 0
    },
    {
        "_id": "551c4bccd5ad1ac91953e9f8",
        "name": "carrot",
        "__v": 0
    }
]
```

Topics can be searched by query string ('startsWith' case insensitive search).

#### Example request:
`GET`

`http://localhost:5000/birdie/rest/topics?query=Ap`

#### Example response:
```
[
    {
        "_id": "551c4bc4d5ad1ac91953e9f6",
        "name": "apricot",
        "__v": 0
    }
]
```

### POST /birdie/rest/topic
Adds a trending topic to the server

#### Example request:
`POST`

`http://localhost:5000/birdie/rest/topic`

`req.body = {
  "name": "carrot"
}`

### DELETE /birdie/rest/topic
Removes a trending topic from the server

`DELETE`

`http://localhost:5000/birdie/rest/topic`

`req.body = {
  "name": "carrot"
}`

### POST /birdie/rest/topics/load
Loads trending topics from Twitter and updates the data store

Notes: 

* Duplicate trending topics are not checked before updating the data store.
* Twitter REST API used is [GET trends/place](https://dev.twitter com/rest/reference/get/trends/place)
* `1` is used as the `WOEID`. 
