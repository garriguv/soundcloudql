/* @flow */

import http from 'http';

import YAML from 'yamljs';

var environment = YAML.load('.env.yml');

export function JSONDataWithPath(path) {
  var promise = new Promise(
    function (resolve) {
      http.get({
        host: 'api.soundcloud.com',
        path: path + '?client_id=' + environment['client_id']
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
    }
  );
  return promise;
}
