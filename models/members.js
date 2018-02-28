module.exports = function(sequelize, DataTypes) {
  var Members = sequelize.define("Members",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    zipCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 0
    },
    joinDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
      timestamps:false
    });

  Members.associate = function(models){
    models.Members.hasMany(models.MemberItems, {foreignKey: "ownerId"});
    models.Members.hasMany(models.BorrowedItems, {foreignKey: "borrowerId"});
  }

  return Members;
};
