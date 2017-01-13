AutoForm.hooks({
	insertStudentForm:{
		before:{
			insert:function(doc){
			doc._id = CryptoJS.MD5(doc._id.trim()).toString();
			return doc;
		}}, //Refactor later
		onSubmit:function(insertDoc){
			console.log('BEFORE CRYPTO', insertDoc._id);
			insertDoc._id = CryptoJS.MD5(insertDoc._id.trim()).toString();
			console.log('AFTER CRYPTO',insertDoc._id);
			console.log(Students.findOne({_id: insertDoc._id}));
			if(Students.findOne({_id: insertDoc._id})){
				console.log("ERR");
				this.done(new Error("You've created an account already"));
			}
			else{
				return insertDoc;
				this.done();
			}
			return false;
		},
		onSuccess:function(insertDoc, result){

			Session.set('studentFormMode', false);
			return false;
		},
		onError:function(insertDoc, error){
			console.log(insertDoc);
			console.log("ERROR");
			Session.set("Failure", insertDoc);
			return false;
		}
	}
});
