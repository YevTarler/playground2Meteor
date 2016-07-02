

Template.games.helpers({
  games: function(){
     return Games.find();
  },
  teams: function(){
    return Teams.find();
  },
  isCreatingGame: function(){
    return Session.get('isCreatingGame');
  }
});

Template.games.events({
  'click a.create': function(e, tmpl) {
    e.preventDefault();
    Session.set('isCreatingGame',true);
  },
  'click a.cancel': function(e, tmpl) {
    e.preventDefault();
    Session.set('isCreatingGame', false);
  },
  'submit form.form-create': function(e, tmpl) {
    e.preventDefault();
    var team1 = {
      _id:tmpl.$('select[name="teamOne"]').val(),
      name:tmpl.$('select[name="teamOne"] option:selected').text(),
      score: 0
    };

    var team2 = {
      _id:tmpl.$('select[name="teamTwo"]').val(),
      name:tmpl.$('select[name="teamTwo"] option:selected').text(),
      score: 0
    };

    var game = {
      completed: false,
      ownerId: Meteor.userId(),
      createdAt: new Date(),
      teams: [team1, team2]
    };

    var gameId = Games.insert(game);
    Teams.update({_id:team1._id}, {$addToSet:{gameIds:gameId}});
    Teams.update({_id:team2._id}, {$addToSet:{gameIds: gameId}});

    Session.set('isCreatingGame', false);

  }
});
