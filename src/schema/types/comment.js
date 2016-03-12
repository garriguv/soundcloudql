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
import TrackType from './track';

var CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a SoundCloud track.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The identifier of the comment.',
      resolve: (comment) => comment.id
    },
    body: {
      type: GraphQLString,
      description: 'The body of the comment.',
      resolve: (comment) => comment.body
    },
    timestamp: {
      type: GraphQLInt,
      description: 'The position of the comment on the track in milliseconds.',
      resolve: (comment) => comment.timestamp
    },
    userConnection: {
      type: new GraphQLNonNull(UserType),
      description: 'The user who posted the comment.',
      resolve: (root) => {
        return JSONDataWithPath('/users/' + root.user_id);
      }
    },
    trackConnection: {
      type: new GraphQLNonNull(TrackType),
      description: 'The track the comment is posted on.',
      resolve: (root) => {
        return JSONDataWithPath('/tracks/' + root.track_id);
      }
    }
  })
});

export default CommentType;
