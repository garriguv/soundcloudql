/* @flow */

import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import {
  JSONDataWithPath
} from '../api';

var trackType = new GraphQLObjectType({
  name: 'Track',
  description: 'A track on SoundCloud.',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier of the Track.',
      resolve: (track) => track.id
    },
    title: {
      type: GraphQLString,
      description: 'The title of the track.',
      resolve: (track) => track.title
    }
  })
});

var rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    track: {
      type: trackType,
      args: {
        id: { type: GraphQLID }
      },
      description: 'Find track by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/tracks/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    }
  })
});

export var SoundCloudGraphQLSchema = new GraphQLSchema({ query: rootType });
