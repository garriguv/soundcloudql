import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

import { collectionType } from './collection';

import TrackType from './track';
import UserType from './user';

var PlaylistType = new GraphQLObjectType({
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
    createdAt: {
      type: GraphQLString,
      description: 'The creation date of the playlist.',
      resolve: (playlist) => playlist.created_at
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
    tracksCount: {
      type: GraphQLInt,
      description: 'The number of tracks in the playlist.',
      resolve: (playlist) => playlist.track_count
    },
    userConnection: {
      type: new GraphQLNonNull(UserType),
      description: 'The user who posted the playlist.',
      resolve: (root) => {
        return JSONDataWithPath('/users/' + root.user_id);
      }
    },
    tracksCollection: collectionType(
      'PlaylistTracksCollection',
      TrackType,
      'The tracks of the playlist',
      {},
      function (root) {
        return '/playlists/' + root.id + '/tracks';
      }
    )
  })
});

export default PlaylistType;
