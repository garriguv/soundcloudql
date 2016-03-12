import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

import { collectionType } from './collection';

import UserType from './user';
import TrackType from './track';

var GroupType = new GraphQLObjectType({
  name: 'Group',
  description: 'A group on SoundCloud.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the group.',
      resolve: (group) => group.id
    },
    name: {
      type: GraphQLString,
      description: 'The name of the group.',
      resolve: (group) => group.name
    },
    description: {
      type: GraphQLString,
      description: 'The description of the group.',
      resolve: (group) => group.description
    },
    createdAt: {
      type: GraphQLString,
      description: 'The creation date of the group.',
      resolve: (group) => group.created_at
    },
    creatorConnection: {
      type: new GraphQLNonNull(UserType),
      description: 'The creator of the group.',
      resolve: (root) => {
        return JSONDataWithPath('/users/' + root.creator.id);
      }
    },
    usersCollection: collectionType(
      'GroupUsersCollection',
      UserType,
      'The users who contributed to, joined or moderate the group.',
      {},
      function (root) {
        return '/groups/' + root.id + '/users';
      }
    ),
    moderatorsCollection: collectionType(
      'GroupModeratorsCollection',
      UserType,
      'The users who moderate the group.',
      {},
      function (root) {
        return '/groups/' + root.id + '/moderators';
      }
    ),
    membersCollection: collectionType(
      'GroupMembersCollection',
      UserType,
      'The users who joined the group.',
      {},
      function (root) {
        return '/groups/' + root.id + '/members';
      }
    ),
    contributorsCollection: collectionType(
      'GroupContributorsCollection',
      UserType,
      'The users who contributed a track to the group.',
      {},
      function (root) {
        return '/groups/' + root.id + '/contributors';
      }
    ),
    tracksCollection: collectionType(
      'GroupTracksCollection',
      TrackType,
      'The list of contributed and approved tracks.',
      {},
      function (root) {
        return '/groups/' + root.id + '/tracks';
      }
    )
  })
});

export default GroupType;
