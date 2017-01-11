import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('students', function() {
  return Students.find();
});

Meteor.publish('events', function() {
  return Events.find();
});
