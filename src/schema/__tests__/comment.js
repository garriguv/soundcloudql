import { expect } from 'chai';
import { describe, it } from 'mocha';
import { soundcloud } from './soundcloudql';

describe('Comment type', function () {
  it('Gets an object by id', function () {
    var query = `{ comment(id: 264502049) { body }}`;
    return soundcloud(query).then(function (result) {
      expect(result.data.comment.body).to.equal('🙌');
    });
  });

  it('Gets all properties', function () {
    var query = `
{
  comment(id: 264502049) {
    id
    body
    timestamp
    createdAt
    userConnection { username }
    trackConnection { title }
  }
}`;
    var expected = {
      id: '264502049',
      body: '🙌',
      timestamp: 42076,
      createdAt: '2016/01/11 09:59:30 +0000',
      userConnection: { username: 'Eric' },
      trackConnection: { title: 'Electro 1' }
    };
    return soundcloud(query).then(function (result) {
      expect(result.data.comment).to.deep.equal(expected);
    });
  });
});
