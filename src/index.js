import express from 'express';

import {
  SoundCloudGraphQLSchema
} from './schema';

var graphqlHTTP = require('express-graphql');

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: SoundCloudGraphQLSchema,
  graphiql: true
}));

var port = 3000;
if (process.env.PORT) {
  port = process.env.PORT;
}

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
