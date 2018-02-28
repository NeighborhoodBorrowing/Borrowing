module.exports = function(sequelize, DataTypes) {
  var MemberItems = sequelize.define("MemberItems",
  {
    //will have an id by default
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture:{
      type: DataTypes.STRING,
      allowNull:true
    },
    value: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    addedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
      timestamps:false
    });

  MemberItems.associate = function (models) {
     models.MemberItems.belongsTo(models.Members, {
       as: "owner", //the word "id" will be added at the end of the name automatically
       onDelete: "CASCADE",
       foreignKey: {
         allowNull: false
       }
     });


    models.MemberItems.belongsTo(models.Categories, {
      as: "category", //the word "id" will be added at the end of the name automatically
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

     models.MemberItems.hasMany(models.BorrowedItems, {foreignKey:"itemId"});
   };

  return MemberItems;
};
