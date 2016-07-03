

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
    var teamOneId = tmpl.$('select[name="teamOne"]').val();
    var teamTwoId = tmpl.$('select[name="teamTwo"]').val();

    Meteor.call("gamesInsert", teamOneId, teamTwoId, function(error, result){
      if(error){
        alert(error.reason);
        Session.set('isCreatingGame', true);
        Tracker.afterFlush(function(){
           tmpl.$('select[name="teamOne"]').val(teamOneId);
           tmpl.$('select[name="teamTwo"]').val(teamTwoId);
        });
      }
    });
    Session.set('isCreatingGame', false);

  }
});
