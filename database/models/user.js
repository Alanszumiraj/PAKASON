
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    rol:DataTypes.BOOLEAN,

  });
  User.associate = function(models) {

     User.hasMany(models.Cart,{
       as:'Carts',
       foreignKey:'idUser'
     })
     User.hasMany(models.Item,{
       as:'items',
       foreignKey:'idUser'
     })
     User.hasMany(models.Product,{
      as:'products',
      foreignKey:'idUser'
    })
  };
  return User;
};