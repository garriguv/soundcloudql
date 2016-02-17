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
      description: 'The identifier of the track.',
      resolve: (track) => track.id
    },
    title: {
      type: GraphQLString,
      description: 'The title of the track.',
      resolve: (track) => track.title
    }
  })
});

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user on SoundCloud.',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier of the user.',
      resolve: (user) => user.id
    },
    username: {
      type: GraphQLString,
      description: 'The name of the user.',
      resolve: (user) => user.username
    },
    permalinkUrl: {
      type: GraphQLString,
      description: 'The permalink of the user.',
      resolve: (user) => user.permalink_url
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
    },
    user: {
      type: userType,
      args: {
        id: { type: GraphQLID }
      },
      description: 'Find user by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/users/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    }
  })
});

export var SoundCloudGraphQLSchema = new GraphQLSchema({ query: rootType });
