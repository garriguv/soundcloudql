import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('User type', function () {
  it('Gets an object by id', function () {
    var query = '{ user(id: 2) { username }}';
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
    followersCount
    followingsCount
    postedTracksCollection(limit:1) { collection { title } }
    postedPlaylistsCollection(limit: 1) { collection { title } }
    likedTracksCollection(limit:1) { collection { title } }
    commentsCollection(limit:1) { collection { body } }
    followersCollection(limit:1) { collection { username } }
    followingsCollection(limit:1) { collection { username } }
    groupsCollection(limit:1) { collection { name } }
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
      followersCount: 44654,
      followingsCount: 1654,
      postedTracksCollection: { collection: [ { title: 'Obama\'s 2013 Berlin Speech at Pariser Platz' } ] },
      postedPlaylistsCollection: { collection: [ { title: 'Show favorites' } ] },
      likedTracksCollection: { collection: [ { title: 'Javi Frias - Red Bull Mix' } ] },
      commentsCollection: { collection: [ { body: '🙌' } ] },
      followersCollection: { collection: [ { username: 'viktiria' }] },
      followingsCollection: { collection: [ { username: 'Florence + The Machine' }] },
      groupsCollection: { collection: [ { name: 'MINIMAL TECHNO' }] }
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.user).to.deep.equal(expected);
    });
  });
});
