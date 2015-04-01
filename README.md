# imoji-challenge
imoji server coding exercise

## API Endpoints

### GET /birdie/rest/topics
Gets all trending topics

### POST /birdie/rest/topic
Adds a trending topic to the server

### DELETE /birdie/rest/topic
Removes a trending topic from the server

### GET /birdie/rest/topics
Searches topics by a supplied query string (ex:
/birdie/rest/topics?query=hi). You can perform a 'startsWith' case insensitive search. For example, the
term 'hi' can return 'high' and 'HIlls' but not 'skyhigh'

### POST /birdie/rest/topics/load
Loads trending topics from Twitter and updates the data store