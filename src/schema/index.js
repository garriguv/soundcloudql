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
    },
    permalinkUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The permalink URL of the track.',
      resolve: (track) => track.permalink_url
    },
    streamUrl: {
      type: GraphQLString,
      description: 'The stream URL of the track.',
      resolve: (track) => track.stream_url
    },
    waveformUrl: {
      type: GraphQLString,
      description: 'The waveform URL of the track.',
      resolve: (track) => track.waveform_url
    },
    artworkUrl: {
      type: GraphQLString,
      description: 'The artwork URL of the track.',
      resolve: (track) => track.artwork_url
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the track in milliseconds.',
      resolve: (track) => track.duration
    },
    userConnection: {
      type: userType,
      description: 'The user who posted the track.',
      resolve: (root) => {
        return JSONDataWithPath('/users/' + root.user_id);
      }
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
      description: 'The permalink URL of the user.',
      resolve: (user) => user.permalink_url
    },
    avatarUrl: {
      type: GraphQLString,
      description: 'The avatar URL of the user.',
      resolve: (user) => user.avatar_url
    },
    country: {
      type: GraphQLString,
      description: 'The country of the user.',
      resolve: (user) => user.country
    },
    description: {
      type: GraphQLString,
      description: 'The description of the user.',
      resolve: (user) => user.description
    },
    playlistCount: {
      type: GraphQLInt,
      description: 'The public playlist count of the user.',
      resolve: (user) => user.playlist_count
    },
    trackCount: {
      type: GraphQLInt,
      description: 'The public track count of the user.',
      resolve: (user) => user.track_count
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

var playlistType = new GraphQLObjectType({
  name: 'Playlist',
  description: 'A playlist on SoundCloud.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the playlist.',
      resolve: (playlist) => playlist.id
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the playlist.',
      resolve: (playlist) => playlist.title
    },
    permalinkUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The permalink URL of the playlist.',
      resolve: (playlist) => playlist.permalink_url
    },
    description: {
      type: GraphQLString,
      description: 'The description of the playlist.',
      resolve: (playlist) => playlist.description
    },
    artworkUrl: {
      type: GraphQLString,
      description: 'The artwork URL of the playlist.',
      resolve: (playlist) => playlist.artwork_url
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the playlist in milliseconds.',
      resolve: (playlist) => playlist.duration
    },
    userConnection: {
      type: userType,
      description: 'The user who posted the playlist.',
      resolve: (root) => {
        return JSONDataWithPath('/users/' + root.user_id);
      }
    },
    tracksConnection: {
      type: new GraphQLList(trackType),
      description: 'The tracks in the playlist.',
      resolve: (root) => {
        return root.tracks;
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
    },
    playlist: {
      type: playlistType,
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
    }
  })
});

export var SoundCloudGraphQLSchema = new GraphQLSchema({ query: rootType });
