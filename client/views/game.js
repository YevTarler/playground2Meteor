
Template.game.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.game.events({
  "click a.score": function(event, template){
     event.preventDefault();
     var data = $(event.currentTarget).data();
     var selector = "teams." + data.index + ".score";
     var update = {$inc:{}};

     update.$inc[selector] = data.inc;

     Games.update({_id:this._id}, update);

  },
  "click a.finish-game": function(event, template){
    event.preventDefault();
    Games.update({_id:this._id},{$set:
      {completed:true}
    });
  },
  "click a.delete-game": function(event, template){
    event.preventDefault();
    var gameId  = this._id;
    var teamIdA = this.teams[0]._id;
    var teamIdB = this.teams[1]._id;
    Games.remove(gameId, function(err){
      if (!err) {
          Teams.update({_id:teamIdB}, {$pull:{gameIds: gameId}});
          Teams.update({_id:teamIdA}, {$pull:{gameIds: gameId}});
      }

    });

  }
});
