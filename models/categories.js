module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories",
  {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps:false
  });

  Categories.associate = function(models){
    models.Categories.hasMany(models.MemberItems, {foreignKey: "categoryId"});
  }

  return Categories;
};
