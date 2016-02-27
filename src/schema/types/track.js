import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

import { collectionType } from './collection';

import UserType from './user';
import CommentType from './comment';

var LicenseType = new GraphQLEnumType({
  name: 'License',
  description: 'License under which a track is published',
  values: {
    TO_SHARE: {
      value: 'to_share',
      description: 'to share'
    },
    TO_USE_COMMERCIALLY: {
      value: 'to_use_commercially',
      description: 'to use commercially'
    },
    TO_MODIFY_COMMERCIALLY: {
      value: 'to_modify_commercially',
      description: 'to modify commercially'
    },
    CC_BY: {
      value: 'cc-by',
      description: 'cc by'
    },
    CC_BY_NC: {
      value: 'cc-by-nc',
      description: 'cc by nc'
    },
    CC_BY_ND: {
      value: 'cc-by-nd',
      description: 'cc by nd'
    },
    CC_BY_SA: {
      value: 'cc-by-sa',
      description: 'cc by sa'
    },
    CC_BY_NC_ND: {
      value: 'cc-by-nc-nd',
      description: 'cc by nc nd'
    },
    CC_BY_NC_SA: {
      value: 'cc-by-nc-sa',
      description: 'cc by nc sa'
    }
  }
});

var TrackType = new GraphQLObjectType({
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
      type: UserType,
      description: 'The user who posted the track.',
      resolve: (root) => {
        return JSONDataWithPath('/users/' + root.user_id);
      }
    },
    commentsCollection: collectionType(
      'TrackCommentsCollection',
      CommentType,
      'The comments on the track.',
      {},
      function (root) {
        return '/tracks/' + root.id + '/comments';
      }
    )
  })
});

export {
  TrackType as default,
  TrackType,
  LicenseType
};
