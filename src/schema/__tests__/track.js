import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

describe('Track type', function () {
  it('Gets an object by id', function () {
    var query = `{ track(id: 2) { title }}`;
    return soundcloud(query).then(function (result) {
      return expect(result.data.track.title).to.equal('Electro 1');
    });
  });
});
