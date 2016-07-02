Template.team.helpers({
  isEditingTeam: function(){
    return Session.get('editedTeamId') === this._id;
  }
});

Template.team.events({

  'click a.remove': function(e,tpl){
    e.preventDefault();
    Teams.remove(this._id);
  },

  'submit form.form-edit': function(e, tpl) {
    e.preventDefault();
    var self = this;
    var newName = tpl.$('input[name="name"]').val();
    if (newName.length) {
      Teams.update(self._id, {$set:{name:newName}}, function(err) {
        if (!err) {
          // since we denormelize we need to loook in games collection and change the name of the team
          var games = Games.find({_id: {$in: self.gameIds}});

          if (games.count()) {
            _(games.fetch()).each(function(game){
              var team = _(game.teams).findWhere({_id: self._id});
              if (team !== null) {
                team.name = newName;
                Games.update({_id:game._id}, {$set: {teams: game.teams}});
              }
            });
          }
        }
      });
      Session.set('editedTeamId', null);
    }


  },
  'click a.cancel': function(e, tpl) {
    e.preventDefault();
    Session.set('editedTeamId', null);
  },
  'click a.edit': function(e,tpl) {
    e.preventDefault();
    Session.set('editedTeamId', this._id);
  }
});
