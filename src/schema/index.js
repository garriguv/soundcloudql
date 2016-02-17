/* @flow */

import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} from 'graphql';

import {
  JSONDataWithPath
} from '../api';

var trackType = new GraphQLObjectType({
  name: 'Track',
  description: 'A track on SoundCloud.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the track.',
      resolve: (track) => track.id
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
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
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the user.',
      resolve: (user) => user.id
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the user.',
      resolve: (user) => user.username
    },
    permalinkUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The permalink of the user.',
      resolve: (user) => user.permalink_url
    },
    tracksConnection: {
      type: new GraphQLList(trackType),
      args: {
        limit: { type: GraphQLInt }
      },
      description: 'The public tracks of the user.',
      resolve: (root, args) => {
        return JSONDataWithPath(
          '/users/' + root.id +
          '/tracks?limit=' + args.limit);
      }
    }
  })
});

var rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    track: {
      type: trackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
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
        id: { type: new GraphQLNonNull(GraphQLID) }
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
