var config = require('./config');
var Mandrill = require("mandrill-api");
var MandrillClient = new Mandrill.Mandrill(config.mail_api_key);
var sprintf = require('sprintf-js').sprintf;

var Mailer = {}


/// Send an email to us and a confirmation email to the sender
Mailer.requestAdvisor = function(data, cb){

  var fullName = data.firstName + " " + data.lastName;
  var body = sprintf('From: %s <%s>\nOrg: %s\nMessage: %s\n', fullName, data.email, data.orgDesc, data.text);
	var messageToUs = {
		text: body,
		subject: "New AdvisorLabs Request from " + fullName,
		from_email: data.email,
		from_name: fullName,
		to: [{email: config.contact_email}],
		headers: {
			"Reply-to": data.email
		}
	};


    var messageToThem = {
    text: "Hi " + data.firstName + ",\nYour request for an advisor has been received. We will contact you within 24 hours to continue the matching process.\n\nThanks,\n" + config.contact_name,
    subject: "Confirmation of Advisor Request",
    from_email: config.contact_email,
    from_name: 'Advisor Labs',
    to: [{email: data.email}],
    headers: {
			"Reply-to": config.contact_email
		}
  }

	//Send the messages to us
	MandrillClient.messages.send({"message": messageToUs}, function(sentToUs){
    console.log(sentToUs);

    //Send the messages to them
    MandrillClient.messages.send({"message": messageToThem}, function(sentToThem){
      console.log(sentToThem);
      cb();

    }, function(err){
      return cb("An error occurred while sending email", + err.name + " - " + err.message);
    })

  }, function(err){
    return cb("An error occurred while sending email", + err.name + " - " + err.message);
  });

};

module.exports = Mailer;
