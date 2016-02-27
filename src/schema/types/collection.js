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
  type, typeName, description, pathArgs, constructPath) {
  return {
    type: new GraphQLObjectType({
      name: type.name + 'Collection',
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
      var path = constructPath(args);
      if (args.limit) {
        path += '&limit=' + args.limit;
      }
      path += '&linked_partitioning=1';
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
