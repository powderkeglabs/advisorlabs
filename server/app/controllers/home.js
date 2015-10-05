var validator = require('validator');
var express = require('express');
var router = express.Router();
var BPromise = require('bluebird');

var db = require('../models');

var Mailer = BPromise.promisifyAll(require('../../config/mail'));


module.exports = function (app) {
  app.use('/api', router);
};

////
router.get('/v1', function (req, res, next) {
  res.send("OK");
});



/// ROUTE TO REQUEST AN ADVISOR
/// @NOTE: enable CORS for this route
router.post('/v1/Request', function(req, res, next){
  var params = req.body;

  if (!params.firstName || !params.lastName)
    return res.status(422).send("First and last name must be specified");

  if (!validator.isEmail(params.email))
    return res.status(422).send("Email not valid");

  if (!params.orgDesc || !params.text)
    return res.status(422).send("Org description and challenges must be specified");

  var object = {
    firstName: validator.escape(params.firstName),
    lastName: validator.escape(params.lastName),
    email: params.email,
    orgDesc: validator.escape(params.orgDesc),
    text: validator.escape(params.text)
  };

  // Save to the DB and send emails;
  db.Requests.create(object).then(function(request){
    // console.log(request);
    return Mailer.requestAdvisorAsync(request);
  }).then(function(sent){
    res.send(sent);
  })
  .catch(function(err){
    res.status(500).send(err);
  });

});


/// ALL OTHER ROUTES NOT SERVED
router.get('/*', function(req, res, next){
  res.sendStatus(404);
});
