import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('User type', function () {
  it('Gets an object by id', function () {
    var query = `{ user(id: 2) { username }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.user.username).to.equal('Eric');
    });
  });

  it('Gets all properties', function () {
    var query = `
{
  user(id: 2) {
    id
    username
    permalinkUrl
    avatarUrl
    country
    city
    description
    playlistCount
    trackCount
    tracksCollection(limit:1) { collection { title } }
    commentsCollection(limit:1) { collection { body } }
  }
}`;
    var expected = {
      id: '2',
      username: 'Eric',
      permalinkUrl: 'http://soundcloud.com/eric',
      avatarUrl: 'https://i1.sndcdn.com/avatars-000153316546-tqxejr-large.jpg',
      country: 'Germany',
      city: 'Berlin',
      description: 'Founder/CTO SoundCloud.\r\nMusician under the alias http://soundcloud.com/forss',
      playlistCount: 20,
      trackCount: 154,
      tracksCollection: {
        collection: [ { title: 'Obama\'s 2013 Berlin Speech at Pariser Platz' } ]
      },
      commentsCollection: {
        collection: [ { body: '🙌' } ]
      }
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.user).to.deep.equal(expected);
    });
  });
});
