Template.signin.helpers({
  'Organization':function(){
    return this.organization;
  },
  'Event':function(){
    return this.event;
  },
  'Success':function(){
    return Session.get("Success");
  },
  'FirstName':function(){
    return Session.get("Success").firstName;
  },
  'Failure':function(){
    return Session.get("Failure");
  },
  'NoAccount':function(){
    return (Session.get("Failure").error == 500);
  },
  'Color':function(){
    if(Session.get("Success")) return 'green';
    var errorCode = Session.get("Failure").error;
    switch (errorCode) {
      case 500:
      return 'red';
      break;
      case 501:
      return 'orange';
      break;
      case 502:
      return 'orange';
      break;
      default:
      return '';
    }
  },
  'ErrorMessage':function(){
    return Session.get("Failure").details;
  }
});

Template.signin.events({
  'submit .export': function(e){
    e.preventDefault();
    Meteor.call('emailCSV', this._id, this._email, function(err, data){
      if(err){
        console.log(err);
      }
      else{
        console.log(data);
      }
    });
  },

  'submit .barcode': function(e){
    e.preventDefault();

    Session.set("Success", null);
    Session.set("Failure", null);

    var scan = e.target.UFID.value;
    var UFID;
//***DISABLING CLIENT SIDE VERIFICATION
    // if(scan.length >= 12){
    //   if(scan.indexOf('=')==-1){
    //       UFID = scan.substr(4,12);
    //   }
    //   else{
    //     //Error to flip over card
    //     console.log("ERRER");
    //     return;
    //   }
    // }
    // else{
    //   //Error bubble to please rescan card
    //   console.log("ERR");
    //   return;
    // }

    //Hash and check on client
    //Perf test here to see if pre running on client would be worthwhile

      Meteor.call('addStudentToEvent',this._id, scan, function(err, data){
        if(err){
          console.log(err);
          Session.set("Failure", err);
          }
        else{
            console.log(data);
            Session.set("Success", data);
          }
      });
    e.target.UFID.value = '';
  }
});
