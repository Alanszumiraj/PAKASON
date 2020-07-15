
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price:DataTypes.DECIMAL,
    brand:DataTypes.STRING,
    img:DataTypes.STRING,
    idUser:DataTypes.INTEGER,
    idCategory:DataTypes.INTEGER
  });
  Product.associate = function(models)   {

    Product.belongsTo(models.Category,{
      as:'category',
      foreignKey:'idCategory'

    })

    Product.belongsTo(models.User,{
      as:'user',
      foreignKey:'idUser'

    })
  };
  return Product;
};