import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('Search type', function () {
  it('Searches for tracks', function () {
    var query = `{ searchTracks(q: "Boiler Room") { title }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.searchTracks[0].title).to.equal('Carl Cox 45 min Boiler Room Ibiza Villa Takeovers mix');
    });
  });

  it('Searches for users', function () {
    var query = `{ searchUsers(q: "Eric") { username }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.searchUsers[0].username).to.equal('Eric Prydz');
    });
  });
});