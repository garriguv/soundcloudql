import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('Track type', function () {
  it('Gets an object by id', function () {
    var query = '{ track(id: 2) { title }}';
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
    createdAt
    description
    commentCount
    downloadCount
    playbackCount
    likeCount
    permalinkUrl
    streamUrl
    waveformUrl
    artworkUrl
    duration
    license
    userConnection { username }
    commentsCollection(limit: 1) { collection { timestamp } }
  }
}`;
    var expected = {
      id: '2',
      title: 'Electro 1',
      createdAt: '2007/07/21 23:29:05 +0000',
      description: 'This was the first track I did in about 10 minutes to test the logic installation on my new macbook. I only had one sample on the computer at the time…',
      commentCount: 72,
      downloadCount: 4526,
      playbackCount: 27243,
      likeCount: null,
      permalinkUrl: 'http://soundcloud.com/eric/oberholz5',
      streamUrl: 'https://api.soundcloud.com/tracks/2/stream',
      waveformUrl: 'https://w1.sndcdn.com/KcoNolQWb1bB_m.png',
      artworkUrl: null,
      duration: 45760,
      license: null,
      userConnection: { username: 'Eric' },
      commentsCollection: {
        collection: [ { timestamp: 42076 } ]
      }
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.track).to.deep.equal(expected);
    });
  });
});
