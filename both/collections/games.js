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

Meteor.methods({
     gamesInsert : (teamOneId, teamTwoId) => {
       check(Meteor.userId(), String);
       check(teamOneId, String);
       check(teamTwoId, String);

       var teamOne = Teams.findOne({_id:teamOneId, ownerId: Meteor.userId()});
       var teamTwo = Teams.findOne({_id:teamTwoId, ownerId: Meteor.userId()});

       var teamOneData = {
         _id: teamOne._id,
         name: teamOne.name,
         score: 0
       };
       var teamTwoData = {
         _id: teamTwo._id,
         name: teamTwo.name,
         score: 0
       };
       var game = {
         ownerId: Meteor.userId(),
         completed: false,
         teams: [teamOneData, teamTwoData]
       };

       var gameId = Games.insert(game);

       Teams.update({_id:teamOne._id}, {$addToSet:{
         gameIds: gameId
       }});
       Teams.update({_id:teamTwo._id}, {$addToSet:{
         gameIds: gameId
       }});

       return gameId;
  }
});
