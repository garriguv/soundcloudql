import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';

import { collectionType } from './collection';
import { LicenseType, TrackType } from './track';
import UserType from './user';

var SearchUsersType = collectionType(
  UserType,
  'user',
  'Search for users on SoundCloud',
  {
    q: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The search query.'
    }
  },
  function (args) {
    return '/users?q=' + encodeURIComponent(args.q);
  });

var SearchTracksType = collectionType(
  TrackType,
  'track',
  'Search for tracks on SoundCloud',
  {
    q: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The search query.'
    },
    tags: {type: new GraphQLList(GraphQLString)},
    genres: {type: new GraphQLList(GraphQLString)},
    bpm: {
      type: new GraphQLInputObjectType({
        name: 'BPM',
        fields: {
          from: {type: new GraphQLNonNull(GraphQLInt) },
          to: { type: new GraphQLNonNull(GraphQLInt) }
        }
      })
    },
    duration: {
      type: new GraphQLInputObjectType({
        name: 'Duration',
        fields: {
          from: {type: new GraphQLNonNull(GraphQLInt) },
          to: { type: new GraphQLNonNull(GraphQLInt) }
        }
      })
    },
    license: { type: LicenseType }
  },
  function (args) {
    let path = '/tracks?q=' + encodeURIComponent(args.q);
    if (args.tags) {
      path += '&tags=' + encodeURIComponent(args.tags.join());
    }
    if (args.genres) {
      path += '&genres=' + args.genres.join();
    }
    if (args.bpm) {
      path += '&bpm[from]=' + args.bpm.from;
      path += '&bpm[to]=' + args.bpm.to;
    }
    if (args.duration) {
      path += '&duration[from]=' + args.duration.from;
      path += '&duration[to]=' + args.duration.to;
    }
    if (args.license) {
      path += '&license=' + args.license;
    }
    return path;
  });

export {
  SearchTracksType as default,
  SearchTracksType,
  SearchUsersType
};
