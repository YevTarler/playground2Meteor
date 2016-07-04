Meteor.startup(function() {
  var dummyUserEmail = 'test@test.com';

  //Teams.find().count() === 0
  if(Meteor.users.find({"emails.address":dummyUserEmail}).count() === 0)
   {

    var ownerId = Accounts.createUser({
      email:dummyUserEmail,
      password: '123456'
    });

    [
      {
        name: "Barca",
        gameIds: [],
        ownerId: ownerId
      },
      {
        name: "Real M",
        gameIds: [],
        ownerId: ownerId
      },
      {
        name: "Man utd",
        gameIds: [],
        ownerId: ownerId
      },
      {
        name: "Yevz team",
        gameIds: [],
        ownerId: ownerId
    }
    ].forEach(function(team){
      Teams.insert(team);
    });

    var team1 = Teams.find().fetch()[0];
    var team2 = Teams.find().fetch()[1];

      var game = {
        completed: false,
        ownerId: ownerId,
        teams: [
          {name: team1.name, _id:team1._id, scrore:0},
          {name: team2.name, _id:team2._id, scrore:0}
        ]
      };
      var gameId = Games.insert(game);
      Teams.update({_id:team1._id}, {$addToset:
        {gameIds: gameId}
      });
      Teams.update({_id:team2._id}, {$addToset:
        {gameIds: gameId}
      });
  }

});
