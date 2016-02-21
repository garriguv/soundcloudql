import { apiJSONDataWithPath } from './remote';

import {
  writeFile,
  readFile
} from 'fs';

var cachePath = 'src/api/cache.json';

function JSONCache() {
  return new Promise( function (resolve, reject) {
    console.error('JSONCache cachePath: ' + cachePath);
    readFile(cachePath, 'utf8', function (err, data) {
      if (err) {
        console.error('JSONCache error: ' + err);
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

function replaceStoredCache(cache) {
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
    return replaceStoredCache(cache).then(function () {
      return json;
    });
  });
}

export function cacheJSONDataWithPath(path) {
  var cleanPath = path.replace('[?&]client_id=.*$', '');
  return JSONCache()
    .then(function (cache) {
      if (cache[cleanPath]) {
        console.error('Cache hit for "' + cleanPath + '"');
        return cache[cleanPath];
      }
      console.error('No cache for "' + cleanPath + '". Fetching remotely...');
      return fetchRemoteJSONThenCacheIt(path, cleanPath, cache);
    }).catch(console.log.bind(console));
}
