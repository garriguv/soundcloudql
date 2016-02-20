/* @flow */

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

import UserType from './user';

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
    }
  })
});

export default TrackType;
