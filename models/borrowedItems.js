module.exports = function(sequelize, DataTypes) {
  var BorrowedItems = sequelize.define("BorrowedItems", {
    borrowedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
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
