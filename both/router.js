Router.configure({
  layoutTemplate:'layout',
  loadingTemplate: 'loading'
});

Router.route('/',
{name: 'games',
waitOn :() => {
  return [Meteor.subscribe("games"), Meteor.subscribe("teams")];
}
});
Router.route('/teams',{
waitOn :() => {
  return  Meteor.subscribe("teams");
}}
);

var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render("loading");
    } else {
      this.render("accessDenied");
    }
  }
  else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin);
