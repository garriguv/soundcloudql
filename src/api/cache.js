/* @flow */

import { apiJSONDataWithPath } from './remote';

import {
  writeFile,
  readFile
} from 'fs';

var cachePath = 'src/api/cache.json';

function cachedJSON() {
  return new Promise( function (resolve, reject) {
    readFile(cachePath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

function storeCache(cache) {
  return new Promise( function (resolve, reject) {
    writeFile(cachePath, JSON.stringify(cache, null, '  '), function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function fetchRemoteJSONThenCacheIt(path, cleanPath, cache) {
  return apiJSONDataWithPath(path).then(function (json) {
    cache[cleanPath] = json;
    return storeCache(cache).then(function () {
      return json;
    });
  });
}

export function cacheJSONDataWithPath(path) {
  var cleanPath = path.replace('[?&]client_id=.*$', '');
  return cachedJSON()
    .then(function (cache) {
      if (cache[cleanPath]) {
        return cache[cleanPath];
      }
      return fetchRemoteJSONThenCacheIt(path, cleanPath, cache);
    }).catch(console.log.bind(console));
}
