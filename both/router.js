Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', function(){
	this.render('home');
});

Router.route('/events/:_id', function(){
	var event = Events.findOne({_id: this.params._id});
	this.render('signin', {data: event});
	},{
		name:'eventSignIn'
});

Router.route('/register', function(){
	this.render('registrationLayout');
});

Router.route('/register/me', function(){
	
});

Router.route('register/event', function(){

});