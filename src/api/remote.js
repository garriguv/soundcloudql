import http from 'http';

export function apiJSONDataWithPath(path) {
  return new Promise( function (resolve) {
    var pathWithClientId = '';
    if (path.indexOf('?') > -1) {
      pathWithClientId = path + '&client_id=' + process.env.CLIENT_ID;
    } else {
      pathWithClientId = path + '?client_id=' + process.env.CLIENT_ID;
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
