Template.home.helpers({
	formMode:function(){
		return (Session.get('eventFormMode') || Session.get('studentFormMode'));
	},
	eventFormMode:function(){
		return Session.get('eventFormMode');
	},
	studentFormMode:function(){
		return Session.get('studentFormMode');
	}
});

Template.home.events({
	'click #eventButton':function(e){
		e.preventDefault();
		console.log("EVENT");
		Session.set('eventFormMode', true);

	},
	'click #studentButton':function(e){
		e.preventDefault();
		Session.set('studentFormMode', true);
	},
});

SimpleSchema.debug = true;