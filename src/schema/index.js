import {
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  JSONDataWithPath
} from '../api';

import TrackType from './types/track';
import UserType from './types/user';
import PlaylistType from './types/playlist';
import CommentType from './types/comment';

var rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    track: {
      type: TrackType,
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
    tracks: {
      type: new GraphQLList(TrackType),
      args: {
        q: {type: new GraphQLNonNull(GraphQLString)},
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
      },
      description: 'Search for tracks',
      resolve: (_, args) => {
        let path = '/tracks?q=' + encodeURIComponent(args.q);
        if (args.tags) {
          path += "&tags=" + encodeURIComponent(args.tags.join());
        }
        if (args.genres) {
          path += "&genres=" + args.genres.join();
        }
        if (args.bpm) {
          path += "&bpm[from]=" + args.bpm.from;
          path += "&bpm[to]=" + args.bpm.to;
        }
        if (args.duration) {
          path += "&duration[from]=" + args.duration.from;
          path += "&duration[to]=" + args.duration.to;
        }
        return JSONDataWithPath(path);
      }
    },
    user: {
      type: UserType,
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
    },
    users: {
        type: new GraphQLList(UserType),
        args: {
          q: { type: new GraphQLNonNull(GraphQLString) }
        },
        description: 'Search for users',
        resolve: (_, args) => {
            return JSONDataWithPath('/users?q=' + args.q);
        }
    },
    playlist: {
      type: PlaylistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find playlist by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/playlists/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    },
    comment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find comment by id',
      resolve: (_, args) => {
        if (args.id !== undefined && args.id !== null) {
          return JSONDataWithPath('/comments/' + args.id);
        } else {
          throw new Error('must provide id');
        }
      }
    }
  })
});

export var SoundCloudGraphQLSchema = new GraphQLSchema({ query: rootType });
