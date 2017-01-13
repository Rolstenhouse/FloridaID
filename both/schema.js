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

Students.attachSchema(Schemas.Students);
Events.attachSchema(Schemas.Events);
