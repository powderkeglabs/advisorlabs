/**
 * Testing Request Functionality
 */
var chai = require('chai');
var assert = chai.assert;
var supertest = require('supertest-as-promised');
var Chance = require('chance');

var api = supertest.agent('http://localhost:3000/api/v1');

// Request Object
function Request(first, last, email, org, text) {
  var self = this;
  self.firstName = first || new Chance().first();
  self.lastName = last || new Chance().last();
  self.email = email || new Chance().email({domain: 'powderkeg.ca'});
  self.orgDesc = org || new Chance().paragraph();
  self.text = text || new Chance().paragraph();
}



describe("Tests", function(){

  it('Should save a valid request', function(done){
    var request = new Request();
    api.post('/Request').send(request).expect(200, function(err, res){
      if (err) done(err);
      done();
    });
  });

  it('Should not save a invalid request', function(done){
    var request = new Request(null, null, "asdf", null, null);
    api.post('/Request').send(request).expect(200, function(err, res){
      if (!err) done("Saved, not good");
      assert.equal(res.status, 422);
      done();
    });
  });


});
