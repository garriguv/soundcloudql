/* @flow */

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

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
