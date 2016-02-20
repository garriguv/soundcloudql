import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

describe('Track type', function () {
  it('Gets an object by id', function () {
    var query = `{ track(id: 2) { title }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.track.title).to.equal('Electro 1');
    });
  });

  it('Gets all properties', function () {
    var query = `
{
  track(id: 2) {
    id
    title
    permalinkUrl
    streamUrl
    waveformUrl
    artworkUrl
    duration
    userConnection { username }
    commentsConnection(limit: 1) { timestamp }
  }
}`;
    var expected = {
      id: '2',
      title: 'Electro 1',
      permalinkUrl: 'http://soundcloud.com/eric/oberholz5',
      streamUrl: 'https://api.soundcloud.com/tracks/2/stream',
      waveformUrl: 'https://w1.sndcdn.com/KcoNolQWb1bB_m.png',
      artworkUrl: null,
      duration: 45760,
      userConnection: { username: 'Eric' },
      commentsConnection: [ { timestamp: 42076 } ]
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.track).to.deep.equal(expected);
    });
  });
});
