import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('Search type', function () {
  it('Searches for tracks', function () {
    var query = '{ searchTracks(q: "Boiler Room", limit: 1) { collection { title } }}';
    return soundcloud(query).then(function (result) {
      expect(result.data.searchTracks.collection[0].title).to.equal('Carl Cox 45 min Boiler Room Ibiza Villa Takeovers mix');
    });
  });

  it('Searches for users', function () {
    var query = '{ searchUsers(q: "Eric", limit: 1) { collection { username } }}';
    return soundcloud(query).then(function (result) {
      expect(result.data.searchUsers.collection[0].username).to.equal('Eric Prydz');
    });
  });

  it('Searches for playlists', function () {
    var query = '{ searchPlaylists(q: "Eric", limit: 1) { collection { title } }}';
    return soundcloud(query).then(function (result) {
      expect(result.data.searchPlaylists.collection[0].title).to.equal('Eric Prydz presents EPIC Radio');
    });
  });

  it('Searches for groups', function () {
    var query = '{ searchGroups(q: "Boiler Room", limit: 1) { collection { name } }}';
    return soundcloud(query).then(function (result) {
      expect(result.data.searchGroups.collection[0].name).to.equal('We Love the Boiler Room');
    });
  });
});
