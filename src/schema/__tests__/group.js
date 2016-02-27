import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

/* eslint-disable max-len */

describe('Group type', function () {
  it('Gets an object by id', function () {
    var query = `{ group(id: 3) { name }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.group.name).to.equal('Made with Ableton Live!');
    });
  });

  it('Gets all properties', function () {
    var query = `
{
  group(id: 3) {
    id
    name
    description,
    creatorConnection { username }
    usersCollection(limit: 1) { collection { username } }
    moderatorsCollection(limit: 1) { collection { username } }
    membersCollection(limit: 1) { collection { username } }
    contributorsCollection(limit: 1) { collection { username } }
    tracksCollection(limit: 1) { collection { title } }
  }
}`;
    var expected = {
      id: '3',
      name: 'Made with Ableton Live!',
      description: 'send your tracks, no DJ mixes please!',
      creatorConnection: { username: 'Ableton' },
      usersCollection: { collection: [ { username: 'bridges' } ] },
      moderatorsCollection: { collection: [ { username: 'Ableton' } ] },
      membersCollection: { collection: [ { username: 'bridges' } ] },
      contributorsCollection: { collection: [ { username: 'bridges' } ] },
      tracksCollection: { collection: [ { title: 'Colours ft. Veronika Wildova' } ] }
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.group).to.deep.equal(expected);
    });
  });
});
