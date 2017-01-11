Students = new Mongo.Collection("students");
Events = new Mongo.Collection("events");

var Schemas = {};

Schemas.Students = new SimpleSchema({
	_id: {
		type: SimpleSchema.Integer,
		label: "UFID"
	},
	firstName: {
		type: String,
		label: "First Name",
		max: 20
	},
	lastName: {
		type: String,
		label: "Last Name",
		max: 20
	},
	//TODO: Add UF email parsing
	email: {
		type: String,
		label: "Preferred Email",
		optional: true,
		regEx: SimpleSchema.RegEx.Email
	},
	phone: {
		type: String,
		label: "Contact Phone Number",
		optional: true
	}
});

Schemas.Events = new SimpleSchema({
	organization: {
		type: String,
		label: "Organization Title"
	},
	event: {
		type: String,
		label: "Event Name"
	},
	email:{
		type: String,
		label: "Address to email results to",
		regEx: SimpleSchema.RegEx.Email
	},
	results: {
		type: String,
		label: "Spreadsheet Results",
		optional:true
	},
	attendeesIDs:{
		type: [Object],
		label: "People Attending Event",
		optional: true
	},
	'attendeesIDs.$._id':{
		type: String
	},
	'attendeesIDs.$.timestamp':{
		type: Date
	},
	UFID:{
		type: String,
		label: "Necessary for adding to attendeesIDs",
		optional: true
	}
});
// ;200378128910
// ;203782891010037812891010?
// ;20378189112003781891010?
// ;2003781289010037812891010?
// ;20037828102378189010?
// ;20037812891020378281010?
// ;20037828910120037189101?
// ;203782891012037812891010?
// ;20378891023710?
// ;0812891012037812891010?
// ;2003782891012003781891010?
// ;20037812891012037812891010?
// ;2003781289101203781289110?
// ;2007812810120037812891010?
// ;200378128910120378289110?
// ;00128910237821010?
// ;00378128910203782100?
// ;203781901281010?
// ;2003781289101200381289110?
// ;200378128910003712891010?
// ;200378128910120037812891010?
// ;20037812891020037812891010?
// ;2003781291012003781289101?
// ;20037812910120037812891010?
// ;2007812891012003812891010?
// ;200378128910120037812891010?
// ;200378128910120012891010?
// ;200378129101200378189101?
// ;2003781291012003781891010?
// ;20037812910120037812891010
// ;20037812891012037812891010?
// ;20378128910120037812891010?
// ;20078189102003781291010?
// ;20037812891012003781281010?
// ;00378128910120037812891010?
// ;200781289101203781289110?
// ;200378128910120037812891010?
// ;2003781281012007812891010?
// ;0037812891012003812891010?
// ;2003781289101203781910?
// ;200378128910120037812010?
// ;20037828910203781281010?
// ;20037828910100378289100?


Students.attachSchema(Schemas.Students);
Events.attachSchema(Schemas.Events);
