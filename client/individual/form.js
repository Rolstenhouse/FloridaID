Template.individualForm.helpers({
  'Failure': function(){
    return Session.get("Failure", err);
  }
});

SimpleSchema.debug = true;
