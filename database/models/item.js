module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {

        name:DataTypes.STRING,
        description:DataTypes.TEXT,
        price:DataTypes.DECIMAL,
        quantity:DataTypes.INTEGER,
        totalPrice:DataTypes.DECIMAL,
        status:DataTypes.BOOLEAN,
        idUser:DataTypes.INTEGER,
        idCart:DataTypes.INTEGER,

    },
      
    );
    Item.associate = function(models) {

        Item.belongsTo(models.User,{

            as:'user',
            foreignKey:'idUser',
        })

        Item.belongsTo(models.Cart,{
            as:'cart',
            foreignKey:'idCart'

        })
  
     
    };
    return Item;
  };