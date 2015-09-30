// Example model


module.exports = function (sequelize, DataTypes) {

  var Requests = sequelize.define('Requests', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: DataTypes.STRING,
    orgDesc: {
      type: DataTypes.TEXT,
      field: 'org_desc'
    },
    text: DataTypes.TEXT
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
