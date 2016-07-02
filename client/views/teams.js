Template.teams.helpers({
  isCreatingTeam: function() {
    return Session.get('isCreatingTeam');
  },
  teams: function() {
    return Teams.find();
  }
});

Template.teams.events({
  'submit form.create-team': function(e, tpl){
      e.preventDefault();

      var team = {
        name: tpl.$('input[name=name]').val(),
        ownerId: Meteor.userId()
      };

      Teams.insert(team, function(error, _id){
        if (error) {
          alert(error);
          Session.set('isCreatingTeam', true);
          Tracker.afterFlush(function(){
            if (teamName != null) {
              tpl.$('input[name=name]').val(teamName);
            }
          });
        }
      });
      Session.set('isCreatingTeam', false);
  },
  'click a.cancel': function(e,tpl){
      e.preventDefault();
      Session.set('isCreatingTeam', false);
  },
  'click a.create': function(e,tpl){
      e.preventDefault();
      Session.set('isCreatingTeam', true);
  },

});
