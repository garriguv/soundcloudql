import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import {
  JSONDataWithPath
} from '../../api';

export function collectionType(
  name, type, description, pathArgs, constructPath) {
  return {
    type: new GraphQLObjectType({
      name: name,
      fields: {
        collection: {
          type: new GraphQLList(type)
        },
        next: {
          type: GraphQLString,
          description: 'The next page cursor.',
          resolve: (root) => {
            return root.next_href;
          }
        }
      }
    }),
    args: argsWithDefaultCollectionArgs(pathArgs),
    description: description,
    resolve: (_, args) => {
      if (args.next) {
        return JSONDataWithPath(args.next);
      }
      var path = constructPath(_, args);
      if (path.indexOf('?') > -1) {
        path += '&linked_partitioning=1';
      } else {
        path += '?linked_partitioning=1';
      }
      if (args.limit) {
        path += '&limit=' + args.limit;
      }
      return JSONDataWithPath(path);
    }
  };
}

function argsWithDefaultCollectionArgs(additionalArgs) {
  var args = {};
  Object.keys(additionalArgs).forEach(function (key) {
    args[key] = additionalArgs[key];
  });
  args.limit = {
    type: GraphQLInt,
    description: 'The number of items returned. Default 50, maximum 200.'
  };
  args.next = {
    type: GraphQLString,
    description: 'The next page cursor.'
  };
  return args;
}
