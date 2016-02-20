import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('Playlist type', function () {
  it('Gets an object by id', function () {
    var query = `{ playlist(id: 6584580) { title }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.playlist.title).to.equal('Quarters');
    });
  });

  it('Gets all properties', function () {
    var query = `
{
  playlist(id: 6584580) {
    id
    title
    permalinkUrl
    description
    artworkUrl
    duration
    userConnection { username }
    tracksConnection { title }
  }
}`;
    var expected = {
      id: '6584580',
      title: 'Quarters',
      permalinkUrl: 'http://soundcloud.com/seams/sets/quarters',
      description: 'My first full-length album, released by Full Time Hobby; available on vinyl, CD, and download.\r\n\r\nPurchase the album from Bleep.com and get an exclusive set of postcards showcasing the 4 locations the album was made.\r\n\r\nhttps://bleep.com/release/45240-seams-quarters',
      artworkUrl: 'https://i1.sndcdn.com/artworks-000052432909-2isoof-large.jpg',
      duration: 2397683,
      userConnection: { username: 'Seams' },
      tracksConnection: [
        { title: 'ClapOne' },
        { title: 'Constants' },
        { title: 'Pocket' },
        { title: 'Sitcom Apartment' },
        { title: 'Iceblerg' },
        { title: 'Hurry Guests' },
        { title: 'Rilo' },
        { title: 'TXL' }
      ]
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.playlist).to.deep.equal(expected);
    });
  });
});
