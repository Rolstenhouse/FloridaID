//funciton to run before adding ID to database

Meteor.methods({
    'hashID':function(id){
      console.log(id);
      if(id.length === 8){
        console.log(CryptoJS.MD5(id).toString());
        return CryptoJS.MD5(id).toString();
      }
      else {return false;}
    },

    'insertStudentForm':function(doc){
      doc._id = CryptoJS.MD5(doc._id).toString();
      Students.insert(doc);
    },

    'insertEventForm':function(doc){
      Events.insert(doc);
    },

    'emailCSV':function(eventId, email){
      this.unblock();
      var csv = Meteor.call('exportEventToCSV', eventId);
      var attachment = [{
          fileName: 'test.csv',
          contents: csv
      }];
      this.unblock();
      Email.send({
        to: email,
        subject: 'FloridaID CSV',
        text: 'Attached is your recent event csv. At an overview: ',
        attachments: attachment
      });
    },

    'exportEventToCSV':function(eventId){
      var event = Events.findOne({_id: eventId});
      //console.log(event);
      var attendees = "";
      if(event.attendeesIDs == null){
        console.log("Nothing to export");
        return null;
      }

      var attendees = event.attendeesIDs.map(function(x){
        var student = Students.findOne({_id: x._id});
        //Currently only taking one factor and merging it
        student.timestamp = x.timestamp;
        return student;
      })
      console.log("ATTENDEES",attendees);

      var csv = Papa.unparse(attendees);
      console.log("CSV",csv);
      return csv;
    },

    'addStudentToEvent':function(eventId, scan){
      //Passing over array value
      var student = Meteor.call('verifyID',scan);
      //Adding into event information
      if(student){
        //Write to avoid duplicate entry (No error processing)
        //Update time stamp in table as well
        Events.update({_id: eventId},{$addToSet: {attendeesIDs: {_id: student._id, timestamp: new Date()}}}, function(err,data){
          console.log(err);
          console.log(data);
        });
      }
      return student;
    },
    'verifyID':function(scan){
      //Write equivalent on the client as well.
      //Validation necessary on second part as well
      if(scan.indexOf('=')==-1){
        if(scan.length >= 25 && scan.substr(4,8)==scan.substr(17,8)){
            UFID = scan.substr(4,8);

        }
        else{
          throw new Meteor.Error(502, 'Error 502: Card not read properly', 'Please carefully rescan the card. Facing exactly the same as before');

        }
      }
      else{
        throw new Meteor.Error(501, 'Error 501: Card not read properly', 'Flip the card over to rescan');
      }
      console.log(scan);
      console.log(UFID);
      var hashId = CryptoJS.MD5(UFID).toString();
      //Now check if the given id is in the database
      student = Students.findOne({_id: hashId}, {fields: {'firstName' : 1}});
      if(student){
        //Returning just the first name right now
        console.log(student);
        return student;
      }
      throw new Meteor.Error(500, 'Error 500: Student not in database', 'Please register for an account');
    }
});
