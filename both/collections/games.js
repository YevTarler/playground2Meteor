Games = new Mongo.Collection('games');

Games.allow({
  insert : (userId, doc) => {
    return (userId && doc.ownerId === userId);
  },
  update : (userId, doc) => {
    return doc.ownerId === userId;
  },
  remove : (userId, doc) => {
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});
