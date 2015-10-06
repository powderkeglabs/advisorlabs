// Example model
module.exports = function (sequelize, DataTypes) {

  var validator = require('validator');

  var Requests = sequelize.define('Requests', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      set: function(val){
        this.setDataValue('firstName', validator.escape(val));
      }
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      set: function(val){
        this.setDataValue('lastName', validator.escape(val));
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    orgDesc: {
      type: DataTypes.TEXT,
      field: 'org_desc',
      set: function(val){
        this.setDataValue('orgDesc', validator.escape(val));
      }
    },
    text: {
      type: DataTypes.TEXT,
      set: function(val){
        this.setDataValue('text', validator.escape(val));
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Requests.hasMany(models.Comments);
      }
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    underscore: true
  });

  return Requests;
};
