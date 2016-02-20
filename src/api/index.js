/* @flow */

import { apiJSONDataWithPath } from './remote';
import { cacheJSONDataWithPath } from './cache';

export function JSONDataWithPath(path) {
  if (process.env.NODE_ENV === 'test') {
    return cacheJSONDataWithPath(path);
  } else {
    return apiJSONDataWithPath(path);
  }
}
