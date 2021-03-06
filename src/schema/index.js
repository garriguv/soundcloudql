import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import {
  JSONDataWithPath
} from '../api';

import TrackType from './types/track';
import UserType from './types/user';
import PlaylistType from './types/playlist';
import CommentType from './types/comment';
import GroupType from './types/group';
import {
  SearchTracksType,
  SearchPlaylistsType,
  SearchGroupsType,
  SearchUsersType
} from './types/search';

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
    },
    group: {
      type: GroupType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      description: 'Find group by id',
      resolve: (_, args) => {
        return JSONDataWithPath('/groups/' + args.id);
      }
    },
    searchTracks: SearchTracksType,
    searchPlaylists: SearchPlaylistsType,
    searchGroups: SearchGroupsType,
    searchUsers: SearchUsersType
  })
});

export var SoundCloudGraphQLSchema = new GraphQLSchema({ query: rootType });
