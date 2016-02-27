import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('Search type', function () {
  it('Can search tracks', function () {
    var query = `{ searchTracks(query: "Boiler Room") { title }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.searchTracks[0].title).to.equal('Carl Cox 45 min Boiler Room Ibiza Villa Takeovers mix');
    });
  });
});
