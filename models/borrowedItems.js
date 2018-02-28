module.exports = function(sequelize, DataTypes) {
  var BorrowedItems = sequelize.define("BorrowedItems",
  {
    borrowedStatus: {
      //has this item been borrowed
      // -1  - request pending, waiting for owner's approval
      // 0 - request denied
      // 1 - request approved
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:-1
    },
    borrowedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
  },{
    timestamps:false
  });

  //id of the item borrowed
  BorrowedItems.associate = function (models) {
     models.BorrowedItems.belongsTo(models.MemberItems, {
       as : "item", //the word "id" will be added at the end of the name automatically
       onDelete: "CASCADE",
       foreignKey: {
         allowNull: false
       }
     });

     models.BorrowedItems.belongsTo(models.Members, {
       as : "borrower", //the word "id" will be added at the end of the name automatically
       onDelete: "CASCADE",
       foreignKey: {
         allowNull: false
       }
     });
   };

  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return BorrowedItems;
};
