module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        idUser:DataTypes.INTEGER,
        cartNumber:DataTypes.INTEGER,
        totalPrice:DataTypes.DECIMAL
    },
      
    );
    Cart.associate = function(models) {
  
      Cart.belongsTo(models.User,{
        as:'user',
        foreignKey:'idUser'
  
      })
      Cart.hasMany(models.Item,{
        as:'item',
        foreignKey:'idCart',

      })
    };
    return Cart;
  };