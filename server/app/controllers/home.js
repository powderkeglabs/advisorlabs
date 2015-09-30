var validator = require('validator');
var express = require('express');
var router = express.Router();
var db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

////
router.get('/api/v1/', function (req, res, next) {
  res.send("OK");
});



//// ROUTE TO REQUEST AN ADVISOR
router.post('/api/v1/Request', function(req, res, next){
  var params = req.body;

  if (!params.firstName || !params.lastName)
    return res.status(422).send("First and last name must be specified");

  if (!validator.isEmail(params.email))
    return res.status(422).send("Email not valid");

  if (!params.orgDesc || !params.text)
    return res.status(422).send("Org description and challenges must be specified");

  var object = {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    orgDesc: validator.escape(params.orgDesc),
    text: validator.escape(params.text)
  };

  // Save to the DB
  // @TODO: Send email to both parties
  db.Requests.create(object).then(function(request){
    res.send(request);
  }).catch(function(err){
    res.status(500).send(err);
  });

});


/// ALL OTHER ROUTES NOT SERVED
router.get('/*', function(req, res, next){
  res.sendStatus(404);
});
