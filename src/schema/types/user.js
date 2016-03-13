import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import { collectionType } from './collection';

import TrackType from './track';
import PlaylistType from './playlist';
import CommentType from './comment';
import GroupType from './group';

var UserType = new GraphQLObjectType({
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
    city: {
      type: GraphQLString,
      description: 'The city of the user.',
      resolve: (user) => user.city
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
    followersCount: {
      type: GraphQLInt,
      description: 'The number of followers of the user.',
      resolve: (user) => user.followers_count
    },
    followingsCount: {
      type: GraphQLInt,
      description: 'The number of followings of the user.',
      resolve: (user) => user.followings_count
    },
    postedTracksCollection: collectionType(
      'UserPostedTracksCollection',
      TrackType,
      'The public tracks of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/tracks';
      }
    ),
    postedPlaylistsCollection: collectionType(
      'UserPostedPlaylistsCollection',
      PlaylistType,
      'The public playlists of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/playlists';
      }
    ),
    likedTracksCollection: collectionType(
      'UserLikedTracksCollection',
      TrackType,
      'The liked tracks of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/favorites';
      }
    ),
    commentsCollection: collectionType(
      'UserCommentsCollection',
      CommentType,
      'The public comments of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/comments';
      }
    ),
    followersCollection: collectionType(
      'UserFollowersCollection',
      UserType,
      'The followers of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/followers';
      }
    ),
    followingsCollection: collectionType(
      'UserFollowingsCollection',
      UserType,
      'The followings of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/followings';
      }
    ),
    groupsCollection: collectionType(
      'UserGroupsCollection',
      GroupType,
      'The groups of the user.',
      {},
      function (root) {
        return '/users/' + root.id + '/groups';
      }
    )
  })
});


export default UserType;
