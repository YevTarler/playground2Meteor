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
      Meteor.call("teamUpdate", this._id, newName, function(error, result){
        if(error){
          alert(error.reason);
          Session.set("editedTeamId", self._id);
          Tracker.afterFlush(function(){
             tpl.$('input[name="name"]').val(newName);
             tpl.$('input[name="name"]').focus();
          });
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
