Teams = new Mongo.Collection('teams');

Teams.allow({
  insert: function(userId, doc) {
    return (userId && doc.ownerId === userId);
  },
  update: function(userId, doc) {
    return (doc.ownerId === userId);
  },
  remove: function(userId, doc) {
    return (doc.ownerId === userId);
  },
  fetch: ['ownerId']
});

Meteor.methods({
  teamUpdate: (teamId, newName) => {
    check(Meteor.userId(), String);
     check(teamId, String);
     check(newName, String);

     var team = Teams.findOne(teamId);
     if (team) {
       Teams.update({_id:teamId}, {$set:{
         name: newName
       }}, function(err, response) {
         if (!err) {
           if (team.gameIds) {
              var games = Games.find({"_id":{$in: team.gameIds}});
              games.fetch().forEach(function(game){
                game.teams.map(function(team){
                  if (team._id === teamId) {
                    team.name = newName;
                  }
                  Games.update({_id:game._id}, {$set:{teams: game.teams}});

                });
              });
           }
           return teamId;
         }
      });
    } else {
      throw new Meteor.Error("team-does-not-exists", "This team doesnt exists in db");
    }

  }
});
