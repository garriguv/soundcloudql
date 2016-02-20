import { graphql } from 'graphql';
import { SoundCloudGraphQLSchema } from '../';

export function soundcloud(query) {
  return graphql(SoundCloudGraphQLSchema, query);
}
