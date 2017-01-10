AutoForm.hooks({
	insertStudentForm:{
		onSubmit:function(insert, doc){
			doc._id = CryptoJS.MD5(doc._id.trim()).toString();
			console.log(doc._id);
			console.log(Students.findOne({_id: doc._id}));
			if(Students.findOne({_id: doc._id})){
				console.log("ERR");
				this.done(new Error("You've created an account already"));
			}
			else{
				this.done();
			}
			return false;
		},
		onSuccess:function(insert, doc){
			console.log(doc);
			Session.set('studentFormMode', false);
			return false;
		},
		onError:function(insert, err){
			console.log(err);
			console.log("ERROR");
			Session.set("Failure", err);
			return false;
		}
	},
	insertEventForm:{
		onSubmit:function(doc){
			Meteor.call('insertEventForm', doc);
			this.done();
		},
		onSuccess:function(insert, doc){
			Session.set('eventFormMode', false);
			console.log(this);
			Router.go('eventSignIn', {_id: this.docId});
			//this.done();
			return false;
		},
		onError: function(insert, err){
			//Display custom error that ID has already been used
			Session.set("Form Error", err)
			//this.done();
			return false;
		}
	}
});
