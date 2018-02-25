module.exports = function(sequelize, DataTypes) {
  var MemberItems = sequelize.define("MemberItems", {
    //will have an id by default
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
  });

  MemberItems.associate = function (models) {
     models.MemberItems.belongsTo(models.Members, {
       as: "owner", //the word "id" will be added at the end of the name automatically
       onDelete: "CASCADE",
       foreignKey: {
         allowNull: false
       }
     });

     models.MemberItems.hasMany(models.BorrowedItems, {foreignKey:"itemId"});
   };

  return MemberItems;
};
