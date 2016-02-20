/* @flow */

import http from 'http';
import YAML from 'yamljs';

var environment = YAML.load('.env.yml');

export function apiJSONDataWithPath(path) {
  return new Promise( function (resolve) {
    var pathWithClientId = '';
    if (path.indexOf('?') > -1) {
      pathWithClientId = path + '&client_id=' + environment['client_id'];
    } else {
      pathWithClientId = path + '?client_id=' + environment['client_id'];
    }
    http.get({
      host: 'api.soundcloud.com',
      path: pathWithClientId
    }, function (response) {
      console.log(this.path);
      var body = '';
      response.on('data', function (d) {
        body += d;
      });
      response.on('end', function () {
        resolve(JSON.parse(body));
      });
    });
  });
}
