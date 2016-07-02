Meteor.publish('teams', function() {
  return Teams.find({ownerId: this.userId});
  //return Teams.find();
});

Meteor.publish('games', function(){
  return Games.find({ownerId: this.userId});
});
